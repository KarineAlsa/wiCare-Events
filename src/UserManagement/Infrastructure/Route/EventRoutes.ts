import  express  from "express";
import {   registerEventController, getAllEventsController, getEventsAssociationController, getEventByIdController, getEventsByCathegoryController   } from "../Dependencies";
import {VerifyToken} from "../Controller/Middleware/VerifyToken";
const eventRouter = express.Router();

eventRouter.post("/",VerifyToken,registerEventController.run.bind(registerEventController));
eventRouter.get("/",VerifyToken,getAllEventsController.run.bind(getAllEventsController));
eventRouter.get("/association/:association_id",VerifyToken,getEventsAssociationController.run.bind(getEventsAssociationController));
eventRouter.get("/cathegory/:cathegory",VerifyToken,getEventsByCathegoryController.run.bind(getEventsByCathegoryController));
eventRouter.get("/:event_id",VerifyToken,getEventByIdController.run.bind(getEventByIdController));
export default eventRouter;