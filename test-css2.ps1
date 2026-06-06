$css = (Invoke-WebRequest -Uri 'http://localhost:3000/_next/static/chunks/%5Broot-of-the-server%5D__13ps.gl._.css' -UseBasicParsing).Content

# Check for --spacing declaration
if ($css -match '--spacing') {
    Write-Host "=== --spacing declarations found ==="
    $lines = $css -split "`n"
    foreach ($line in $lines) {
        if ($line -match '--spacing') {
            Write-Host $line.Trim()
        }
    }
} else {
    Write-Host "WARNING: --spacing NOT found in CSS output!"
}

Write-Host ""
Write-Host "=== Searching for p-4 or padding utility ==="
# Look for padding utility rules
$lines = $css -split "`n"
foreach ($line in $lines) {
    if ($line -match '\.p-4\b|padding.*calc.*spacing') {
        Write-Host $line.Trim().Substring(0, [Math]::Min(200, $line.Trim().Length))
    }
}

Write-Host ""
Write-Host "=== Searching for 'padding: 0' reset ==="
foreach ($line in $lines) {
    if ($line -match 'padding:\s*0[^.]') {
        Write-Host $line.Trim().Substring(0, [Math]::Min(200, $line.Trim().Length))
    }
}

Write-Host ""
Write-Host "=== Total CSS size: $($css.Length) chars ==="
