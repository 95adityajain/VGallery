import express from "express";
import * as UserService from "./UserService";



const Router = express.Router ();

Router.post ("/login", UserService.preLogin);
Router.post ("/login", UserService.login);

Router.post ("/registrationRequest", UserService.preRegistrationRequest);
Router.post ("/registrationRequest", UserService.registrationRequest);



export default Router;
