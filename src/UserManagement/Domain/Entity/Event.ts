
export class Event {

    public name:string;
    public description:string;
    public hour_start:string;
    public hour_end:string;
    public date:string;
    public cathegory:string;
    public latitude:number;
    public longitude:number;
    public association_id:number
    public picture:string
    public id?:number

    constructor(
        name:string,
        description:string,
        hour_start:string,
        hour_end:string,
        date:string,
        cathegory:string,
        latitude:number,
        longitude:number,
        association_id:number,
        picture:string,
        id?:number
    ) {
        this.name = name;
        this.description = description;
        this.hour_start = hour_start;
        this.hour_end = hour_end;
        this.date = date;
        this.cathegory = cathegory;
        this.latitude = latitude;
        this.longitude = longitude;
        this.association_id = association_id;
        this.picture = picture;
        this.id = id;
    }

}