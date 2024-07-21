import { Event } from "../Entity/Event";
import { Event_User } from "../Entity/Event_User";

export default interface EventInterface{
    registerEvent(event:Event):Promise<Event|any>;//ya
    getAllEvents():Promise<Event[]>;//ya
    getEventById(id:number):Promise<Event|any>;
    getAllEventsByAssociationId(association_id:number):Promise<Event[]|any>;//ya
    getEventsByCathegory(cathegory:string):Promise<Event[]|any>;
    registerEventUser(Event_user:Event_User):Promise<any>;
    getEventUsersByIdEvent(id:number):Promise<any>;
    getEventsUserComing(id_volunteer:number):Promise<Event[]|any>;
    getEventsUserFinished(id_volunteer:number):Promise<Event[]|any>;
}