import mongoose = require('mongoose');

export class Profile {
    static profileRead(req, res) {
        var User = mongoose.model('User');

        if (!req.payload._id) {
            res.status(401).json({
                "message": "UnauthorizedError: private profile"
            });
        } else {
            User
                .findById(req.payload._id)
                .exec(function (err, user) {
                    res.status(200).json(user);
                });
        }

    };
}
