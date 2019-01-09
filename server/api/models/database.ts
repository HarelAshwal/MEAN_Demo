import mongoose = require('mongoose');
import { User } from './user';
var gracefulShutdown;
var dbURI = 'mongodb+srv://test:test@cluster0-qitg8.azure.mongodb.net/meanAuth';

export class DataBase {
    static Connect() {
        mongoose.connect(dbURI);

        // CONNECTION EVENTS
        mongoose.connection.on('connected', function () {
            console.log('Mongoose connected to ' + dbURI);
        });
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose connection error: ' + err);
        });
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose disconnected');
        });

        User.InitModel();
    }

    // CAPTURE APP TERMINATION / RESTART EVENTS
    // To be called when process is restarted or terminated
    gracefulShutdown(msg, callback) {
        mongoose.connection.close(function () {
            console.log('Mongoose disconnected through ' + msg);
            callback();
        });
    };

    ProcessMonitors() {

        // For nodemon restarts
        process.once('SIGUSR2', function () {
            gracefulShutdown('nodemon restart', function () {
                process.kill(process.pid, 'SIGUSR2');
            });
        });
        // For app termination
        process.on('SIGINT', function () {
            gracefulShutdown('app termination', function () {
                process.exit(0);
            });
        });
        // For Heroku app termination
        process.on('SIGTERM', function () {
            gracefulShutdown('Heroku app termination', function () {
                process.exit(0);
            });
        });
    }




}

