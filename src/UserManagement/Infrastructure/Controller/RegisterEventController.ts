import { Request, Response } from "express";
import  CreateEvent  from "../../Application/UseCase/CreateEventUseCase";
import { randomUUID } from 'crypto';
import sendMessageAndWaitForResponse from "../Service/SagaMessagin";
import validator from 'validator';
export default class RegisterEventController {

    constructor(readonly useCase:CreateEvent){}

    async run(request:Request,response:Response) {
        const { name, description,date, hour_start,hour_end, cathegory} = request.body;
        const association_id = request.params.id;

        if (!request.file) {
            return response.status(400).json({ error: 'No file uploaded' });
        }
        
        if (!name || !description || !date || !hour_start|| !hour_end || !association_id || !cathegory) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }

        
        if (
            name.trim() === "" ||
            description.trim() === "" ||
            
            date.trim() === "" ||
            hour_start.trim() === "" ||
            hour_end.trim() === "" ||
            cathegory.trim() === ""
            ) {
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }

        const file = request.file?.buffer;
        const fileName = randomUUID() + request.file?.originalname;
        const mimeType = request.file?.mimetype;

        if (!file || !fileName || !mimeType) {
            return response.status(400).json({ error: 'File upload failed' });
        }

        try {

            let location = await sendMessageAndWaitForResponse('get_location', {associationId:association_id});
            if (location) {
                
                let event = await this.useCase.run({
                    name,
                    description,
                    latitude: Number(location.latitude),
                    longitude: Number(location.longitude),
                    hour_start,
                    hour_end,
                    cathegory,
                    date,
                    associationId:Number(association_id),
                    file:{file,fileName,mimeType},
                });
                if (event) {
                    return response.status(200).json({data:event,message:"Event created",success:true});
                } else {
                    response.status(404).send({
                        
                        message: "No se pudo crear el evento",
                        success: false,
                    });
                }
            }
        } catch (error:any) {
            console.log(error)
            response.status(500).send({
                
                message: "Ha ocurrido un error durante su petición.",
                success:false
            });
        }
    }
    }