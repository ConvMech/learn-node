import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import { createConnection, ConnectionOptions } from "typeorm";

createConnection(
  <ConnectionOptions>{
    type: "postgres",
    extra: {  ssl: process.env.DATABASE_URL ? true : false, },
    // Change the next line to use the Heroku postgresql from other environment like localhost, remenber that heroku changes this data periodically for security reasons
    url: process.env.DATABASE_URL || "postgres://test:test@localhost:5432/test", 
    entities: [ "dist/entity/**/*.js" ],
    subscribers: [],
    synchronize: true,
  }
).then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    //insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));

    console.log("Heroku Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
