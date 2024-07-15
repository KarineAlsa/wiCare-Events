import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";


export default class GetEventsByAssociationUseCase {

    constructor(readonly repository:EventInterface) {}

    async run(id:number):Promise<Event[]|any> {
        try {
            return await this.repository.getAllEventsByAssociationId(id);
        }catch(error) {

        }
    }

}