import { System, Device, DataBus, DeviceConnection } from 'phycat-node'

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';



export class SystemTreeProvider implements vscode.TreeDataProvider<SystemTreeItem> {

    rootItem?: SystemTreeItem;

    constructor( rootItem?: SystemTreeItem) 
    {

        if(rootItem)
            this.rootItem = rootItem;
	}

    getTreeItem(element: SystemTreeItem): vscode.TreeItem {
        console.log('getTreeItem');
        console.log(element);
		return element;
	}

    getChildren(element?: SystemTreeItem): Thenable<SystemTreeItem[]> {
		
        console.log('getChildren');
        console.log(element);

		if (element) {
            return Promise.resolve(element.getChildren());
		} else {

            if(this.rootItem)
            {
                return Promise.resolve(this.rootItem.getChildren());
            }
            else
            {
                return Promise.resolve([]);
            }
		}

	}

}

export class SystemTreeItem extends vscode.TreeItem {
    
    system?: System;
    bus?: DataBus;
    device?: Device;
    deviceList?:Device[];
    busList?:DataBus[];


    constructor( obj: System | DataBus | Device | any[] , groupLabel = ''  ){

        


        switch( obj.constructor.name)
        {
            case 'System':
                super((obj as System).name, vscode.TreeItemCollapsibleState.Expanded);  
                this.system = obj as System;
                this.label = this.system.name;
                this.contextValue = 'system';
                break;
            case 'DataBus':
                super((obj as DataBus).name, vscode.TreeItemCollapsibleState.Expanded);  
                this.bus = obj as DataBus;
                this.label = this.bus.name;
                this.iconPath = {
                    light: path.join(__filename, '..', '..', 'resources', 'sitemap-blue.svg'),
                    dark: path.join(__filename, '..', '..', 'resources', 'sitemap-blue.svg')
                 };
                 this.contextValue = 'bus';
                break;
            case 'Device':
                super((obj as Device).name, vscode.TreeItemCollapsibleState.None);  
                this.device = obj as Device;
                this.label = this.device.name;

                this.iconPath = {
                    light: path.join(__filename, '..', '..', 'resources', 'microchip-grn.svg'),
                    dark: path.join(__filename, '..', '..', 'resources', 'microchip-grn.svg')
                 };
                this.contextValue = 'device';
                this.tooltip = this.device.spec?.description;

                break;
            default:
                if( Array.isArray(obj) )
                {
                    super(groupLabel, vscode.TreeItemCollapsibleState.Expanded);
                    switch(obj[0].constructor.name )
                    {
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




    getChildren() : SystemTreeItem[]
    {
        let arrRet : SystemTreeItem[] =[];

        if(this.system)
        {
            // this.system.buses.forEach((b : DataBus) => {
            //     let newItem = new SystemTreeItem(b);
            //     arrRet.push(newItem)
            // });

            this.system.buses.forEach((b) =>{
                arrRet.push(new SystemTreeItem(b));
            });

            this.system.devices.forEach((d)=>{
                if(!d.onBus())
                {
                    arrRet.push(new SystemTreeItem(d));
                }
            });


        }
        else if(this.bus)
        {
            this.bus.connections.forEach((c : DeviceConnection) => {

                if(c.device)
                {
                    let newItem = new SystemTreeItem(c.device);
                    arrRet.push(newItem);

                }
            });
        }
        else if(this.busList)
        {
            this.busList.forEach( (b) =>{
                let newItem = new SystemTreeItem(b);
                arrRet.push(newItem)
            });
        }
        else if(this.deviceList)
        {
            this.deviceList.forEach( (d) =>{
                let newItem = new SystemTreeItem(d);
                arrRet.push(newItem)
            });
        }

        console.log(arrRet);
        
        return arrRet;
    }
} 


