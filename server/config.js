const config = {};

config.env = "development";

config.express = {
    host: process.env.EXPRESS_HOST || "localhost",
    port: process.env.EXPRESS_PORT || 3000
};

const mongooseConfig = {
    host: process.env.MONGO_HOST || "localhost",
    port: process.env.MONGO_PORT || "27017",
    database: "vgallery",
    getUrlString : function () {
        return "mongodb://" + this.host + ":" + this.port + "/" + this.database;
    }
};

config.mongoose = mongooseConfig;

config.log = {

};

config.staticPath = "";



export default config;
