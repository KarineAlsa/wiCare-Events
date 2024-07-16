import { Request, Response } from "express";
import  GetEventsByCathegory  from "../../Application/UseCase/GetEventsByCathegory";

export default class GetEventsByCathegoryController {

    constructor(readonly useCase:GetEventsByCathegory){}

    async run(request:Request,response:Response) {
        const cathegory = request.params.cathegory

        try {
            
            let event = await this.useCase.run(cathegory);
            if (event) {
                return response.status(200).json({data:event,message:"All events by cathegory",success:true});
            } else {
                response.status(404).send({
                    
                    message: "No se pudo obtener los eventos por categoria",
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