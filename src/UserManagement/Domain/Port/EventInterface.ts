import { Event } from "../Entity/Event";

export default interface EventInterface{
    registerEvent(event:Event):Promise<Event|any>;//ya
    getAllEvents():Promise<Event[]>;//ya
    getEventById(id:number):Promise<Event|any>;
    getAllEventsByAssociationId(association_id:number):Promise<Event[]|any>;//ya
    getEventsByCathegory(cathegory:string):Promise<Event[]|any>;
}