import { Event } from "../../Domain/Entity/Event";
import  EventInterface  from "../../Domain/Port/EventInterface";
import { IStorageService } from '../../Domain/Service/IStorageService';

export default class RegisterEventUseCase {

    constructor(readonly repository:EventInterface, private storageService: IStorageService) {}

    async run( {name, description, location, hour, cathegory, date, associationId, file}: {
        name:string,
        description:string,
        location:string,
        hour:string,
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
                hour,
                date,
                cathegory,
                location,
                associationId,
                url
            );


            return await this.repository.registerEvent(event);
        }catch(error) {

        }
    }

}