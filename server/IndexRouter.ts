
import * as express from "express";
import fs = require('fs');
import tmp = require('tmp');
import cp = require("child_process");
import path = require("path");


export class IndexRouter {
    constructor(router: express.Router) {
        router.get('/GetTest1', this.GetTest1);
        router.get('/GetTest2', this.GetTest2);

    }

    public async GetTest1(req: express.Request, res: express.Response, next: express.NextFunction) {

        res.send({ hello: 'hello1' });
    }

    public async GetTest2(req: express.Request, res: express.Response, next: express.NextFunction) {

        res.send({ hello: 'hello2' });
    }


}
