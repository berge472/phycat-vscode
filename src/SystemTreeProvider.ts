import { System, Device, DataBus } from 'phycat-node'

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';



export class SystemTreeProvider implements vscode.TreeDataProvider<SystemTreeItem> {

    system?: System;

    constructor( system?: System ) {

        if(system)
            this.system = system;
	}

    getTreeItem(element: SystemTreeItem): vscode.TreeItem {
		return element;
	}

    getChildren(element?: SystemTreeItem): Thenable<SystemTreeItem[]> {
		


		if (element) {
            return Promise.resolve(element.getChildren());
		} else {

            if(this.system)
            {
                //Create system Device Tree
                let sysTree = new SystemTreeItem(this.system);
                return Promise.resolve([sysTree]);
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
                break;
            case 'DataBus':
                super((obj as DataBus).name, vscode.TreeItemCollapsibleState.Expanded);  
                this.bus = obj as DataBus;
                this.label = this.bus.name;
                this.iconPath = {
                    light: path.join(__filename, '..', '..', 'resources', 'sitemap.svg'),
                    dark: path.join(__filename, '..', '..', 'resources', 'sitemap.svg')
                 };
                break;
            case 'Device':
                super((obj as Device).name, vscode.TreeItemCollapsibleState.Expanded);  
                this.device = obj as Device;
                this.label = this.device.name;

                this.iconPath = {
                    light: path.join(__filename, '..', '..', 'resources', 'microchip-grn.svg'),
                    dark: path.join(__filename, '..', '..', 'resources', 'microchip-grn.svg')
                 };

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

            arrRet.push(new SystemTreeItem(this.system.buses, 'Buses'));
            arrRet.push(new SystemTreeItem(this.system.devices, 'Devices'));

        }
        else if(this.bus)
        {
            this.bus.devices.forEach((d : Device) => {
                let newItem = new SystemTreeItem(d);
                arrRet.push(newItem)
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
        
        return arrRet;
    }
} 


