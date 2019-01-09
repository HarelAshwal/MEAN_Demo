
import * as express from "express";


export class ApiRouter {
    constructor(router: express.Router) {
        router.get('/api/api1', this.Api1);
        router.get('/api/api2', this.Api2);

    }

    public async Api1(req: express.Request, res: express.Response, next: express.NextFunction) {

        res.send({ hello: 'api1' });
    }

    public async Api2(req: express.Request, res: express.Response, next: express.NextFunction) {

        res.send({ hello: 'api2' });
    }


}
