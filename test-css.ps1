$html = (Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing).Content
$matches = [regex]::Matches($html, 'href="([^"]*\.css[^"]*)"')
foreach ($m in $matches) {
    $url = $m.Groups[1].Value
    Write-Host "CSS: $url"
}
# Also check for inline style tags with padding
$styleMatches = [regex]::Matches($html, '<style[^>]*>(.*?)</style>', 'Singleline')
foreach ($s in $styleMatches) {
    $content = $s.Groups[1].Value
    if ($content -match 'padding|--spacing') {
        Write-Host "Found padding/spacing in inline style"
        Write-Host $content.Substring(0, [Math]::Min(500, $content.Length))
    }
}
