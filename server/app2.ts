import { Server } from "./Server";
import { DataBase } from "./api/models/database";
import mongoose = require('mongoose');

var webServer: Server;

// DataBase.Connect();
// var User = mongoose.model('User');

// var user = new User() as any;

// user.setPassword("k8a8ass");

// user.name = "sdsda";
// user.email = "my email22";

// user.save();




webServer = Server.bootstrap();
webServer.start();
