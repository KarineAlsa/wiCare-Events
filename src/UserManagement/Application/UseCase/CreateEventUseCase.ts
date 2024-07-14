import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";
import { IStorageService } from '../../Domain/Service/IStorageService';

export default class RegisterEventUseCase {

    constructor(readonly repository:EventInterface, private storageService: IStorageService) {}

    async run( {name, description, latitude,longitude, hour_start,hour_end, cathegory, date, associationId, file}: {
        name:string,
        description:string,
        latitude:number,
        longitude:number,
        hour_start:string,
        hour_end:string,
        cathegory:string,
        date:string,
        associationId:number,
        file:{file:Buffer,fileName:string,mimeType:string}
      } ):Promise<Event|any> {
        try {
            const url = await this.storageService.uploadEventPicture(file.file, file.fileName, file.mimeType);

            let event = new Event(
                name,
                description,
                hour_start,
                hour_end,
                date,
                cathegory,
                latitude,
                longitude,
                associationId,
                url
            );


            return await this.repository.registerEvent(event);
        }catch(error) {

        }
    }

}