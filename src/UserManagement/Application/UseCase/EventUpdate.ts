import  EventInterface  from "../../Domain/Port/EventInterface";

export default class EventUpdateUseCase {
    constructor(private eventRepository: EventInterface) {}
  
    async updateFinishedEvents(): Promise<void> {
      const now = new Date();
      const currentDateTime = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`; // Formato 'YYYY-MM-DD HH:MM:SS'
      
      await this.eventRepository.markFinishedEvents(currentDateTime);
    }
  }
