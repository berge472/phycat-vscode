"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValue = exports.RegisterField = exports.Register = void 0;
class Register {
    constructor() {
        this.name = '';
        this.addr = 0;
        this.type = '';
        this.perm = '';
        this.default = 0;
        this.valide = false;
        this.fields = [];
    }
}
exports.Register = Register;
class RegisterField {
    constructor(parent) {
        this.name = '';
        this.value = 0;
        this.mask = 0x00000000;
        this.offset = 0;
        this.format = 'hex';
        this.fieldValues = [];
        this.parent = parent;
    }
}
exports.RegisterField = RegisterField;
class FieldValue {
    constructor() {
        this.name = '';
        this.val = 0;
        this.desc = '';
    }
}
exports.FieldValue = FieldValue;
//# sourceMappingURL=Register.js.map