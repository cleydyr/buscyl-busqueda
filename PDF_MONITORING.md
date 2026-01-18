# PDF File Monitoring

This repository monitors PDF files from the Junta de Castilla y León website for changes:

1. **Rutas bonificadas**: Subsidized bus routes document

## Files

- `file-checksums.json`: Contains the MD5 checksums of the monitored PDF files
- `.github/workflows/check-pdf-updates.yml`: GitHub Action workflow that runs daily to check for file changes

## How it works

1. **Daily Monitoring**: The GitHub Action runs every day at 6:00 AM UTC
2. **File Checking**: Downloads the PDF file and calculates its MD5 checksum
3. **Change Detection**: Compares the new checksum against the stored one in `file-checksums.json`
4. **Issue Creation**: If changes are detected, automatically creates a GitHub issue with details
5. **Automatic Labeling**: Issues are tagged with `pdf-update` and `automated` labels for easy tracking

## Manual Triggering

You can manually trigger the workflow from the GitHub Actions tab using the "workflow_dispatch" option.

## Current Monitored Files

The system currently monitors:

- **File**: Rutas+bonificadas+
- **URL**: https://www.tramitacastillayleon.jcyl.es/web/jcyl/binarios/536/472/Rutas%20bonificadas%20,0.pdf
- **Last Checked**: 2025-11-23
- **Current MD5**: 6ffbd61a22f779b733043f074080e520

## Updating Checksums

When you process updated files and want to update the stored checksums:

1. Update the `md5` values in `file-checksums.json`
2. Update the `last_checked` date
3. Close any related GitHub issues
4. Update the data files (`data.json`, `data.csv`) with the new extracted information