import { Server } from "./Server";

var webServer: Server;

webServer = Server.bootstrap();
webServer.start();
