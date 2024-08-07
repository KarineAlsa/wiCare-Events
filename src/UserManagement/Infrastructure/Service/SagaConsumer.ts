import * as amqp from 'amqplib';
import dotenv from 'dotenv';
import {getEventsAssociationCase, getEventsComingCase, getEventsFinishedCase, getEventsFinshedByAssociationCase} from '../Dependencies'
dotenv.config();


export const consumeMessages = async () => {

    try {
        const connection = await amqp.connect({
            protocol: process.env.RABBIT_PROTOCOL,
            hostname: process.env.RABBIT_HOST,
            port: 5672,
            username: process.env.RABBIT_USER,
            password: process.env.RABBIT_PASSWORD,
        });
        const channel    = await connection.createChannel();
        const exchange   = 'saga_exchange';
        
        await channel.assertExchange(exchange, 'direct', { durable: false });
    
        const queues = [
            { name: 'get_events_queue', bindingKey: 'getEventsOfAssociation', handler: handleGetEventsAssociation },
            { name: 'get_events_coming_volunteer', bindingKey: 'getEventsComingVolunteer', handler: handleGetEventsComing },
            { name: 'get_events_finished_volunteer', bindingKey: 'getEventsFinishedVolunteer', handler: handleGetEventsFinished },
            { name: 'get_events_finished_association', bindingKey: 'getEventsFinishedAssociation', handler: handleGetEventsFinishedAssociation }
            
        ];
        for (const queue of queues) {
            await channel.assertQueue(queue.name, { durable: false });
            await channel.bindQueue(queue.name, exchange, queue.bindingKey);
    
            console.log(`[*] Waiting for messages in ${queue.name}. To exit press CTRL+C`);
    
            channel.consume(queue.name, async (msg: any) => {
                const message = JSON.parse(msg.content.toString());
                await handleMessage(
                    queue.handler,
                    message,
                    msg.properties.replyTo,
                    msg.properties.correlationId,
                    channel
                );
                console.log(`[x] Received message from ${queue.name}: ${JSON.stringify(message)}`);
            }, { noAck: true });
        }
    } catch (error:any) {
        console.error(`Error consuming messages:`, error.message);
    }
    
};

const handleMessage = async (handler: Function, message: any, replyTo: string, correlationId: string, channel: amqp.Channel) => {
    try {
        const response = await handler(message);
        channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(response)), { correlationId });
        console.log(`Responded to temporary queue:`, response);
    } catch (error: any) {
        console.error(`Error handling message:`, error.message);
    }
};

const handleGetEventsAssociation = async (message: any) => {
    
    try {
        const events = await getEventsAssociationCase.run(message.associationId);
        console.log(`Events:`, events);
        return events ;
    } catch (error:any) {
        console.error(`Error getting events:`, error.message);
    }
    
};

const handleGetEventsComing = async (message: any) => {
        
        try {
            const events = await getEventsComingCase.run(message.volunteerId);
            console.log(`Events:`, events);
            return events ;
        } catch (error:any) {
            console.error(`Error getting events:`, error.message);
        }
        
    }

const handleGetEventsFinished = async (message: any) => {
            
            try {
                const events = await getEventsFinishedCase.run(message.volunteerId);
                console.log(`Events:`, events);
                return events ;
            } catch (error:any) {
                console.error(`Error getting events:`, error.message);
            }
            
        }

const handleGetEventsFinishedAssociation = async (message: any) => {
                
    try {
        const events = await getEventsFinshedByAssociationCase.run(message.associationId);
        console.log(`Events:`, events);
        return events ;
    } catch (error:any) {
        console.error(`Error getting events:`, error.message);
    }
    
}
