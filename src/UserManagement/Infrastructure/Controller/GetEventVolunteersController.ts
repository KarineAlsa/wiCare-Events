import e, { Request, Response } from "express";
import  GetEventById  from "../../Application/UseCase/GetEventById";
import  GetEventVolunteerById  from "../../Application/UseCase/GetEventsVolunteerUseCase";
import sendMessageAndWaitForResponse from "../Service/SagaMessagin";

export default class GetEventVolunteerByIdController {

    constructor(readonly useCase:GetEventVolunteerById, readonly aux:GetEventById){}

    async run(request:Request,response:Response) {
        const id = request.params.event_id
        
        try {
            
            let event = await this.aux.run(Number(id));
            
            if (event) {

                let volunteer = await this.useCase.run(Number(id));
                console.log(volunteer)
                if (volunteer) {
                    let eventSaga = await sendMessageAndWaitForResponse('getEventVolunteers',volunteer);

                    if(eventSaga){
                        

                    }
                    event.volunteers = eventSaga;
                
                    return response.status(200).json({data:eventSaga,message:"Volunteers obtained",success:true});
                } else {
                    response.status(404).send({
                        
                        message: "Sin voluntarios",
                        success: false,
                    });
                }
            }
            else {
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