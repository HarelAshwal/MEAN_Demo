import * as express from "express";
import passport = require('passport');
import mongoose = require('mongoose');

export class Authentication {
    static sendJSONresponse(res: express.Response, status, content) {
        res.status(status);
        res.json(content);
    }

    static register(req: express.Request, res: express.Response) {
        var User = mongoose.model('User');

        if (!req.body.name || !req.body.email || !req.body.password) {
            Authentication.sendJSONresponse(res, 400, {
                "message": "All fields required"
            });
            return;
        }

        var user = new User() as any;

        user.name = req.body.name;
        user.email = req.body.email;

        user.setPassword(req.body.password);

        user.save((err) => {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });

        });

    }

    static login(req: express.Request, res: express.Response) {

        // if(!req.body.email || !req.body.password) {
        //   sendJSONresponse(res, 400, {
        //     "message": "All fields required"
        //   });
        //   return;
        // }

        passport.authenticate('local', (err, user, info) => {
            var token;

            // If Passport throws/catches an error
            if (err) {
                res.status(404).json(err);
                return;
            }

            // If a user is found
            if (user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    }
}

