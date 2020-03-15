import { Request, Response, NextFunction } from 'express';
import * as workspaceUserService from '../services/workspaceUserService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import WorkspaceUserPayload  from '../domain/requests/WorkspaceUserPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {
    const {userId} = res.locals.loggedInPayload;

    const workspaceId:number = Number(_.params.workspaceId);
    try {
        const response = await workspaceUserService.fetchAll(userId,workspaceId);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspaceUser.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function getInvetedWorkspace(_: Request, res: Response, next: NextFunction): Promise<void> {
    const {userId} = res.locals.loggedInPayload;

    try {
        const response = await workspaceUserService.getInvetedWorkspace(userId);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspace.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function myInvetedWorkspace(_: Request, res: Response, next: NextFunction): Promise<void> {
    const {userId} = res.locals.loggedInPayload;

    try {
        const response = await workspaceUserService.myInvetedWorkspace(userId);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspace.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function acceptedInvetedWorkspace(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {userId} = res.locals.loggedInPayload;
    const id: number = Number(req.params.id);

    try {
        const response = await workspaceUserService.acceptedInvetedWorkspace(id,userId);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspace.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await workspaceUserService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.workspaceUser.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const workspaceUserPayload = req.body as WorkspaceUserPayload;
        const {userId} = res.locals.loggedInPayload;
        workspaceUserPayload.creatorInviteId = userId

        const workspaceUser = await workspaceUserService.insert(workspaceUserPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: workspaceUser,
            message: messages.workspaceUser.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await workspaceUserService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspaceUser.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await workspaceUserService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspaceUser.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const workspaceUserPayload = req.body as WorkspaceUserPayload;
        const {userId} = res.locals.loggedInPayload;

        const response = (await workspaceUserService.update(id,workspaceUserPayload,userId));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspaceUser.edit
        })

    } catch (error) {
        console.log(error,'***********')
        next(error);
    }
}