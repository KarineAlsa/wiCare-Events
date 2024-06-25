import { Request, Response } from "express";
import  GetEventById  from "../../Application/UseCase/GetEventById";

export default class GetEventByIdController {

    constructor(readonly useCase:GetEventById){}

    async run(request:Request,response:Response) {
        const id = request.params.event_id
        try {
            
            let event = await this.useCase.run(Number(id));
            if (event) {
                return response.status(200).json({data:event,message:"Event obtained",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo obtener el evento",
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