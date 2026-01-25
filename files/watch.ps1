$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$projectRoot = Split-Path -Parent $PSScriptRoot

$dependencies = @(
    $PSCommandPath,
    (Join-Path $projectRoot 'Gemfile')
)

$hasher = [System.Security.Cryptography.HashAlgorithm]::Create('SHA256')
try {
    $buffer = New-Object byte[] 8192
    foreach ($dependency in $dependencies) {
        $stream = [System.IO.File]::OpenRead($dependency)
        try {
            while (($read = $stream.Read($buffer, 0, $buffer.Length)) -gt 0) {
                $hasher.TransformBlock($buffer, 0, $read, $null, 0) | Out-Null
            }
        }
        finally {
            $stream.Dispose()
        }
    }
    $hasher.TransformFinalBlock(@(), 0, 0) | Out-Null
    $hash = ($hasher.Hash | ForEach-Object { $_.ToString('x2') }) -join ''
}
finally {
    $hasher.Dispose()
}

$existingTags = docker image ls ml-io-watcher --format '{{.Tag}}'


$found = $false
if ($existingTags) {
    foreach ($tag in $existingTags) {
        if ($tag -eq "$hash") {
            $found = $true
        } else {
            Write-Host "Removing old watcher image: $tag"
            docker image rm -f "ml-io-watcher:$tag" | Out-Null
        }
    }
}
if (-not $found) {
    $tempDir = Join-Path ([System.IO.Path]::GetTempPath()) ([System.IO.Path]::GetRandomFileName())
    Write-Host "Building watcher image version $hash in temporary directory ${tempDir}..."
    New-Item -ItemType Directory -Path $tempDir | Out-Null
    try {
        Copy-Item (Join-Path $projectRoot 'Gemfile') -Destination $tempDir
        @'
FROM madduci/docker-github-pages

EXPOSE 4000

ADD Gemfile /site/Gemfile

RUN apk add --no-cache ruby-dev ruby-bundler g++ make nodejs && \
    cd /site && \
    bundle install && \
    cp Gemfile.lock / && \
    cd / && \
    rm -rf /site && \
    mkdir /site && \
    cd /site

WORKDIR /site

ENTRYPOINT ["/bin/sh", "-c", "cp /Gemfile.lock /site/Gemfile.lock && bundle exec jekyll serve --watch --force_polling --host 0.0.0.0"]

'@ | Set-Content (Join-Path $tempDir 'Dockerfile') -Encoding UTF8
        docker buildx build --tag "ml-io-watcher:$hash" --file "$tempDir/Dockerfile" "$tempDir"
        Write-Host "Watcher image built"
    } finally {
        Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "Starting watcher container...`nBrowse to http://localhost:4000 to see the site."
docker run --rm -it -p 4000:4000 -v "${projectRoot}:/site" "ml-io-watcher:$hash"
Write-Host "Watcher container stopped."
