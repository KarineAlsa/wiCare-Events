import { Request, Response } from "express";
import  CreateEvent  from "../../Application/UseCase/CreateEventUseCase";

export default class RegisterEventController {

    constructor(readonly useCase:CreateEvent){}

    async run(request:Request,response:Response) {
        const { name, description, location, date, hour, cathegory} = request.body;
        const association_id = request.params.id;
        
        if (!name || !description || !location || !date || !hour || !association_id || !cathegory) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        if (
            name.trim() === "" ||
            description.trim() === "" ||
            location.trim() === "" ||
            date.trim() === "" ||
            hour.trim() === "" ||
            cathegory.trim() === ""
            ) {
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }
        try {
            
            let event = await this.useCase.run({
                name,
                description,
                location,
                hour,
                cathegory,
                date,
                associationId:Number(association_id)
            });
            if (event) {
                return response.status(200).json({data:event,message:"Event created",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo crear el evento",
                    success: false,
                });
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