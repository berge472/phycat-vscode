
Vue.component('device-item',{
    props: ['device'],
    methods: {

    },
    template: `
    <div > 
        {{device.name}}
        <div  >
            <h2>{{device.test}}</h2>
           
            <div id="accordion" role="tablist" aria-multiselectable="true">
                <register-item v-for="reg in device.registers" v-bind:reg="reg" v-bind:device="device" v-bind:key="reg.name"></register-item>
            </div>
        </div>

    </div>
    `
});

Vue.component('register-item',{
    props: ['device','reg'],
    methods: {

    },
    computed:{
        addr_str: function()
        {
            return this.reg.addr.toString(16);
        }
    },
    template: `
    
    <div class="card  box-shadow" > 
    <div class="card-header collapsed d-block " :id="'reg_'+reg.spec.addr+'_header'" :title="reg.spec.desc"  data-toggle="collapse" data-parent="#accordion" :href="'#reg_'+reg.spec.addr+'_body'" aria-expanded="false" :aria-controls="'reg_'+reg.spec.addr+'_body'">
        <div class="d-flex justify-content-between align-items-left">
            <span class="d-flex">
                <span> 0x{{reg.spec.addr.toString(16).toUpperCase().padStart(4,'0')}}&nbsp;&nbsp;&nbsp;</span>
                <h4 >     
                    <span> {{reg.spec.name}} </span>
                </h4>
            </span>
            <span>
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="event.stopImmediatePropagation()" v-if="reg.spec.perm.toUpperCase().includes('W')"><i class="fa fa-upload "></i>Write</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="event.stopImmediatePropagation()" v-if="reg.spec.perm.toUpperCase().includes('R')"><i class="fa fa-download "></i>Read</button>
                </div>
            </span>
        </div>
    </div>
    <div :id="'reg_'+reg.spec.addr+'_body'" class="collapse " role="tabpanel" :aria-labelledby="'reg_'+reg.spec.addr+'_header'">
        <div class="card-body ">
                    <div class="col-12">
                        <div class="row">
                            <span>{{reg.spec.desc}}</span>
                        </div>
                        <div class="row">
                            &nbsp;
                        </div>
                        <div class="row">
                            <table>
                            <field-item  v-for="field in reg.fields" v-bind:field="field" v-bind:reg="reg" v-bind:device="device" v-bind:key="field.name"></field-item>
                            </table>
                        </div>
                    </div>
                    

        </div>
    </div>
</div>


    `
});

Vue.component('field-item',{
    props: ['device','reg','field'],
    methods: {
        update: function(field, event)
        {

        }
    },
    template: `
        <tr> 
            <td> {{field.spec.name}}</td>
            <td> 
                <span v-if="field.spec.bitsize == 1 &&  field.spec.vals.length == 0">
                    <label class="switch" v-if="reg.spec.perm.toUpperCase().includes('W')">
                        <input type="checkbox" :value="field.value" @change="update(field,$event) ">
                        <span class="slider round" :title="field.spec.desc"></span>
                    </label>
                    <span v-if="!reg.spec.perm.toUpperCase().includes('W')" :class=" field.value > 0? 'bg-success dot' : 'bg-secondary dot'"></span>
                </span>

                <span v-if="field.spec.vals.length > 0" >
                    <select  v-model="field.value" value="" :disabled="!reg.spec.perm.toUpperCase().includes('W')">
                        <option v-for="val in field.spec.vals" v-bind:value="val.val"> {{val.name}} </option>
                    </select>
                </span> 

                <span v-if="field.spec.vals.length == 0 && field.spec.bitsize > 1" >
                    <input type="text"   style="width:50%"   v-model="field.value" value="" :disabled="!reg.spec.perm.toUpperCase().includes('W')">
                </span> 
                
            </td>
            <td>
                {{field.spec.desc}}
            </td>
            
        </tr>

    `
});

{/* <div class="row"> 
<span v-if="field.spec.bitsize == 1">
    <label class="switch">
        <input type="checkbox" :value="field.value" @change="update(field,$event)" :alt="field.spec.desc" >
        <span class="slider round" :title="field.spec.desc"></span>
    </label>
    &nbsp;

    <label :class=" field.value == 1? 'enabled' : ''">
        {{field.spec.name}} 
    </label>
</span>
</div> */}

