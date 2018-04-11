---
title:  "Type hint in PHP function parameters and return values"
description: All the scalar, compound and special types used in function (and method) parameter and results, for any PHP version.
date: 2018-04-11T12:45:00+01:00
---

Here's a list of all the types you can use in PHP type hinting, with the minimum PHP version since they are available:

<table class="table table-hover table-bordered" style="width:auto; margin-left:auto; margin-right:auto">
    <tbody>
        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">array</h3></th></tr>
        <tr><td><code>function foo(array $bar)</code></td><td>PHP 5.1+</td><td><a href="https://3v4l.org/VMPJh">example</a></td></tr>
        <tr><td><code>function foo(array $bar = null)</code></td><td>PHP 5.1+</td><td><a href="https://3v4l.org/28isS">example</a></td></tr>
        <tr><td><code>function foo(): array</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/aLcod">example</a></td></tr>
        <tr><td><code>function foo(): ?array</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/YiD0p">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">bool</h3></th></tr>
        <tr><td><code>function foo(bool $bar)</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/35ubR">example</a></td></tr>
        <tr><td><code>function foo(bool $bar = null)</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/S6ua3">example</a></td></tr>
        <tr><td><code>function foo(): bool</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/tubAB">example</a></td></tr>
        <tr><td><code>function foo(): ?bool</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/6gSvE">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">callable</h3></th></tr>
        <tr><td><code>function foo(callable $bar)</code></td><td>PHP 5.4+</td><td><a href="https://3v4l.org/mmPm0">example</a></td></tr>
        <tr><td><code>function foo(callable $bar = null)</code></td><td>PHP 5.4+</td><td><a href="https://3v4l.org/UIjFM">example</a></td></tr>
        <tr><td><code>function foo(): callable</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/uCeOf">example</a></td></tr>
        <tr><td><code>function foo(): ?callable</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/CfQeY">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">float</h3></th></tr>
        <tr><td><code>function foo(float $bar)</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/0nfR7">example</a></td></tr>
        <tr><td><code>function foo(float $bar = null)</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/em2kq">example</a></td></tr>
        <tr><td><code>function foo(): float</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/uJeXp">example</a></td></tr>
        <tr><td><code>function foo(): ?float</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/pNpkp">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">int</h3></th></tr>
        <tr><td><code>function foo(int $bar)</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/RNpFL">example</a></td></tr>
        <tr><td><code>function foo(int $bar = null)</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/rEbTm">example</a></td></tr>
        <tr><td><code>function foo(): int</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/IupnQ">example</a></td></tr>
        <tr><td><code>function foo(): ?int</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/jKBi9">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">iterable</h3></th></tr>
        <tr><td><code>function foo(iterable $bar)</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/eEUQA">example</a></td></tr>
        <tr><td><code>function foo(iterable $bar = null)</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/iShXW">example</a></td></tr>
        <tr><td><code>function foo(): iterable</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/9fUAI">example</a></td></tr>
        <tr><td><code>function foo(): ?iterable</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/rK9vc">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">object</h3></th></tr>
        <tr><td><code>function foo(object $bar)</code></td><td>PHP 7.2+</td><td><a href="https://3v4l.org/MamhY">example</a></td></tr>
        <tr><td><code>function foo(object $bar = null)</code></td><td>PHP 7.2+</td><td><a href="https://3v4l.org/n5bJW">example</a></td></tr>
        <tr><td><code>function foo(): object</code></td><td>PHP 7.2+</td><td><a href="https://3v4l.org/Sji1Y">example</a></td></tr>
        <tr><td><code>function foo(): ?object</code></td><td>PHP 7.2+</td><td><a href="https://3v4l.org/V6HDj">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">self</h3></th></tr>
        <tr><td><code>function foo(self $bar)</code></td><td>PHP 5.0+</td><td><a href="https://3v4l.org/EUM0M">example</a></td></tr>
        <tr><td><code>function foo(self $bar = null)</code></td><td>PHP 5.1+</td><td><a href="https://3v4l.org/Oj1d6">example</a></td></tr>
        <tr><td><code>function foo(): self</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/lKvL5">example</a></td></tr>
        <tr><td><code>function foo(): ?self</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/WLnQs">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">string</h3></th></tr>
        <tr><td><code>function foo(string $bar)</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/ZBCdh">example</a></td></tr>
        <tr><td><code>function foo(string $bar = null)</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/iPFDp">example</a></td></tr>
        <tr><td><code>function foo(): string</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/7e6WD">example</a></td></tr>
        <tr><td><code>function foo(): ?string</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/DgH88">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">class names</h3></th></tr>
        <tr><td><code>function foo(ClassName $bar)</code></td><td>PHP 5.0+</td><td><a href="https://3v4l.org/dqfrP">example</a></td></tr>
        <tr><td><code>function foo(ClassName $bar = null)</code></td><td>PHP 5.1+</td><td><a href="https://3v4l.org/MaOKk">example</a></td></tr>
        <tr><td><code>function foo(): ClassName</code></td><td>PHP 7.0+</td><td><a href="https://3v4l.org/JXlnA">example</a></td></tr>
        <tr><td><code>function foo(): ?ClassName</code></td><td>PHP 7.1+</td><td><a href="https://3v4l.org/PCgCc">example</a></td></tr>

        <tr><th colspan="3" style="text-align:center;"><h3 style="margin: 0;">boolean, double, integer, resource, static</h3></th></tr>
        <tr><td colspan="2">Never recognized as valid for type hinting</td><td><a href="https://3v4l.org/816pM">example 1</a><br /><a href="https://3v4l.org/BnKK3">example 2</a><br /><a href="https://3v4l.org/IC6QP">example 3</a></td></tr>
    </tbody>
</table>
