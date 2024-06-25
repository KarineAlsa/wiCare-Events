import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";


export default class GetEventsByCathegoryUseCase {

    constructor(readonly repository:EventInterface) {}

    async run(cathegory:string):Promise<Event[]|any> {
        try {
            return await this.repository.getEventsByCathegory(cathegory);
        }catch(error) {

        }
    }

}