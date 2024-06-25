import express from "express";
import dotenv from 'dotenv'
import path from 'path';

import eventRoutes from "./UserManagement/Infrastructure/Route/EventRoutes";

dotenv.config()
const server = express();
const server_port =process.env.PORT;
server.use(express.json());
server.use('/', eventRoutes);



server.listen(server_port, () => {
    console.log(`Server listening on http://localhost:${server_port}/`);
});

export default server;