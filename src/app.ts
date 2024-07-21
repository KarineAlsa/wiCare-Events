import express from "express";
import dotenv from 'dotenv'
import fs from 'fs';
import https from 'https';
import path from 'path';
import './UserManagement/Infrastructure/Service/SchedulerService'; // Importa para que el cron job se inicie

import eventRoutes from "./UserManagement/Infrastructure/Route/EventRoutes";

import { consumeMessages } from './UserManagement/Infrastructure/Service/SagaConsumer';

dotenv.config()
const server = express();
const server_port =process.env.PORT;
server.use(express.json());
server.use('/', eventRoutes);

async function startServer() {

    await consumeMessages();
const httpsOptions = {
        key: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/wicare-events.ddns.net/privkey.pem')),
        cert:fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/wicare-events.ddns.net/fullchain.pem')),
    };
    https.createServer(httpsOptions, server).listen(server_port, () => {
        console.log(`Server listening on https://localhost:${server_port}/`);
    });
    

}

startServer();


export default server;
