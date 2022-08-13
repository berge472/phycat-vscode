"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceViewPanel = void 0;
const vscode = require("vscode");
class DeviceViewPanel {
    constructor(panel, extensionUri, device) {
        this._disposables = [];
        this.device = device;
        this._panel = panel;
        this._extensionUri = extensionUri;
        // Set the webview's initial html content
        this._update();
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }
    update() {
    }
    dispose() {
        DeviceViewPanel.openPanels.delete(this.device.id);
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    updateDevice() {
    }
    static createOrShow(extensionUri, device) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it.
        if (device.id in this.openPanels) {
            DeviceViewPanel.openPanels.get(device.id)?._panel.reveal(column);
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(DeviceViewPanel.viewType, device.name, column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, 'media'),
                vscode.Uri.joinPath(extensionUri, 'dist-web')
            ]
        });
        DeviceViewPanel.openPanels.set(device.id, new DeviceViewPanel(panel, extensionUri, device));
    }
}
exports.DeviceViewPanel = DeviceViewPanel;
DeviceViewPanel.openPanels = new Map();
DeviceViewPanel.viewType = 'Device';
//# sourceMappingURL=DeviceViewPanel.js.map