var jsonDevice = {
    "name": "stm8_expander",
    "id": 3,
    "registers": [
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_IN",
                "addr": 0,
                "type": "uint32",
                "size": 4,
                "bitsize": 32,
                "perm": "r",
                "desc": "Input values for gpio 0-25",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "GPIO_IN",
                        "desc": "Input values for gpio 0-25",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 32
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_OUT",
                "addr": 4,
                "type": "uint32",
                "size": 4,
                "bitsize": 32,
                "perm": "rw",
                "desc": "Output values for gpio 0-15",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "GPIO_OUT",
                        "desc": "Output values for gpio 0-15",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 32
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_DDR",
                "addr": 8,
                "type": "uint32",
                "size": 4,
                "bitsize": 32,
                "perm": "r",
                "desc": "Direction Register for GPIO",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "GPIO_DDR",
                        "desc": "Direction Register for GPIO",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 32
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "IRQ_SRC",
                "addr": 12,
                "type": "uint32",
                "size": 4,
                "bitsize": 32,
                "perm": "r",
                "desc": "latching Interrupt source mask. indicates souce of IRQ resets on read",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ_SRC",
                        "desc": "Source of IRQ",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "GPIO_0",
                                "desc": "IRQ triggered by GPIO0",
                                "val": 1
                            },
                            {
                                "name": "ADC_0",
                                "desc": "IRQ triggered by ADC0",
                                "val": 67108864
                            },
                            {
                                "name": "ADC_1",
                                "desc": "IRQ triggered by ADC1",
                                "val": 134217728
                            },
                            {
                                "name": "ADC_2",
                                "desc": "IRQ triggered by ADC2",
                                "val": 268435456
                            },
                            {
                                "name": "ADC_3",
                                "desc": "IRQ triggered by ADC3",
                                "val": 536870912
                            },
                            {
                                "name": "ADC_4",
                                "desc": "IRQ triggered by ADC4",
                                "val": 1073741824
                            }
                        ],
                        "bitsize": 32
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_0_VAL",
                "addr": 16,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "r",
                "desc": "Output of ADC 0",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "ADC_0_VAL",
                        "desc": "Output of ADC 0",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_1_VAL",
                "addr": 18,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "r",
                "desc": "Output of ADC 1",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "ADC_1_VAL",
                        "desc": "Output of ADC 1",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_2_VAL",
                "addr": 20,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "r",
                "desc": "Output of ADC 2",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "ADC_2_VAL",
                        "desc": "Output of ADC 2",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_3_VAL",
                "addr": 22,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "r",
                "desc": "Output of ADC 3",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "ADC_3_VAL",
                        "desc": "Output of ADC 3",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_4_VAL",
                "addr": 24,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "r",
                "desc": "Output of ADC 4",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "ADC_4_VAL",
                        "desc": "Output of ADC 4",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "PWM_0_VAL",
                "addr": 26,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "w",
                "desc": "PWM value for ch 0",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "PWM_0_VAL",
                        "desc": "PWM value for ch 0",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "PWM_1_VAL",
                "addr": 28,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "w",
                "desc": "PWM value for ch 1",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "PWM_1_VAL",
                        "desc": "PWM value for ch 1",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "PWM_2_VAL",
                "addr": 30,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "w",
                "desc": "PWM value for ch 2",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "PWM_2_VAL",
                        "desc": "PWM value for ch 2",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "PWM_3_VAL",
                "addr": 32,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "w",
                "desc": "PWM value for ch 3",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "PWM_3_VAL",
                        "desc": "PWM value for ch 3",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "PWM_4_VAL",
                "addr": 34,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "w",
                "desc": "PWM value for ch 4",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "PWM_4_VAL",
                        "desc": "PWM value for ch 4",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "PWM_5_VAL",
                "addr": 36,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "w",
                "desc": "PWM value for ch 5",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "PWM_5_VAL",
                        "desc": "PWM value for ch 5",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_0_CFG",
                "addr": 38,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 0",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_1_CFG",
                "addr": 39,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 1",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_2_CFG",
                "addr": 40,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 2",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_3_CFG",
                "addr": 41,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 3",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_4_CFG",
                "addr": 42,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 4",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_5_CFG",
                "addr": 43,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 5",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_6_CFG",
                "addr": 44,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 6",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_7_CFG",
                "addr": 45,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 7",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_8_CFG",
                "addr": 46,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 8",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_9_CFG",
                "addr": 47,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 9",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_10_CFG",
                "addr": 48,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 10",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_11_CFG",
                "addr": 49,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 11",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_12_CFG",
                "addr": 50,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 12",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_13_CFG",
                "addr": 51,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 13",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_14_CFG",
                "addr": 52,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 14",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_15_CFG",
                "addr": 53,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 15",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_16_CFG",
                "addr": 54,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 16",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_17_CFG",
                "addr": 55,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 17",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_18_CFG",
                "addr": 56,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 18",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_19_CFG",
                "addr": 57,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 19",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_20_CFG",
                "addr": 58,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 20",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_21_CFG",
                "addr": 59,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 21",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_22_CFG",
                "addr": 60,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 22",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_23_CFG",
                "addr": 61,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 23",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_24_CFG",
                "addr": 62,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 24",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "GPIO_25_CFG",
                "addr": 63,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Configuration for GPIO 25",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "DIR",
                        "desc": "Pin Direction",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "IN",
                                "desc": "GPIO is an input",
                                "val": 0
                            },
                            {
                                "name": "OUT",
                                "desc": "GPIO is an output",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PP",
                        "desc": "Enables Push/Pull on output, and Pull-up on input",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "LL",
                        "desc": "Low Level",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "LOW",
                                "desc": "Low level output",
                                "val": 0
                            },
                            {
                                "name": "HIGH",
                                "val": 1
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt selection",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "ALT",
                        "desc": "Indicates that GPIO is disabled because pin is being used for an alternate function (PWM, ADC, etc)",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables GPIO",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "IRQ_CFG",
                "addr": 64,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "rw",
                "desc": "IRQ Configuration",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "Enabled",
                        "desc": "Enables IRQ signal on selected GPIO",
                        "mask": 32768,
                        "offset": 15,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "Polarity",
                        "desc": "Sets polarity of IRQ",
                        "mask": 16384,
                        "offset": 14,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "ACTIVE_HIGH",
                                "desc": "GPIO is high when IRQ is pending",
                                "val": 1
                            },
                            {
                                "name": "ACTIVE_LOW",
                                "desc": "GPIO is low when IRQ is pending",
                                "val": 0
                            }
                        ],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "Output",
                        "desc": "Selects the GPIO to use for IRQ",
                        "mask": "0b011111",
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 5
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_0_CFG",
                "addr": 66,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "rw",
                "desc": "Configuration for ADC 0",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "Treshold",
                        "desc": "IRQ threshold for ADC channel",
                        "mask": 65520,
                        "offset": 4,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 12
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt setting for ADC channel",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables ADC Channel",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_1_CFG",
                "addr": 68,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "rw",
                "desc": "Configuration for ADC 1",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "Treshold",
                        "desc": "IRQ threshold for ADC channel",
                        "mask": 65520,
                        "offset": 4,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 12
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt setting for ADC channel",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables ADC Channel",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_2_CFG",
                "addr": 70,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "rw",
                "desc": "Configuration for ADC 2",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "Treshold",
                        "desc": "IRQ threshold for ADC channel",
                        "mask": 65520,
                        "offset": 4,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 12
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt setting for ADC channel",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables ADC Channel",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_3_CFG",
                "addr": 72,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "rw",
                "desc": "Configuration for ADC 3",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "Treshold",
                        "desc": "IRQ threshold for ADC channel",
                        "mask": 65520,
                        "offset": 4,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 12
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt setting for ADC channel",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables ADC Channel",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "ADC_4_CFG",
                "addr": 74,
                "type": "uint16",
                "size": 2,
                "bitsize": 16,
                "perm": "rw",
                "desc": "Configuration for ADC 4",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "Treshold",
                        "desc": "IRQ threshold for ADC channel",
                        "mask": 65520,
                        "offset": 4,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 12
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "IRQ",
                        "desc": "Interrupt setting for ADC channel",
                        "mask": 12,
                        "offset": 2,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "NONE",
                                "desc": "No interrupt",
                                "val": "0b00"
                            },
                            {
                                "name": "RISING",
                                "desc": "Trigger on Rising",
                                "val": "0b01"
                            },
                            {
                                "name": "FALLING",
                                "desc": "Trigger on falling",
                                "val": "0b10"
                            },
                            {
                                "name": "ANY",
                                "desc": "Trigger on any",
                                "val": "0b11"
                            }
                        ],
                        "bitsize": 2
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "EN",
                        "desc": "Enables ADC Channel",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "PWM_CONFIG",
                "addr": 76,
                "type": "uint32",
                "size": 4,
                "bitsize": 32,
                "perm": "rw",
                "desc": "Configuration for PWM",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "Period",
                        "desc": "Period for PWM signals",
                        "mask": 4294901760,
                        "offset": 16,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 16
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "Prescaler",
                        "desc": "Prescaler for PWM, using 16Mhz clock",
                        "mask": 61440,
                        "offset": 12,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "PRESCALER_1",
                                "desc": "divide clock by 1 (16Mhz)",
                                "val": 0
                            },
                            {
                                "name": "PRESCALER_2",
                                "desc": "divide clock by 2 (8Mhz)",
                                "val": 1
                            },
                            {
                                "name": "PRESCALER_4",
                                "desc": "divide clock by 4  (4Mhz)",
                                "val": 2
                            },
                            {
                                "name": "PRESCALER_8",
                                "desc": "divide clock by 8  (2Mhz)",
                                "val": 3
                            },
                            {
                                "name": "PRESCALER_16",
                                "desc": "divide clock by 16  (1Mhz)",
                                "val": 4
                            },
                            {
                                "name": "PRESCALER_32",
                                "desc": "divide clock by 32  (500Khz)",
                                "val": 5
                            },
                            {
                                "name": "PRESCALER_64",
                                "desc": "divide clock by 64  (250Khz)",
                                "val": 6
                            },
                            {
                                "name": "PRESCALER_128",
                                "desc": "divide clock by 128 (125Khz)",
                                "val": 7
                            },
                            {
                                "name": "PRESCALER_256",
                                "desc": "divide clock by 256 (62.5 Khz)",
                                "val": 8
                            },
                            {
                                "name": "PRESCALER_512",
                                "desc": "divide clock by 512  (31.25 Khz)",
                                "val": 9
                            },
                            {
                                "name": "PRESCALER_1024",
                                "desc": "divide clock by 1024 (1.5625 KHz)",
                                "val": 10
                            },
                            {
                                "name": "PRESCALER_2048",
                                "desc": "divide clock by 2048  ()",
                                "val": 11
                            },
                            {
                                "name": "PRESCALER_4096",
                                "desc": "divide clock by 4096  ()",
                                "val": 12
                            },
                            {
                                "name": "PRESCALER_8192",
                                "desc": "divide clock by 8192  ()",
                                "val": 13
                            },
                            {
                                "name": "PRESCALER_16384",
                                "desc": "divide clock by 16384 ()",
                                "val": 14
                            },
                            {
                                "name": "PRESCALER_32768",
                                "desc": "divide clock by 32768 ()",
                                "val": 15
                            }
                        ],
                        "bitsize": 4
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "CH0_Enable",
                        "desc": "Enables PWM channel 0",
                        "mask": 1,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "CH1_Enable",
                        "desc": "Enables PWM channel 1",
                        "mask": 2,
                        "offset": 1,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "CH2_Enable",
                        "desc": "Enables PWM channel 2",
                        "mask": 4,
                        "offset": 2,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "CH3_Enable",
                        "desc": "Enables PWM channel 3",
                        "mask": 8,
                        "offset": 3,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "CH4_Enable",
                        "desc": "Enables PWM channel 4",
                        "mask": 16,
                        "offset": 4,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "CH5_Enable",
                        "desc": "Enables PWM channel 5",
                        "mask": 32,
                        "offset": 5,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "CH6_Enable",
                        "desc": "Enables PWM channel 6",
                        "mask": 64,
                        "offset": 6,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "CH7_Enable",
                        "desc": "Enables PWM channel 7",
                        "mask": 128,
                        "offset": 7,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "WHO_AM_I",
                "addr": 80,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Device ID",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "ID",
                        "desc": "ID of device",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [
                            {
                                "name": "STM8S003F3",
                                "desc": "20 pin variant",
                                "val": 112
                            },
                            {
                                "name": "STM8S003K3",
                                "desc": "32 pin variant",
                                "val": 113
                            }
                        ],
                        "bitsize": 1
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "VERSION",
                "addr": 81,
                "type": "uint32",
                "size": 4,
                "bitsize": 32,
                "perm": "",
                "desc": "Version of firmware",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "MAJOR",
                        "desc": "Major Version",
                        "mask": 4278190080,
                        "offset": 24,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 8
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "MINOR",
                        "desc": "Major Version",
                        "mask": 16711680,
                        "offset": 16,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 8
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "PATCH",
                        "desc": "Major Version",
                        "mask": 65280,
                        "offset": 8,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 8
                    }
                },
                {
                    "value": 0,
                    "spec": {
                        "name": "BUILD",
                        "desc": "Major Version",
                        "mask": 255,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 8
                    }
                }
            ]
        },
        {
            "state": "unknown",
            "spec": {
                "name": "EEPROM_MEM",
                "addr": 85,
                "type": "uint8",
                "size": 1,
                "bitsize": 8,
                "perm": "rw",
                "desc": "Start address of EEPROM memory on stm8. User can read/write up to 128 bytes starting at this address",
                "addr_str": ""
            },
            "fields": [
                {
                    "value": 0,
                    "spec": {
                        "name": "EEPROM_MEM",
                        "desc": "Start address of EEPROM memory on stm8. User can read/write up to 128 bytes starting at this address",
                        "mask": 4294967295,
                        "offset": 0,
                        "format": "hex",
                        "vals": [],
                        "bitsize": 8
                    }
                }
            ]
        }
    ],
    "spec": {
        "name": "stm8_expander",
        "description": "Driver for STM8 running custom GPIO expander firmware",
        "category": "Device/IO",
        "datasheet": "https://www.st.com/resource/en/datasheet/stm8s003f3.pdf",
        "mfr": "UpRev",
        "mfr_pn": "STM8S003F3"
    }
};


var app = new Vue({
    el: '#app',
    data: {
        device: jsonDevice
    },
    methods: {

    }
})

