import RegisterEventUseCase from "../Application/UseCase/CreateEventUseCase"
import GetAllEventsUseCase from "../Application/UseCase/GetAllEventsUseCase";
import GetEventsAssociation from "../Application/UseCase/GetEventsByAssociationUseCase";
import GetEventsByCathegoryUseCase from "../Application/UseCase/GetEventsByCathegory";
import GetEventByIdUseCase from "../Application/UseCase/GetEventById"
import AddVolunteerToEventUseCase from "../Application/UseCase/AddVolunteerEvent"
import GetEventVolunteerUseCase from "../Application/UseCase/GetEventsVolunteerUseCase";

import EventMySQLRepository from "./Repository/EventRepositoryMySQL"

import {JWTS} from "./Service/JWT"
import {S3StorageService} from "./Service/S3Storage"

export const JWT = new JWTS();
export const S3Storage = new S3StorageService();

import RegisterEventController from './Controller/RegisterEventController'
import GetAllEventsController from './Controller/GetAllEventsController'
import GetEventsByAssociationController from "./Controller/GetEventsByAssociationController";
import GetEventsByCathegoryController from "./Controller/GetEventsByCathegoryController";
import GetEventByIdController from "./Controller/GetEventByIdController"
import AddVolunteerToEventController from "./Controller/AddEventVolunteerController"
import GetEventVolunteerByIdController from "./Controller/GetEventVolunteersController"

export const MySqEventRepository = new EventMySQLRepository();
export const currentRepository = MySqEventRepository;

export const registerEventCase = new RegisterEventUseCase(currentRepository, S3Storage);
export const getAllEventsCase = new GetAllEventsUseCase(currentRepository);
export const getEventsAssociationCase = new GetEventsAssociation(currentRepository);
export const getEventsByCathegoryCase = new GetEventsByCathegoryUseCase(currentRepository);
export const getEventByIdCase =  new GetEventByIdUseCase(currentRepository)
export const addVolunteerToEventCase = new AddVolunteerToEventUseCase(currentRepository);
export const getEventVolunteerCase = new GetEventVolunteerUseCase(currentRepository);

export const registerEventController = new RegisterEventController(registerEventCase);
export const getAllEventsController = new GetAllEventsController(getAllEventsCase);
export const getEventsAssociationController = new GetEventsByAssociationController(getEventsAssociationCase);
export const getEventsByCathegoryController = new GetEventsByCathegoryController(getEventsByCathegoryCase);
export const getEventByIdController =  new GetEventByIdController(getEventByIdCase)
export const addVolunteerToEventController = new AddVolunteerToEventController(addVolunteerToEventCase);
export const getEventVolunteersController = new GetEventVolunteerByIdController(getEventVolunteerCase, getEventByIdCase);
