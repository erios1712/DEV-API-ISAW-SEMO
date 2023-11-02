import ModbusRTU from "modbus-serial";

export default async function MBconn(ipAddr, tcpPort, clientId, firstReg, numReg) {
   
        const client = new ModbusRTU();
            
        client.connectTCP(ipAddr, { port: tcpPort }, async () => {
            
                client.setID(clientId);
                client.readHoldingRegisters(firstReg, numReg)             
    
            });

        };

    





//respaldo funcion anterior
/*
    export default async function MBconn() {
   
        const client = new ModbusRTU();
        client.connectTCP("192.168.1.87", { port: 502 }, read);
        async function read(){
            
                client.setID(1);
                client.readHoldingRegisters(0, 9)
                .then(function(data){
                    console.log(data);
                    return data;
                })
                .catch(console.log);
        }
        return;
    }

*/
      
      