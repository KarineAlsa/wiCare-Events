import { Request, Response } from "express";
import  GetAllEventsUseCase  from "../../Application/UseCase/GetAllEventsUseCase";

export default class GetAllEventsController {

    constructor(readonly useCase:GetAllEventsUseCase){}

    async run(request:Request,response:Response) {
        try {
            
            let event = await this.useCase.run();
            if (event) {
                return response.status(200).json({data:event,message:"All events",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo obtener los eventos",
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