
export class Event {

    public name:string;
    public description:string;
    public hour:string;
    public date:string;
    public cathegory:string;
    public location:string;
    public association_id:number
    public picture:string
    public id?:number

    constructor(
        name:string,
        description:string,
        hour: string,
        date:string,
        cathegory:string,
        location:string,
        association_id:number,
        picture:string,
        id?:number
    ) {
        this.name = name;
        this.description = description;
        this.hour = hour;
        this.date = date;
        this.cathegory = cathegory;
        this.location = location;
        this.association_id = association_id;
        this.picture = picture;
        this.id = id;
    }

}