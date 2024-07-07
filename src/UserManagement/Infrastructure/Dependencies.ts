import RegisterEventUseCase from "../Application/UseCase/CreateEventUseCase"
import GetAllEventsUseCase from "../Application/UseCase/GetAllEventsUseCase";
import GetEventsAssociation from "../Application/UseCase/GetEventsByAssociationUseCase";
import GetEventsByCathegoryUseCase from "../Application/UseCase/GetEventsByCathegory";
import GetEventByIdUseCase from "../Application/UseCase/GetEventById"

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

export const MySqEventRepository = new EventMySQLRepository();
export const currentRepository = MySqEventRepository;

export const registerEventCase = new RegisterEventUseCase(currentRepository, S3Storage);
export const getAllEventsCase = new GetAllEventsUseCase(currentRepository);
export const getEventsAssociationCase = new GetEventsAssociation(currentRepository);
export const getEventsByCathegoryCase = new GetEventsByCathegoryUseCase(currentRepository);
export const getEventByIdCase =  new GetEventByIdUseCase(currentRepository)

export const registerEventController = new RegisterEventController(registerEventCase);
export const getAllEventsController = new GetAllEventsController(getAllEventsCase);
export const getEventsAssociationController = new GetEventsByAssociationController(getEventsAssociationCase);
export const getEventsByCathegoryController = new GetEventsByCathegoryController(getEventsByCathegoryCase);
export const getEventByIdController =  new GetEventByIdController(getEventByIdCase)
