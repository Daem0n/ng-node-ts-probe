import express from 'express';

import {Router} from './router';
import {WelcomeController} from './controllers';
import {ApplicationConfiguration} from "./lib/application-configuration";

export class Application {
    static Current: Application;

    express: express.Application;
    configuration: ApplicationConfiguration;
    router: Router;

    constructor() {
        // Create a new express application instance
        this.express = express();
        this.configuration = ApplicationConfiguration.Default();
        // The port the express app will listen on

        this.router = new Router();
        this.express.use(this.router.handler);

        // Mount the WelcomeController at the /welcome route
        this.express.use('/welcome', WelcomeController);

        // Serve the application at the given port
    }

    start() {
        this.express.listen(this.configuration.port, () => {
            // Success callback
            console.log(`Listening at http://localhost:${this.configuration.port}/`);
        });
    }
}
