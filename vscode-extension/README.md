# AI DocGen VS Code Extension

Generate Markdown documentation for your current workspace or a selected folder using the bundled Python CLI.

## Features
- Command: **AI DocGen: Generate Docs for Workspace**
- Command: **AI DocGen: Generate Docs for Folder**
- Opens the generated `build/docs.md` automatically

## Requirements
- Python available (recommend a workspace `venv/`)
- The Python CLI located in the workspace root (this project layout)

## Extension Settings
- `aiDocGen.pythonPath`: Absolute path to Python. If empty, tries `venv/Scripts/python.exe`.
- `aiDocGen.outputPath`: Output markdown path relative to workspace (default: `build/docs.md`).
- `aiDocGen.repoPath`: Repo path to document (default: workspace root).

## Development
```bash
npm install
npm run compile
# Press F5 in VS Code to launch the extension host
```

## Publishing
```bash
npm install -g vsce
npx vsce package
npx vsce publish
```

### GitHub Actions (optional)
Use `npx vsce` in CI to build and package the extension without global installs.
