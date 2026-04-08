const amqplib = require('amqplib');

const {MESSAGE_BROKER_URL , EXCHANGE_NAME} = require('../config/server-config');

const createChannel = async() => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        

        //this is the exchange distributer
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subcribeMessage =async (channel,service,binding_key)=>{
    try {
        const applicationQueue = await channel.assertQueue('REMINDER_NAME');

        channel.bindQueue(applicationQueue.queue , EXCHANGE_NAME,binding_key );
        channel

        //ye jo msg arha h , ye bookingservice k respo h send by controller 
        channel.consume(applicationQueue.queue,msg => {
            console.log('Recieved data : ');
            console.log(msg.content.toString());
            const payload = JSON.parse(msg.content.toString());
            // //if another service s aee data k according , we can do some actions
            // if(payload.service == 'DEMO_SERVICE'){
            //     //action
            //     console.log("DEMO SERVICE");
            //     service(payload);
            // }
            service(payload); //using a general function 
            //instead of checking condition here ,we can use this function for checking in service layer

            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }
}

const publishMessage = async(channel,binding_key,message)=>{
    try {
        await channel.assertQueue('REMINDER_NAME');
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));
    } catch (error) {
          throw error;  
    }
}

module.exports = {
    subcribeMessage,
    createChannel,
    publishMessage
}