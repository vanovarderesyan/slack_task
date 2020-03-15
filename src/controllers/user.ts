import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as userService from '../services/userService';
import UserPayload from '../domain/requests/UserPayload';

const { messages } = config;

/**
 * Handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function index(_: Request, res: Response, next: NextFunction) {
  try {
    const response = await userService.fetchAll();

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.fetchAll
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload = req.body as UserPayload;

    const response = await userService.insert(userPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

  try {
    const {userId} = res.locals.loggedInPayload;
    const workspacePayload = req.body as UserPayload;

      const response = (await userService.update(userId,workspacePayload));

      res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: response,
          message: messages.users.edit
      })

  } catch (error) {
      next(error);
  }
}