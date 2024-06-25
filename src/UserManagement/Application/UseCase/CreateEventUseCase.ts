import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";


export default class RegisterEventUseCase {

    constructor(readonly repository:EventInterface) {}

    async run( {name, description, location, hour, cathegory, date, associationId}: {
        name:string,
        description:string,
        location:string,
        hour:string,
        cathegory:string,
        date:string,
        associationId:number
      } ):Promise<Event|any> {
        try {

            let event = new Event(
                name,
                description,
                hour,
                date,
                cathegory,
                location,
                associationId
                
            );

            return await this.repository.registerEvent(event);
        }catch(error) {

        }
    }

}