import { Request, Response, NextFunction } from 'express';
import * as channelService from '../services/channelService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import ChannelPayload  from '../domain/requests/ChannelPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {
    const {userId} = res.locals.loggedInPayload;

    console.log('**********')
    const workspaceId:number = Number(_.params.workspaceId);
    try {
        const response = await channelService.fetchAll(userId,workspaceId);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.channel.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await channelService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.channel.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const channelPayload = req.body as ChannelPayload;
        const {userId} = res.locals.loggedInPayload;
        channelPayload.creatorId = userId

        const channel = await channelService.insert(channelPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: channel,
            message: messages.channel.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await channelService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.channel.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await channelService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.channel.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const channelPayload = req.body as ChannelPayload;
        const {userId} = res.locals.loggedInPayload;

        const response = (await channelService.update(id,channelPayload,userId));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.channel.edit
        })

    } catch (error) {
        console.log(error,'***********')
        next(error);
    }
}