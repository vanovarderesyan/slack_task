import { Request, Response, NextFunction } from 'express';
import * as workspaceService from '../services/workspaceService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import WorkspacePayload  from '../domain/requests/WorkspacePayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {
    const {userId} = res.locals.loggedInPayload;

    try {
        const response = await workspaceService.fetchAll(userId);

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
        const response = await workspaceService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.workspace.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const workspacePayload = req.body as WorkspacePayload;
        const {userId} = res.locals.loggedInPayload;
        workspacePayload.creatorId = userId

        const workspace = await workspaceService.insert(workspacePayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: workspace,
            message: messages.workspace.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await workspaceService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspace.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await workspaceService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspace.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const workspacePayload = req.body as WorkspacePayload;

        const response = (await workspaceService.update(id,workspacePayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.workspace.edit
        })

    } catch (error) {
        next(error);
    }
}