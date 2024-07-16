import { Request, Response } from "express";
import  GetEventById  from "../../Application/UseCase/GetEventById";
import sendMessageAndWaitForResponse from "../Service/SagaMessagin";

export default class GetEventByIdController {

    constructor(readonly useCase:GetEventById){}

    async run(request:Request,response:Response) {
        const id = request.params.event_id
        console.log(id)
        try {
            
            let event = await this.useCase.run(Number(id));

            let eventSaga = await sendMessageAndWaitForResponse('getEventById',event);

            if (eventSaga) {
                return response.status(200).json({data:eventSaga,message:"Event obtained",success:true});
            } else {
                response.status(404).send({
                    
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