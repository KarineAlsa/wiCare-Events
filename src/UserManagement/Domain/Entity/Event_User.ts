
export class Event_User {

    public event_id:number;
    public user_id:number;
    public id?:number

    constructor(
        event_id:number,
        user_id:number,
        id?:number
    ) {
        this.event_id = event_id;
        this.user_id = user_id;
        this.id = id;
    }

}