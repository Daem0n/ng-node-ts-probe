import {Request, Response} from 'express';
import {classRoute, httpGet, httpPost} from "../lib/decorators";
import {BaseController} from "./base.controller";

@classRoute('/test')
export class TestController extends BaseController {
    @httpGet()
    index(req: Request, res: Response) {
        res.send('Birds home page');
    }

    @httpPost()
    about(req: Request, res: Response) {
        res.send('About birds');
    }
}
