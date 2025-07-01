import * as vscode from 'vscode';
import { handleChatPrompt } from './chatbot';

export function activate(context: vscode.ExtensionContext) {
  // Register a command that shows an input box, then responds with a code snippet
  const disposable = vscode.commands.registerCommand('liveApiExplorer.chat', async () => {
    const userInput = await vscode.window.showInputBox({
      prompt: 'Ask about an internal API endpoint (e.g., "create invoice")',
    });

    if (userInput) {
      // Pass the user's input to the chatbot logic
      const result = await handleChatPrompt(userInput);

      // Insert the result into the active text editor
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.edit(editBuilder => {
          editBuilder.insert(editor.selection.active, result);
        });
      } else {
        vscode.window.showInformationMessage('No active editor to insert the code into.');
      }
    }
  });

  // Add the command to the extension's lifecycle
  context.subscriptions.push(disposable);
}

export function deactivate() {
  // Optional: Clean up resources when the extension is deactivated
}
