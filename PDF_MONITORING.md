# PDF File Monitoring

This repository monitors three PDF files from the Junta de Castilla y León website for changes:

1. **Anexo I - Rutas 1 sept**: Routes starting September 1st
2. **Anexo II - Rutas 15 sept**: Routes starting September 15th  
3. **Anexo III - Rutas 30 sept**: Routes starting September 30th

## Files

- `file-checksums.json`: Contains the MD5 checksums of the monitored PDF files
- `.github/workflows/check-pdf-updates.yml`: GitHub Action workflow that runs daily to check for file changes

## How it works

1. **Daily Monitoring**: The GitHub Action runs every day at 6:00 AM UTC
2. **File Checking**: Downloads each PDF file and calculates its MD5 checksum
3. **Change Detection**: Compares the new checksum against the stored one
4. **Issue Creation**: If changes are detected, automatically creates a GitHub issue with details

## Manual Triggering

You can manually trigger the workflow from the GitHub Actions tab using the "workflow_dispatch" option.

## Updating Checksums

When you process updated files and want to update the stored checksums:

1. Update the `md5` values in `file-checksums.json`
2. Update the `last_checked` date
3. Close any related GitHub issues

## File URLs

- [Anexo I - Rutas 1 sept](https://www.tramitacastillayleon.jcyl.es/web/jcyl/binarios/353/257/Anexo%20I%20-%20Rutas%201%20sept,0.pdf)
- [Anexo II - Rutas 15 sept](https://www.tramitacastillayleon.jcyl.es/web/jcyl/binarios/887/719/Anexo%20II%20-%20Rutas%2015%20sept,0.pdf)
- [Anexo III - Rutas 30 sept](https://www.tramitacastillayleon.jcyl.es/web/jcyl/binarios/997/516/Anexo%20III%20-%20Rutas%2030%20sept,0.pdf)