import mongoose = require('mongoose');
import * as express from "express";

export class Profile {
    static profileRead(req: express.Request, res: express.Response) {
        var User = mongoose.model('User');

        if (!(req as any).payload._id) {
            res.status(401).json({
                "message": "UnauthorizedError: private profile"
            });
        } else {
            User
                .findById((req as any).payload._id)
                .exec(function (err, user) {
                    res.status(200).json(user);
                });
        }

    };
}
