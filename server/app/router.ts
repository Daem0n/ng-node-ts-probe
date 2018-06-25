import {Request, Response} from 'express';
import * as controllers from './controllers'
import {NextFunction} from "express-serve-static-core";
// import {Reflect} from "es6-shim";
import "reflect-metadata";


export class Router {

    constructor() {
        for (let key in controllers) {
            const controller = (controllers as any)[key];
            console.log(key, controller);
            console.log(Reflect.getMetadata());
        }
    }

    handler(req: Request, res: Response, next: NextFunction) {
        next();
    }

}
