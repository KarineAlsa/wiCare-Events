import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";


export default class GetEventsFinishedUseCase {

    constructor(readonly repository:EventInterface) {}

    async run(id_volunteer:number):Promise<Event[]|any> {
        try {
            return await this.repository.getEventsUserFinished(id_volunteer);
        }catch(error) {

        }
    }

}