---
title:  "Windows: official and custom Certification Authorities in Git, PHP, ..."
description: How to configure tools like PHP and Git to trust official and custom Certification Authorities 
date: 2018-03-22T16.17.00+01:00
---

* TOC
{:toc}

## Introduction

Using certificates in POSIX systems is usually handled by the system.
For instance, in Debian/Ubuntu you save your certificate with a `.cer` extension in the `/usr/local/share/ca-certificates` directory, and run  
`sudo dpkg-reconfigure ca-certificates`  
or  
`sudo update-ca-certificates`

On Windows, you can use `certmgr.msc` (for user-level certificates) or `certlm.msc` (for system-level certificates), but many tools (like GIT, PHP, ...) won't read these certificates.

A solution could be to use the [Mozilla CA certificate store](https://curl.haxx.se/docs/caextract.html), append to it your custom CA certificates, and configure your tools to use that file.

You can do it by hand, but it's better to keep the official list of CA up to date on a regular basis, so let's automate this process. 


## The build script

Save the following script to a location of your choice (for instance, `C:\Dev\ssl\cacert.vbs`):

```vb
Option Explicit
On Error Goto 0

Dim showHelp, argIndex
If WScript.Arguments.Count < 1 Then
    showHelp = True
Else
    showHelp = False
    For argIndex = 0 To WScript.Arguments.Count - 1
        If StrComp(WScript.Arguments(argIndex), "-h", 1) = 0 Or StrComp(WScript.Arguments(argIndex), "--help", 1) = 0 Or StrComp(WScript.Arguments(argIndex), "/?", 0) = 0 Then
            showHelp = True
            Exit For
        End If
    Next
End If
If showHelp Then
    WScript.StdOut.WriteLine "Syntax: cscript //NoLogo " & WScript.ScriptName & " <output-file> [<additional-cert>...]"
    WScript.StdOut.WriteLine "Where:"
    WScript.StdOut.WriteLine "  <output-file>: where to save the certificate store"
    WScript.StdOut.WriteLine "  <additional-cert>: one or more additional custom certificates to be appended."
    WScript.Quit 0
End If

WScript.StdOut.Write "Initializing... "
Randomize Time
Dim fso
Set fso = WScript.CreateObject("Scripting.FileSystemObject")
Dim tempFileName
tempFileName = GetTempFileName()
Dim finalFileName
finalFileName = WScript.Arguments(0)
Dim customList
Set customList = New AdditionalList
WScript.StdOut.WriteLine "done."

If WScript.Arguments.Count > 1 Then
    WScript.StdOut.Write "Reading custom certificates... "
    For argIndex = 1 To WScript.Arguments.Count - 1
        customList.Add WScript.Arguments(argIndex)
    Next
    WScript.StdOut.WriteLine "done."
End If

WScript.StdOut.Write "Downloading cacert.pem... "
DownloadCACert tempFileName
WScript.StdOut.WriteLine "done."

If customList.Count > 0 Then
    WScript.StdOut.Write "Appending custom certificates... "
    customList.AppendTo tempFileName
    WScript.StdOut.WriteLine "done."
End If

WScript.StdOut.Write "Saving final file... "
If fso.FileExists(finalFileName) Then
    fso.DeleteFile finalFileName, True
End If
fso.MoveFile tempFileName, finalFileName
WScript.StdOut.WriteLine "done."

Function GetTempFileName()
    Dim tempFolder
    Set tempFolder = fso.GetSpecialFolder(2) '2: TemporaryFolder
    GetTempFileName = tempFolder.Path & "\" & "cacert-" & Replace(CStr(Rnd()), ",", ".") & ".tmp"
End Function

Sub DownloadCACert(ByVal saveAs)
    Dim http
    Set http = WScript.CreateObject("WinHttp.WinHttpRequest.5.1")
    http.Open "GET", "https://curl.haxx.se/ca/cacert.pem", False
    http.Send
    If http.Status <> 200 Then
        WScript.StdErr.WriteLine http.Status & " (" & http.StatusText & ")"
        WScript.Quit 1
    End If
    Dim outStream
    Set outStream = WScript.CreateObject("ADODB.Stream")
    outStream.Type = 1 ' 1: adTypeBinary
    outStream.Open
    outStream.Write http.ResponseBody
    outStream.SaveToFile tempFileName, 2 ' 2: adSaveCreateOverWrite
    outStream.Close
    Set outStream = Nothing
    Set http = Nothing
End Sub

Class AdditionalList
    Private myStreams()
    Private myNames()
    Private myCount
    Private Sub Class_Initialize()
        myCount = 0
    End Sub
    Private Sub Class_Terminate()
        Dim i
        For i = 0 To MyCount - 1
            myStreams(i).Close
            Set myStreams(i) = Nothing
        Next
        myCount = 0
    End Sub
    Public Sub Add(ByVal item)
        If fso.FileExists(item) Then
            Me.AddFile item
        ElseIf fso.FolderExists(item) Then
            Me.AddFolder item
        Else
            WScript.StdErr.WriteLine "Unable to find the file/folder " & what
            WScript.Quit 1
        End If
    End Sub
    Public Sub AddFile(ByVal item)
        Dim stream
        Set stream = fso.GetFile(item).OpenAsTextStream(1, 0) ' 1: ForReading, 0: TristateFalse (Opens the file as ASCII)
        Dim name
        name = fso.GetFileName(item)
        If myCount = 0 Then
            ReDim myStreams(0)
            ReDim myNames(0)
        Else
            ReDim Preserve myStreams(myCount)
            ReDim Preserve myNames(myCount)
        End If
        Set myStreams(myCount) = stream
        myNames(myCount) = name
        myCount = myCount + 1
    End Sub
    Public Sub AddFolder(ByVal item)
        Dim folder
        Set folder = fso.GetFolder(item)
        Dim subFile
        For Each subFile In folder.Files
            Me.AddFile subFile.Path
        Next
        Dim subFolder
        For Each subFolder In folder.SubFolders
            Me.AddFolder subFolder.Path
        Next
    End Sub
    Public Sub AppendTo(ByVal fileName)
        Dim stream
        Set stream = fso.GetFile(fileName).OpenAsTextStream(8, 0) ' 8: ForAppending, 0: TristateFalse (Opens the file as ASCII)
        Dim i
        For i = 0 To myCount - 1
            stream.Write "" & vbLf
            stream.Write myNames(i) & vbLf
            stream.Write String(Len(myNames(i)), "=") & vbLf
            Do While myStreams(i).AtEndOfStream <> True
                stream.Write myStreams(i).ReadLine & vbLf
            Loop
        Next
        stream.Close
        Set stream = Nothing
    End Sub
    Public Property Get Count
        Count = myCount
    End Property
End Class
```


## Using the build script

Let's assume that you have your custom CA certificate saved as `C:\Dev\ssl\my-ca.crt`.

In order to create a file that contains both the official CA certificates and your custom CA certificates, you can for instance use this command:
```text
CScript.exe //NoLogo C:\Dev\ssl\cacert.vbs C:\Dev\ssl\cacert.pem C:\Dev\ssl\my-ca.crt
```
The above command will create the `C:\Dev\ssl\cacert.pem` file, containing the official CA certificates and your custom `C:\Dev\ssl\my-ca.crt` certificate.
You can add as many custom CA certificate files as you want, and you can also specify a directory containing your custom certificates.

Of course, if you only specify one argument, the final file won't contain any custom certificate, only the official ones.

You can schedule the execution of this script using the Windows Scheduler (`Windows` + `R` -> `taskschd.msc`).


## Configuring PHP

Open your `php.ini` file (type `php.exe --ini` to determine its path), and add these lines:

```ini
curl.cainfo=C:\Dev\ssl\cacert.pem
openssl.cafile=C:\Dev\ssl\cacert.pem
```

## Configuring Git

Open a command prompt and type:

```text
git config --global http.sslCAInfo C:\Dev\ssl\cacert.pem
```
