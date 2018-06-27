import express, { Request, Response, NextFunction } from 'express';

import {Router} from './lib/framework/router';
import {ApplicationConfiguration} from "./lib/application-configuration";

export class Application {
    static Current: Application;

    express: express.Express;
    configuration: ApplicationConfiguration;
    router: Router;
    count: number = 0;

    constructor() {
        // Create a new express application instance
        this.express = express();
        this.configuration = ApplicationConfiguration.Default();
        // The port the express app will listen on

        this.router = new Router(express.Router());
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            const label = (++this.count).toString();
            console.log(label, req.url);
            console.time(label);
            next();
            console.timeEnd(label);
        });
        this.express.use('/api', this.router.getRouter());
    }

    start() {
        this.express.listen(this.configuration.port, () => {
            // Success callback
            console.log(`Listening at http://localhost:${this.configuration.port}/`);
        });
    }
}
