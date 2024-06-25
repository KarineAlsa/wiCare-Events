import { Request, Response } from "express";
import  GetEventsAssociationUseCase  from "../../Application/UseCase/GetEventsByAssociationUseCase";

export default class GetEventsAssociationController {

    constructor(readonly useCase:GetEventsAssociationUseCase){}

    async run(request:Request,response:Response) {
        const id = request.params.id
        const association_id = request.params.association_id;
        try {
            
            let event = await this.useCase.run(Number(association_id));
            if (event) {
                return response.status(200).json({data:event,message:"All events by association id",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo obtener los eventos por asociación",
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