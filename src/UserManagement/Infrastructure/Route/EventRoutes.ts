import  express  from "express";
import {   registerEventController, getAllEventsController, getEventsAssociationController, getEventByIdController, getEventsByCathegoryController, addVolunteerToEventController  } from "../Dependencies";
import {VerifyToken} from "../Controller/Middleware/VerifyToken";
import {upload} from "../../../config/multer";
const eventRouter = express.Router();

eventRouter.post("/",VerifyToken,upload.single("picture"),registerEventController.run.bind(registerEventController));
eventRouter.get("/",VerifyToken,getAllEventsController.run.bind(getAllEventsController));
eventRouter.get("/association/:association_id",VerifyToken,getEventsAssociationController.run.bind(getEventsAssociationController));
eventRouter.get("/cathegory/:cathegory",VerifyToken,getEventsByCathegoryController.run.bind(getEventsByCathegoryController));
eventRouter.post("/:event_id/volunteer",VerifyToken,addVolunteerToEventController.run.bind(addVolunteerToEventController));
export default eventRouter;