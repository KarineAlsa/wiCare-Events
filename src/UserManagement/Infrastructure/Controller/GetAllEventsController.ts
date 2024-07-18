import e, { Request, Response } from "express";
import  GetAllEventsUseCase  from "../../Application/UseCase/GetAllEventsUseCase";
import sendMessageAndWaitForResponse from "../Service/SagaMessagin";

export default class GetAllEventsController {

    constructor(readonly useCase:GetAllEventsUseCase){}

    async run(request:Request,response:Response) {
        try {
            
            let events = await this.useCase.run();

            console.log(events)
            
            if (events) {
                let event = await sendMessageAndWaitForResponse("getAllEvents",events)
                if (event) {
                    
                    return response.status(200).json({data:event,message:"All events",success:true});
                }
                else {
                    response.status(404).send({
                        message: "No se pudo obtener los eventos",
                        success: false,
                    });
                }
            } else {
                response.status(404).send({
                    
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