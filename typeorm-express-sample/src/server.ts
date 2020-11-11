import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import { createConnection, ConnectionOptions, getConnectionOptions } from "typeorm";

console.log("start")
console.log(process.env.DATABASE_URL)
console.log("postgres://test:test@localhost:5432/test")

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: 'postgres',
    synchronize: false,
    logging: false,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      }
    },
    entities: ['dist/entity/*.*'],
  };
  if (process.env.DATABASE_URL) {
    console.log("use HEROKU")
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    // gets your default configuration
    // you could get a specific config by name getConnectionOptions('production')
    // or getConnectionOptions(process.env.NODE_ENV)
    console.log("use local")
    connectionOptions = await getConnectionOptions(); 
  }
  return connectionOptions;
};

const connect2Database = async (): Promise<any> => {
  const typeormconfig = await getOptions();
  let result = await createConnection(typeormconfig);
  return result;
};

connect2Database().then(async connection => {

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
    app.listen(process.env.PORT || 3000);

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
