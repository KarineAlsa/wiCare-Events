import { Request, Response } from "express";
import  CreateEventVolunteer  from "../../Application/UseCase/AddVolunteerEvent";
import { randomUUID } from 'crypto';
export default class RegisterEventController {

    constructor(readonly useCase:CreateEventVolunteer){}

    async run(request:Request,response:Response) {
        const { volunteer_id} = request.body;
        const event_id = request.params.event_id;

        
        if (!volunteer_id || !event_id) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
      

        try {
            
            let event = await this.useCase.run({
                event_id:Number(event_id),
                user_id:Number(volunteer_id),
            });
            if (event) {
                return response.status(200).json({data:event,message:"Usuario asignado",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo crear el usuario en el evento",
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