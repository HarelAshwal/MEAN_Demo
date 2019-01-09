import { Server } from "./Server";

var webServer: Server = new Server();

webServer = Server.bootstrap();
webServer.start();
