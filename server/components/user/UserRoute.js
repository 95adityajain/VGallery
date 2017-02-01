import express from "express";
import * as UserService from "./UserService";
import * as UserMiddleware from "./UserMiddleware";



const Router = express.Router ();

Router.post ("/registrationRequest", UserMiddleware.preRegistrationRequest);
Router.post ("/registrationRequest", UserService.registrationRequest);

Router.post ("/login", UserMiddleware.preLogin);
Router.post ("/login", UserService.login);


//authentication middleware
Router.use (UserMiddleware.authenticateLoggedInUser);

Router.get ("/logout", UserService.logout);
Router.get ("/basicProfile", UserService.basicProfile);
Router.get ("/preferences", UserService.preferences);



export default Router;
