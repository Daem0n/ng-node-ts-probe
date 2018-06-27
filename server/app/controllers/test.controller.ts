import { Request, Response } from 'express';
import { classRoute, httpGet, httpPost, route } from '../lib/framework/decorators';
import { BaseController } from './base.controller';

@classRoute('/test/', 'Proverka')
@classRoute('/probe')
export class TestController extends BaseController {
    @httpGet
    @httpPost
    @route('')
    @route('INDEX')
    index(req: Request, res: Response) {
        res.send('Birds home page');
    }

    @httpGet
    @route('About/', 'info')
    about(req: Request, res: Response) {
        res.send('About birds');
    }
}
