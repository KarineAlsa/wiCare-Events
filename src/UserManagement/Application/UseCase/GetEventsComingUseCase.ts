import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";


export default class GetEventsComingUseCase {

    constructor(readonly repository:EventInterface) {}

    async run(id_volunteer:number):Promise<Event[]|any> {
        try {
            return await this.repository.getEventsUserComing(id_volunteer);
        }catch(error) {

        }
    }

}