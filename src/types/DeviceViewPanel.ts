import * as vscode from 'vscode';
import { Device } from 'phycat-node';

export class DeviceViewPanel
{
    device: Device; 

    public static openPanels = new Map<number,DeviceViewPanel>(); 

    public static readonly viewType = 'Device'

    private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];   

    constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri ,device: Device )
    {

        this.device = device;
        this._panel = panel;
		this._extensionUri = extensionUri;

        // Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    }


    public update()
    {

    }

    public dispose()
    {
        DeviceViewPanel.openPanels.delete(this.device.id);
        this._panel.dispose();
        while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
    }

    updateDevice()
    {

    }

    public static createOrShow(extensionUri: vscode.Uri, device: Device) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (device.id in this.openPanels) 
        {

            DeviceViewPanel.openPanels.get(device.id)?._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			DeviceViewPanel.viewType,
			device.name,
			column || vscode.ViewColumn.One,
            {
                // Enable javascript in the webview
                enableScripts: true,

                // And restrict the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, 'media'),
                    vscode.Uri.joinPath(extensionUri, 'dist-web')
                ]
            }
		);

        DeviceViewPanel.openPanels.set(device.id, new DeviceViewPanel(panel, extensionUri, device));
	}

}

