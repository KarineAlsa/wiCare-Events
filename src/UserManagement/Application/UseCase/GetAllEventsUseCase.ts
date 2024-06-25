import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";


export default class GetAllEventsUseCase {

    constructor(readonly repository:EventInterface) {}

    async run():Promise<Event[]|any> {
        try {
            return await this.repository.getAllEvents();
        }catch(error) {

        }
    }

}