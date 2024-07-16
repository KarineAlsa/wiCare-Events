import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";


export default class GetEventVolunteerUseCase {

    constructor(readonly repository:EventInterface) {}

    async run(id:number):Promise<Event|any> {
        try {
            return await this.repository.getEventUsersByIdEvent(id);
        }catch(error) {

        }
    }

}