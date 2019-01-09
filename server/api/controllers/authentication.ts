import passport = require('passport');
import mongoose = require('mongoose');

export class Authentication {
    sendJSONresponse(res, status, content) {
        res.status(status);
        res.json(content);
    }

    register(req, res) {
        var User = mongoose.model('User');

        // if(!req.body.name || !req.body.email || !req.body.password) {
        //   sendJSONresponse(res, 400, {
        //     "message": "All fields required"
        //   });
        //   return;
        // }

        var user = new User() as any;

        user.name = req.body.name;
        user.email = req.body.email;

        user.setPassword(req.body.password);

        user.save(function (err) {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        });

    }

    login(req, res) {

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

