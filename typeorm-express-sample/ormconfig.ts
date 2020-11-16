// import { ConnectionOptions, getConnectionOptions } from "typeorm";

const getOptions = () => {
    let connectionOptions;
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
        migrations: ["dist/migrations/*.js"],
        cli: {
            migrationsDir: 'src/migrations',
        }
    };
    if (process.env.DATABASE_URL) {
        console.log("use HEROKU")
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    } else {
        console.log("use local")
        connectionOptions = {
            type: 'postgres',
            synchronize: false,
            host: "localhost",
            port: 5432,
            username: "test",
            password: "test",
            database: "test",
            entities: [
                "dist/entity/*.*",
            ],
            migrations: ["dist/migrations/*.js"],
            cli: {
                migrationsDir: 'src/migrations',
            }
        }
    }
    return connectionOptions;
};

module.exports = getOptions();

// const connect2Database = async (): Promise<any> => {
//   const typeormconfig = await getOptions();
//   let result = await createConnection(typeormconfig);
//   return result;
// };