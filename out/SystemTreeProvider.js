"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemTreeItem = exports.SystemTreeProvider = void 0;
const vscode = require("vscode");
const path = require("path");
class SystemTreeProvider {
    constructor(rootItem) {
        if (rootItem)
            this.rootItem = rootItem;
    }
    getTreeItem(element) {
        console.log('getTreeItem');
        console.log(element);
        return element;
    }
    getChildren(element) {
        console.log('getChildren');
        console.log(element);
        if (element) {
            return Promise.resolve(element.getChildren());
        }
        else {
            if (this.rootItem) {
                return Promise.resolve(this.rootItem.getChildren());
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
                this.contextValue = 'system';
                break;
            case 'DataBus':
                super(obj.name, vscode.TreeItemCollapsibleState.Expanded);
                this.bus = obj;
                this.label = this.bus.name;
                this.iconPath = {
                    light: path.join(__filename, '..', '..', 'resources', 'sitemap-blue.svg'),
                    dark: path.join(__filename, '..', '..', 'resources', 'sitemap-blue.svg')
                };
                this.contextValue = 'bus';
                break;
            case 'Device':
                super(obj.name, vscode.TreeItemCollapsibleState.None);
                this.device = obj;
                this.label = this.device.name;
                this.iconPath = {
                    light: path.join(__filename, '..', '..', 'resources', 'microchip-grn.svg'),
                    dark: path.join(__filename, '..', '..', 'resources', 'microchip-grn.svg')
                };
                this.contextValue = 'device';
                this.tooltip = this.device.spec?.description;
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
            this.system.buses.forEach((b) => {
                arrRet.push(new SystemTreeItem(b));
            });
            this.system.devices.forEach((d) => {
                if (!d.onBus()) {
                    arrRet.push(new SystemTreeItem(d));
                }
            });
        }
        else if (this.bus) {
            this.bus.connections.forEach((c) => {
                if (c.device) {
                    let newItem = new SystemTreeItem(c.device);
                    arrRet.push(newItem);
                }
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
        console.log(arrRet);
        return arrRet;
    }
}
exports.SystemTreeItem = SystemTreeItem;
//# sourceMappingURL=SystemTreeProvider.js.map