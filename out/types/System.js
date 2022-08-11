"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const Bus_1 = require("./Bus");
class System {
    constructor() {
        this.name = '';
        this.buses = [];
        let i2cTest = new Bus_1.I2C_DataBus();
        let spiTest = new Bus_1.SPI_DataBus();
        this.buses.push(i2cTest);
        this.buses.push(spiTest);
    }
    handleFrame(frame) {
        let channel = (frame & 0xFC) >> 26;
        this.buses.forEach((b) => {
            if (b.channelIDs.includes(channel)) {
                b.
                ;
            }
        });
    }
}
exports.System = System;
//# sourceMappingURL=System.js.map