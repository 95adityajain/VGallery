import express from "express";
import * as UserService from "./UserService";
import * as UserMiddleware from "./UserMiddleware";



const Router = express.Router ();

Router.put ("/registrationRequest", UserMiddleware.preRegistrationRequest);
Router.put ("/registrationRequest", UserService.registrationRequest);

Router.post ("/login", UserMiddleware.preLogin);
Router.post ("/login", UserService.login);

Router.get ("/requestResetPassword/:email", UserService.requestResetPassword);

Router.post ("/resetPassword", UserMiddleware.preResetPassword);
Router.post ("/resetPassword", UserService.resetPassword);

//authentication middleware
Router.use (UserMiddleware.authenticateLoggedInUser);


Router.get ("/logout", UserService.logout);

Router.get ("/basicProfile", UserService.getBasicProfile);
Router.post ("/basicProfile", UserService.updateBasicProfile);

Router.get ("/preferences", UserService.getPreferences);
Router.post ("/preferences", UserService.updatePreferences);

Router.get ("/contentRequest", UserService.getContentRequests);
Router.put ("/contentRequest", UserService.createContentRequest);

Router.post ("/password", UserService.preUpdatePassword);
Router.post ("/password", UserService.updatePassword);

Router.post ("/history/:page_no", UserService.getHistory);
Router.post ("/history/:content_type/:page_no", UserService.getHistoryByContentType);

Router.get ("/continue/:content_type/:page_no", UserService.getContinueContent);



export default Router;
