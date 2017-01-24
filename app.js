/**
 * Module dependencies
 */
//import path from "path";
import logger from "winston";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import http from "http";
import socketIO from "socket.io";

import mongoose from "./server/commons/MongoosePromise";
import config from "./server/config";


/**
 * logger configuration
 */
if (config.env == "production") {
    logger.configure ({});
}


/**
 * Mongoose connection and events
 */
mongoose.connect (config.mongoose.getUrlString ());
mongoose.connection.on("error",function (err) {
    logger.error("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
    logger.error("Mongoose connection disconnected");
});
// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function() {
    mongoose.connection.close(function () {
        logger.info("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});

/**
 * creating express and socket.IO app instance
 */
const app = new express ();
const httpServer = http.Server (app);
const io = socketIO (httpServer);



/**
 * Express configuration
 */
app.set ("env", config.env);
app.set ("port", config.env);
//app.use ("/static", express.static (config.staticPath));
app.use (compression ());
app.use (bodyParser.json ());
app.use(bodyParser.urlencoded({extended:true}));



/**
 * App Routes
 */
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.use ("/api", function () {});

app.use(function(req, res){
    res.type("text/html");
    res.status(404);
    res.send("404 - Not Found");
});



/**
 * Starting server
 */
io.on ("connection", function () {});

httpServer.listen(config.express.port, function(){
    logger.info("Server Listening at port no. : " + config.express.port);
});
