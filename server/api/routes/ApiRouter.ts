
import * as express from "express";
import { Authentication } from "../controllers/authentication";
import jwt = require('express-jwt');
import { Profile } from "../controllers/profile";

export class ApiRouter {
    constructor(router: express.Router) {

        var auth = jwt({
            secret: 'MY_SECRET',
            userProperty: 'payload'
        });

        router.post('/api/register', Authentication.register);
        router.post('/api/login', Authentication.login);

        router.get('/api/profile', auth, Profile.profileRead);

    }



}
