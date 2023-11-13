import { Op } from "sequelize";
import modelTemp from "../models/temp.model.js";
import modelAmbientTemp from "../models/ambientTemp.model.js";
import modelRelativeHumidity from "../models/relativeHumidity.model.js";
import modelDevice from "../models/device.model.js";
import ModbusRTU from "modbus-serial";

export const findAllTemps = async (req, res) => {
    try {
        let temperatures = await modelTemp.findAll();

        res.json(temperatures);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al leer los registros.",
        });
    }
};


export const findConnStatus = async (req, res) => {
    try {
        let connection = await modelDevice.findAll(
            {limit: 1, 
            order:
            [["id", "DESC"]]
            }
            );

        res.status(200).json({connection});
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al leer los registros.",
        });
    }
};



export const saveRegisters = async (req, res) => {

try
{
    
    let { ipaddress, tcpport, slaveid, startreg, numregs, freqpolling } = req.body;

    console.log(req.body);
    
    if(!ipaddress || !tcpport || !slaveid || !startreg || !numregs || !freqpolling)
    {
        res.status(400).json(
            {
                code: 400,
                message: "Completar todos los datos para conectarse al dispositivo",
            }
            );
        throw new Error("Completar todos los datos para conectarse al dispositivo");        
    }
    
    "use strict";
    
    const client = new ModbusRTU();
    
    let mbsStatus = "Initializing...";    // holds a status of Modbus
    let marcador = false; // se usa en client.connect
    
    // Modbus 'state' constants
    const MBS_STATE_INIT          = "State init";
    const MBS_STATE_IDLE          = "State idle";
    const MBS_STATE_NEXT          = "State next";
    const MBS_STATE_GOOD_READ     = "State good (read)";
    const MBS_STATE_FAIL_READ     = "State fail (read)";
    const MBS_STATE_GOOD_CONNECT  = "State good (port)";
    const MBS_STATE_FAIL_CONNECT  = "State fail (port)";
    
    // Modbus TCP configuration values
    const mbsId       = slaveid;
    const mbsPort     = tcpport;
    const mbsHost     = ipaddress;
    const mbsScan     = freqpolling;
    const mbsTimeout  = freqpolling * 3;
    let mbsState    = MBS_STATE_INIT;
    
    //==============================================================
    const connectClient = function()
    {
       
        // close port (NOTE: important in order not to create multiple connections)
        //client.close();
        client.close;    
    
        // set requests parameters
        client.setID(mbsId);
        client.setTimeout(mbsTimeout);
    
        // try to connect
        client.connectTCP(mbsHost, { port: mbsPort })
            .then(function()
            {
                mbsState  = MBS_STATE_GOOD_CONNECT;
                mbsStatus = "Connected, wait for reading...";
                console.log(mbsStatus);
                modelDevice.create({ ip: ipaddress, port: tcpport, modbusid: slaveid, conn: true })
                .then(marcador = false);
            })
            .catch(async function(e) 
            {
                mbsState  = MBS_STATE_FAIL_CONNECT;
                mbsStatus = e.message;
                console.log(e);
                if(marcador === false){
                modelDevice.create({ ip: ipaddress, port: tcpport, modbusid: slaveid, conn: false })
                .then(marcador = true);
                }                
            });
    
    };//fin funcion connectClient
    
    //==============================================================
    const readModbusData = function()
    {
        // try to read data
        client.readHoldingRegisters (startreg, numregs)
            .then(function(data)
            {
                mbsState   = MBS_STATE_GOOD_READ;
                mbsStatus  = "success";
                function Int16 (value) {
                    var ref = value & 0xFFFF;
                    return (ref > 0x7FFF) ? ref - 0x10000 : ref;
                };
                let registersArray = [];    
                let tempArray = [...data.data];
                registersArray = tempArray.map(Int16);
                return registersArray;
            }
            )//inicio funcion almacenar registros en DB
            .then(async function(registersArray)
            {
                let temp1 = registersArray[0], temp2 = registersArray[1], temp3 = registersArray[2], temp4 = registersArray[3], temp5 = registersArray[4], temp6 = registersArray[5], temp7 = registersArray[6], temp8 = registersArray[7], temp9 = registersArray[8], temp10 = registersArray[9], temp11 = registersArray[10], temp12 = registersArray[11];
                let ambientTemp1 = registersArray[12], ambientTemp2 = registersArray[14], ambientTemp3 = registersArray[16], ambientTemp4 = registersArray[18], ambientTemp5 = registersArray[20], ambientTemp6 = registersArray[22], ambientTemp7 = registersArray[24], ambientTemp8 = registersArray[26];
                let rh1 = registersArray[13], rh2 = registersArray[15], rh3 = registersArray[17], rh4 = registersArray[19], rh5 = registersArray[21], rh6 = registersArray[23], rh7 = registersArray[25], rh8 = registersArray[27];
                
                console.log(temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9, temp10, temp11, temp12);
                console.log(ambientTemp1, ambientTemp2, ambientTemp3, ambientTemp4, ambientTemp5, ambientTemp6, ambientTemp7, ambientTemp8);
                console.log(rh1, rh2, rh3, rh4, rh5, rh6, rh7, rh8);
                                    
                await modelTemp.create({temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9, temp10, temp11, temp12});   
                await modelAmbientTemp.create({ambientTemp1, ambientTemp2, ambientTemp3, ambientTemp4, ambientTemp5, ambientTemp6, ambientTemp7, ambientTemp8});           
                await modelRelativeHumidity.create({rh1, rh2, rh3, rh4, rh5, rh6, rh7, rh8});

            }
            )
            .catch(function(e)
            {
                mbsState  = MBS_STATE_FAIL_READ;
                mbsStatus = e.message;
                console.log(e);
            });
    };
    
    //==============================================================
    const runModbus = function()
    {
        let nextAction;
    
        switch (mbsState)
        {
            case MBS_STATE_INIT:
                nextAction = connectClient;
                break;
    
            case MBS_STATE_NEXT:
                nextAction = readModbusData;
                break;
    
            case MBS_STATE_GOOD_CONNECT:
                nextAction = readModbusData;
                break;
    
            case MBS_STATE_FAIL_CONNECT:
                nextAction = connectClient;
                break;
    
            case MBS_STATE_GOOD_READ:
                nextAction = readModbusData;
                break;
    
            case MBS_STATE_FAIL_READ:
                if(client.isOpen){ mbsState = MBS_STATE_NEXT;  }
                else{ nextAction = connectClient; }
                break;
    
            default:
                // nothing to do, keep scanning until actionable case
        }
    
        console.log();
        console.log(nextAction);
    
        // execute "next action" function if defined
        if (nextAction !== undefined)
        {
            nextAction();
            mbsState = MBS_STATE_IDLE;
        }
        
        setTimeout(runModbus, mbsScan);
         
    };//fin funcion runModbus
    
    
    //==============================================================
    runModbus();
    
    res.status(200).json(
    {
        code: 200,
        message: "iniciando conexión a dispositivo modbus",
    }
    );

}//fin try
catch (error)
{
    console.log(error);
}//fin catch

}//fin funcion saveRegisters