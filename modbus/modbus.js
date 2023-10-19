// create an empty modbus client
import ModbusRTU from "modbus-serial";
const client = new ModbusRTU();


const modbusConn = function(){
// open connection to a tcp line
client.connectTCP("192.168.1.84", { port: 8502 });
client.setID(1);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function() {
    client.readHoldingRegisters(0, 10, function(err, data) {
        console.log(data.data);
    });
}, 1000);
}