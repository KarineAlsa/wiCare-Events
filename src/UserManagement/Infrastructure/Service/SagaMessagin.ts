import * as amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();
const sendMessageAndWaitForResponse = async (event:string,data:any):Promise<any> =>{
    try {
        const connection = await amqp.connect({
            protocol: process.env.RABBIT_PROTOCOL,
            hostname: process.env.RABBIT_HOST,
            port: 5672,
            username: process.env.RABBIT_USER,
            password: process.env.RABBIT_PASSWORD,
        });
        const channel = await connection.createChannel();
        const exchange = 'saga_exchange';

        await channel.assertExchange(exchange,'direct',{durable:false});

        const responseQueue = await channel.assertQueue('',{exclusive:true});
        const correlationId = generateCorrelationId();

        const responsePromise = new Promise<any>((resolve) => {
            channel.consume(responseQueue.queue,(msg:any) => {
                if (msg.properties.correlationId === correlationId) {
                    const response = JSON.parse(msg.content.toString());
                    resolve(response);
                }
            }, {noAck:true});
        });

        await channel.publish(exchange,event,Buffer.from(JSON.stringify(data)),{
            correlationId,
            replyTo:responseQueue.queue
        });

        console.log(`[x] Sent ${event}: ${JSON.stringify(data)}`);

        return responsePromise;
    } catch (error:any) {
        console.error(error);
    }
    
}

const generateCorrelationId = () => {
    return Math.random().toString() + Date.now().toString();
};

export default sendMessageAndWaitForResponse;