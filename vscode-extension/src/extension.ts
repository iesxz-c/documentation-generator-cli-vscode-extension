import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as path from 'path';

function getPythonPath(): string | undefined {
  const cfg = vscode.workspace.getConfiguration('aiDocGen');
  const configured = cfg.get<string>('pythonPath');
  if (configured && configured.trim().length > 0) {
    return configured.trim();
  }
  // Try workspace venv
  const ws = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!ws) return undefined;
  const venvPy = path.join(ws, 'venv', 'Scripts', 'python.exe');
  return venvPy;
}

async function runCli(repoPath: string, outputPath: string) {
  const pythonPath = getPythonPath();
  if (!pythonPath) {
    vscode.window.showErrorMessage('Python path not found. Set aiDocGen.pythonPath or create venv/ in workspace.');
    return;
  }

  const ws = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
  // Working directory should be where cli module lives (parent of venv)
  let workingDir = ws;
  if (pythonPath.includes('venv')) {
    const venvIndex = pythonPath.indexOf('venv');
    workingDir = pythonPath.substring(0, venvIndex - 1);
  }
  // Make repo path absolute
  const absoluteRepoPath = path.isAbsolute(repoPath) ? repoPath : path.join(ws, repoPath);
  const cliArgs = ['-m', 'cli.cli', absoluteRepoPath, '--output', outputPath];
  const title = `AI DocGen: Generating ${outputPath}`;
  const channel = vscode.window.createOutputChannel('AI DocGen');
  channel.show(true);
  channel.appendLine(`Running: "${pythonPath}" ${cliArgs.join(' ')}`);
  channel.appendLine(`Working directory: ${workingDir}`);
  channel.appendLine('---');
  const task = vscode.window.withProgress({ location: vscode.ProgressLocation.Notification, title, cancellable: false }, async () => {
    return new Promise<void>((resolve) => {
      // Build command with quotes for shell execution
      const quotedPython = `"${pythonPath}"`;
      const quotedArgs = cliArgs.map(arg => arg.includes(' ') ? `"${arg}"` : arg);
      const fullCommand = `${quotedPython} ${quotedArgs.join(' ')}`;
      const child = spawn(fullCommand, [], { cwd: workingDir, shell: true });
      let stderrBuf = '';
      child.on('error', (err) => {
        channel.appendLine(`ERROR: Failed to spawn process: ${err.message}`);
        vscode.window.showErrorMessage(`Failed to start Python: ${err.message}`);
        resolve();
      });
      child.stdout.on('data', (d) => { const s = d.toString(); channel.append(s); });
      child.stderr.on('data', (d) => { const s = d.toString(); stderrBuf += s; channel.append(s); });
      child.on('close', async (code) => {
        if (code === 0) {
          vscode.window.showInformationMessage(`Documentation generated at ${outputPath}`);
          const docUri = vscode.Uri.file(path.join(ws, outputPath));
          try { const doc = await vscode.workspace.openTextDocument(docUri); await vscode.window.showTextDocument(doc); } catch {}
        } else {
          vscode.window.showErrorMessage(`AI DocGen failed. See output channel for logs.`);
        }
        resolve();
      });
    });
  });
  await task;
}

export function activate(context: vscode.ExtensionContext) {
  const cfg = vscode.workspace.getConfiguration('aiDocGen');
  const defaultOutput = cfg.get<string>('outputPath') || 'build/docs.md';

  const genWorkspace = vscode.commands.registerCommand('aiDocGen.generateWorkspace', async () => {
    const ws = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!ws) { vscode.window.showErrorMessage('No workspace open.'); return; }
    const repoPath = cfg.get<string>('repoPath') || '.';
    const pythonPath = getPythonPath();
    if (!pythonPath) {
      vscode.window.showErrorMessage('Python not found. Set aiDocGen.pythonPath or create venv/ in workspace.');
      return;
    }
    await runCli(repoPath, defaultOutput);
  });

  const genFolder = vscode.commands.registerCommand('aiDocGen.generateFolder', async () => {
    const picked = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, canSelectMany: false });
    if (!picked || picked.length === 0) return;
    const repoPath = path.relative(vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '', picked[0].fsPath) || picked[0].fsPath;
    const pythonPath = getPythonPath();
    if (!pythonPath) {
      vscode.window.showErrorMessage('Python not found. Set aiDocGen.pythonPath or create venv/ in workspace.');
      return;
    }
    await runCli(repoPath, defaultOutput);
  });

  const setPythonPath = vscode.commands.registerCommand('aiDocGen.setPythonPath', async () => {
    const picked = await vscode.window.showOpenDialog({
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      filters: { 'Executable': ['exe'] },
      title: 'Select Python Executable'
    });
    if (picked && picked.length > 0) {
      const pythonPath = picked[0].fsPath;
      await vscode.workspace.getConfiguration('aiDocGen').update('pythonPath', pythonPath, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(`Python path set to: ${pythonPath}`);
    }
  });

  context.subscriptions.push(genWorkspace, genFolder, setPythonPath);

  // Status bar button for quick generate
  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  status.text = '$(book) AI DocGen';
  status.tooltip = 'Generate Docs for Workspace';
  status.command = 'aiDocGen.generateWorkspace';
  status.show();
  context.subscriptions.push(status);
}

export function deactivate() {}
