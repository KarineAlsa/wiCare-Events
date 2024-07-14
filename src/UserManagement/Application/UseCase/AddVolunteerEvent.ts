import { Event_User } from "../../Domain/Entity/Event_User";
import  EventInterface  from "../../Domain/Port/EventInterface";

export default class RegisterEventUseCase {

    constructor(readonly repository:EventInterface) {}

    async run( {event_id, user_id}: {
        event_id:number,
        user_id:number
      
      } ):Promise<Event_User|any> {
        try {
            
            let event = new Event_User(
                event_id,
                user_id
            );


            return await this.repository.registerEventUser(event);
        }catch(error) {

        }
    }

}