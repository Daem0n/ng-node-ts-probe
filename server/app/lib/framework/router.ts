import 'reflect-metadata';
import express from 'express';
import { MetadataConstants as metaKeys } from './constants';
import * as controllers from '../../controllers/index'
import { normalizePath } from './lib/utils';

function controllerNameToRoute(key: string) {
    return normalizePath(key.replace(/controller$/i, ''));
}

export class Router {
    constructor(private router: express.Router) {
        for (let key in controllers) {
            const controller = (controllers as any)[key];
            const routes = Reflect.getMetadata(metaKeys.routePath, controller.prototype, metaKeys.routePath) || [controllerNameToRoute(key)];
            for (let propertyKey of Object.getOwnPropertyNames(controller.prototype)) {
                const method = controller.prototype[propertyKey];
                if (propertyKey !== 'constructor' && typeof method === 'function') {
                    const actionRoutes = Reflect.getMetadata(metaKeys.routePath, controller.prototype, propertyKey) || [controllerNameToRoute(propertyKey)];
                    for (let path of routes) {
                        for (let actionPath of actionRoutes) {
                            const verbs = Reflect.getMetadata(metaKeys.httpVerbs, controller.prototype, propertyKey) || ['all'];
                            for (let verb of verbs) {
                                this.setHandler(verb, path, actionPath, method);
                            }
                        }
                    }
                }
            }
        }
    }

    getRouter() {
        return this.router;
    }

    // private handler(req: Request, res: Response, next: NextFunction) {
    //     console.log(req.url);
    //     let url = req.url;
    //     const URL = urlParse(req.url);
    //     console.log(URL);
    //
    //     let testResult = testUrl(url, this.routes);
    //     if (!testResult.success) return next(new Error('Not found appropriate handler'));
    //     url = testResult.trimmedUrl;
    //
    //     const controllers = [];
    //     let results = [];
    //     for (let descriptor of this.descriptors){
    //         testResult = testUrl(url, descriptor.routes)
    //         if (testResult.success) {
    //             results.push(testResult);
    //             controllers.push(descriptor);
    //         }
    //     }
    //     if (controllers.length === 0) return next(new Error('Not found appropriate handler'));
    //     if (controllers.length > 1) return next(new Error('Ambiguous route'));
    //     const controller = controllers[0];
    //     url = results[0].trimmedUrl;
    //
    //     const methods = [];
    //     results = [];
    //     for (let descriptor of controller.methods){
    //         testResult = testUrl(url, descriptor.routes)
    //         if (testResult.success) {
    //             results.push(testResult);
    //             methods.push(descriptor);
    //         }
    //     }
    //     if (methods.length === 0) return next(new Error('Not found appropriate handler'));
    //     if (methods.length > 1) return next(new Error('Ambiguous route'));
    //     const method = methods[0];
    //     //url = results[0].trimmedUrl;
    //
    //     method.action(req, res, next);
    //
    //     next();
    // }
    private setHandler(verb: string, path: string, actionPath: string, method: any) {
        path = (path + actionPath).replace('//', '/');
        switch (verb) {
            case 'get':
                this.router.get(path, method);
                break;
            case 'post':
                this.router.post(path, method);
                break;
            case 'put':
                this.router.put(path, method);
                break;
            default:
                this.router.all(path, method);
                break;
        }
    }
}
