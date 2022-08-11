"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPI_DataBus = exports.I2C_DataBus = exports.DataChannel = exports.DataBus = void 0;
class DataBus {
    constructor() {
        this.name = '';
        this.type = '';
        this.devices = [];
        this.channels = [];
    }
    handleFrame(frame) {
    }
    hasChannel(id) {
        this.channels.forEach((c) => {
            if (c.id == id) {
                return true;
            }
        });
        return false;
    }
}
exports.DataBus = DataBus;
class DataChannel {
    constructor() {
        this.name = '';
        this.id = -1;
    }
}
exports.DataChannel = DataChannel;
class I2C_DataBus extends DataBus {
    constructor() {
        super(...arguments);
        this.channelId = -1;
    }
    handleFrame(frame) {
    }
}
exports.I2C_DataBus = I2C_DataBus;
class SPI_DataBus extends DataBus {
    constructor() {
        super(...arguments);
        this.misoChannelId = -1;
        this.mosiChannelId = -1;
    }
    handleFrame(frame) {
    }
}
exports.SPI_DataBus = SPI_DataBus;
//# sourceMappingURL=Bus.js.map