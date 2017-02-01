/**
 * Module dependencies
 */
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import http from "http";
import socketIO from "socket.io";
import Promise from "bluebird";

import mongoose from "./server/commons/client/MongooseClient";
import redis from "./server/commons/client/RedisClient";

import config from "./server/config";
import Utils from "./server/commons/utils";

import UserRoutes from "./server/components/user/UserRoute";



// If the Node process ends, close all connection
process.on("SIGINT", function() {
    Promise.all ([mongoose.connection.close, redis.end (true)]).finally (() => {
        Utils.log("info", "All resources freed. :)");
        process.exit (0);
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
app.set ("port", config.express.port);
//app.use ("/static", express.static (config.staticPath));
app.use (compression ());
app.use (bodyParser.json ());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Request logger
 */
app.use (Utils.requestLogger);


/**
 * App Routes
 */
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.use ("/user", UserRoutes);

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
    Utils.log("info", "Server Listening at port no. : " + config.express.port);
});
