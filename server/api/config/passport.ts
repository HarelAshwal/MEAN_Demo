import passport = require('passport');
import passportLocal = require('passport-local');
import mongoose = require('mongoose');

export class PassportConfig {
    static Config() {
        //var User = mongoose.model('User');
        var User: any;

        var LocalStrategy = passportLocal.Strategy;

        passport.use(new LocalStrategy({
            usernameField: 'email'
        },
            (username, password, done) => {
                User.findOne({ email: username }, (err, user) => {
                    if (err) { return done(err); }
                    // Return if user not found in database
                    if (!user) {
                        return done(null, false, {
                            message: 'User not found'
                        });
                    }
                    // Return if password is wrong
                    if (!(user as any).validPassword(password)) {
                        return done(null, false, {
                            message: 'Password is wrong'
                        });
                    }
                    // If credentials are correct, return the user object
                    return done(null, user);
                });
            }
        ));
    }
}
