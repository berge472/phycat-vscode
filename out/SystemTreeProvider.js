"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemTreeItem = exports.SystemTreeProvider = void 0;
const vscode = require("vscode");
const path = require("path");
class SystemTreeProvider {
    constructor(system) {
        if (system)
            this.system = system;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            return Promise.resolve(element.getChildren());
        }
        else {
            if (this.system) {
                //Create system Device Tree
                let sysTree = new SystemTreeItem(this.system);
                return Promise.resolve([sysTree]);
            }
            else {
                return Promise.resolve([]);
            }
        }
    }
}
exports.SystemTreeProvider = SystemTreeProvider;
class SystemTreeItem extends vscode.TreeItem {
    constructor(obj, groupLabel = '') {
        switch (obj.constructor.name) {
            case 'System':
                super(obj.name, vscode.TreeItemCollapsibleState.Expanded);
                this.system = obj;
                this.label = this.system.name;
                break;
            case 'DataBus':
                super(obj.name, vscode.TreeItemCollapsibleState.Expanded);
                this.bus = obj;
                this.label = this.bus.name;
                this.iconPath = {
                    light: path.join(__filename, '..', '..', 'resources', 'sitemap.svg'),
                    dark: path.join(__filename, '..', '..', 'resources', 'sitemap.svg')
                };
                break;
            case 'Device':
                super(obj.name, vscode.TreeItemCollapsibleState.Expanded);
                this.device = obj;
                this.label = this.device.name;
                this.iconPath = {
                    light: path.join(__filename, '..', '..', 'resources', 'microchip-grn.svg'),
                    dark: path.join(__filename, '..', '..', 'resources', 'microchip-grn.svg')
                };
                break;
            default:
                if (Array.isArray(obj)) {
                    super(groupLabel, vscode.TreeItemCollapsibleState.Expanded);
                    switch (obj[0].constructor.name) {
                        case 'DataBus':
                            this.busList = obj;
                            break;
                        case 'Device':
                            this.deviceList = obj;
                            break;
                    }
                }
        }
    }
    getChildren() {
        let arrRet = [];
        if (this.system) {
            // this.system.buses.forEach((b : DataBus) => {
            //     let newItem = new SystemTreeItem(b);
            //     arrRet.push(newItem)
            // });
            arrRet.push(new SystemTreeItem(this.system.buses, 'Buses'));
            arrRet.push(new SystemTreeItem(this.system.devices, 'Devices'));
        }
        else if (this.bus) {
            this.bus.devices.forEach((d) => {
                let newItem = new SystemTreeItem(d);
                arrRet.push(newItem);
            });
        }
        else if (this.busList) {
            this.busList.forEach((b) => {
                let newItem = new SystemTreeItem(b);
                arrRet.push(newItem);
            });
        }
        else if (this.deviceList) {
            this.deviceList.forEach((d) => {
                let newItem = new SystemTreeItem(d);
                arrRet.push(newItem);
            });
        }
        return arrRet;
    }
}
exports.SystemTreeItem = SystemTreeItem;
//# sourceMappingURL=SystemTreeProvider.js.map