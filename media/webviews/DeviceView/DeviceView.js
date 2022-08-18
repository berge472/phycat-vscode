
Vue.component('device-item',{
    props: ['device'],
    methods: {

    },
    template: `
    <div > 
        {{device.name}}
        <div style="display:flex" >
            <h2>{{device.test}}</h2>
            <div class="addr-container">
                <div v-for="reg in device.registers" v-bind:reg="reg" v-bind:key="reg.name" :class="['addr-' + reg.spec.bitsize, 'addr-item']">{{reg.spec.addr.toString(16)}}</div>
            </div>
            <div class="register-container">
                <register-item v-for="reg in device.registers" v-bind:reg="reg" v-bind:key="reg.name"></register-item>
            </div>
        </div>

    </div>
    `
});

Vue.component('register-item',{
    props: ['reg'],
    methods: {
    },
    template: `
    
    <div :class="['reg-' + reg.spec.bitsize, 'register']" ><h2>{{reg.spec.name}}</h2><div>


    
    `
});

var jsonDevice = {
    "name": "HTS221",
    "id": 1,
    "registers": [
      {
        "state": "unknown",
        "spec": {
          "name": "WHO_AM_I",
          "addr": 0,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "R",
          "desc": "Id Register"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "AV_CONF",
          "addr": 1,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "RW",
          "desc": "Humidity and temperature resolution mode"
        },
        "fields": [
          {
            "value": 0,
            "spec": {
              "name": "AVGH",
              "desc": "Selects the number of Humidity samples to average for data output",
              "mask": 7,
              "offset": 0,
              "format": "hex",
              "vals": [
                {
                  "name": "4",
                  "desc": "4 samples",
                  "val": "0b000"
                },
                {
                  "name": "8",
                  "desc": "8 samples",
                  "val": "0b001"
                },
                {
                  "name": "16",
                  "desc": "16 samples",
                  "val": "0b010"
                },
                {
                  "name": "32",
                  "desc": "32 samples",
                  "val": "0b011"
                },
                {
                  "name": "64",
                  "desc": "64 samples",
                  "val": "0b100"
                },
                {
                  "name": "128",
                  "desc": "128 samples",
                  "val": "0b101"
                },
                {
                  "name": "256",
                  "desc": "256 samples",
                  "val": "0b110"
                },
                {
                  "name": "512",
                  "desc": "512 samples",
                  "val": "0b111"
                }
              ],
              "bitsize": 0
            }
          },
          {
            "value": 0,
            "spec": {
              "name": "AVGT",
              "desc": "Selects the number of Temperature samples to average for data output",
              "mask": 56,
              "offset": 3,
              "format": "hex",
              "vals": [
                {
                  "name": "2",
                  "desc": "2 samples",
                  "val": "0b000"
                },
                {
                  "name": "4",
                  "desc": "4 samples",
                  "val": "0b001"
                },
                {
                  "name": "8",
                  "desc": "8 samples",
                  "val": "0b010"
                },
                {
                  "name": "16",
                  "desc": "16 samples",
                  "val": "0b011"
                },
                {
                  "name": "32",
                  "desc": "32 samples",
                  "val": "0b100"
                },
                {
                  "name": "64",
                  "desc": "64 samples",
                  "val": "0b101"
                },
                {
                  "name": "128",
                  "desc": "128 samples",
                  "val": "0b110"
                },
                {
                  "name": "256",
                  "desc": "256 samples",
                  "val": "0b111"
                }
              ],
              "bitsize": 0
            }
          }
        ]
      },
      {
        "state": "unknown",
        "spec": {
          "name": "CTRL1",
          "addr": 2,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "RW",
          "desc": "Control register 1"
        },
        "fields": [
          {
            "value": 0,
            "spec": {
              "name": "PD",
              "desc": "power down mode",
              "mask": 128,
              "offset": 7,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          },
          {
            "value": 0,
            "spec": {
              "name": "BDU",
              "desc": "Block Data update. Prevents update until LSB of data is read",
              "mask": 4,
              "offset": 2,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          },
          {
            "value": 0,
            "spec": {
              "name": "ODR",
              "desc": "Selects the Output rate for the sensor data",
              "mask": 3,
              "offset": 0,
              "format": "hex",
              "vals": [
                {
                  "name": "ONESHOT",
                  "desc": "readings must be requested",
                  "val": 0
                },
                {
                  "name": "1HZ",
                  "desc": "1 hz sampling",
                  "val": 1
                },
                {
                  "name": "7HZ",
                  "desc": "7 hz sampling",
                  "val": 2
                },
                {
                  "name": "12_5HZ",
                  "desc": "12.5 hz sampling",
                  "val": 3
                }
              ],
              "bitsize": 0
            }
          }
        ]
      },
      {
        "state": "unknown",
        "spec": {
          "name": "CTRL2",
          "addr": 3,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "RW",
          "desc": "Control register 2"
        },
        "fields": [
          {
            "value": 0,
            "spec": {
              "name": "BOOT",
              "desc": "Reboot memory content",
              "mask": 128,
              "offset": 7,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          },
          {
            "value": 0,
            "spec": {
              "name": "HEATER",
              "desc": "Enable intenal heating element",
              "mask": 2,
              "offset": 1,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          },
          {
            "value": 0,
            "spec": {
              "name": "ONESHOT",
              "desc": "Start conversion for new data",
              "mask": 1,
              "offset": 0,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          }
        ]
      },
      {
        "state": "unknown",
        "spec": {
          "name": "CTRL3",
          "addr": 4,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "RW",
          "desc": "Control register 3"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "STATUS",
          "addr": 5,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "R",
          "desc": "Status register"
        },
        "fields": [
          {
            "value": 0,
            "spec": {
              "name": "TEMP_READY",
              "desc": "indicates that a temperature reading is ready",
              "mask": 1,
              "offset": 0,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          },
          {
            "value": 0,
            "spec": {
              "name": "HUM_READY",
              "desc": "indicates that a humidity reading is ready",
              "mask": 2,
              "offset": 1,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          }
        ]
      },
      {
        "state": "unknown",
        "spec": {
          "name": "HUMIDITY_OUT",
          "addr": 6,
          "type": "int16",
          "size": 2,
          "bitsize": 16,
          "perm": "R",
          "desc": "Relative humidity data"
        },
        "fields": [
          {
            "value": 0,
            "spec": {
              "name": "HUM_OUT",
              "desc": "Current ADC reading for humidity sensor",
              "mask": 65535,
              "offset": 0,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          }
        ]
      },
      {
        "state": "unknown",
        "spec": {
          "name": "TEMP_OUT",
          "addr": 8,
          "type": "int16",
          "size": 2,
          "bitsize": 16,
          "perm": "R",
          "desc": "Temperature data"
        },
        "fields": [
          {
            "value": 0,
            "spec": {
              "name": "TEMP_OUT",
              "desc": "Current ADC reading for temperature sensor",
              "mask": 65535,
              "offset": 0,
              "format": "hex",
              "vals": [],
              "bitsize": 0
            }
          }
        ]
      },
      {
        "state": "unknown",
        "spec": {
          "name": "H0_rH_x2",
          "addr": 10,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "H1_rH_x2",
          "addr": 11,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "T0_DEGC_x8",
          "addr": 12,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "T1_DEGC_x8",
          "addr": 13,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "T1T0_MSB",
          "addr": 14,
          "type": "uint8",
          "size": 1,
          "bitsize": 8,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "H0_T0_OUT",
          "addr": 15,
          "type": "int16",
          "size": 2,
          "bitsize": 16,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "H1_T0_OUT",
          "addr": 17,
          "type": "int16",
          "size": 2,
          "bitsize": 16,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "T0_OUT",
          "addr": 19,
          "type": "int16",
          "size": 2,
          "bitsize": 16,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      },
      {
        "state": "unknown",
        "spec": {
          "name": "T1_OUT",
          "addr": 21,
          "type": "int16",
          "size": 2,
          "bitsize": 16,
          "perm": "R",
          "desc": "Calibration data"
        },
        "fields": []
      }
    ],
    "spec": {
      "name": "HTS221",
      "description": "Humidity and Temperature Sensor",
      "category": "Device",
      "datasheet": "https://www.st.com/content/ccc/resource/technical/document/datasheet/4d/9a/9c/ad/25/07/42/34/DM00116291.pdf/files/DM00116291.pdf/jcr:content/translations/en.DM00116291.pdf",
      "mfr": "STMicroelectronics",
      "mfr_pn": "HTS221TR"
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
