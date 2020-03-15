import { Router } from 'express';

import * as validate from './middlewares/validate';
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as authController from './controllers/auth';
import authenticate from './middlewares/authenticate';
import { loginSchema } from './validators/loginRequest';
import { userPOSTSchema,userPUTchema } from './validators/userRequest';
import validateRefreshToken from './middlewares/validateRefreshToken';
import { paramValidationSchema,paramValidationWorkspaceIdSchema } from './validators/paramRequest';

// workspace
import * as workspaceController from './controllers/workspace';
import { workspacePOSTSchema } from './validators/workspaceRequest';

// channel
import * as channelController from './controllers/channel';
import { channelPOSTSchema,channelPUTchema } from './validators/channelRequest';

// channel
import * as workspaceUserController from './controllers/workspaceUser';
import { workspaceUserPOSTSchema } from './validators/workspaceUserRequest';

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validate.schema(loginSchema), authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.post('/users', validate.schema(userPOSTSchema), userController.store);
router.use(authenticate);
router.get('/users', userController.index);
router.put('/user/setting', validate.schema(userPUTchema),userController.update);
// router.put('/user/profile',)


//workspace
router.get('/workspaces/',workspaceController.index)

router.get('/workspaces/count', workspaceController.count);
router.post('/workspace', validate.schema(workspacePOSTSchema), workspaceController.store);
router.route('/workspace/:id')
    .get(validate.params(paramValidationSchema), workspaceController.getOne)
    .delete(validate.params(paramValidationSchema), workspaceController.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(workspacePOSTSchema), workspaceController.update)

//channel
router.get('/channels/:workspaceId',validate.params(paramValidationWorkspaceIdSchema),channelController.index)
router.get('/channels/count', channelController.count);
router.post('/channel', validate.schema(channelPOSTSchema), channelController.store);
router.route('/channel/:id')
    .get(validate.params(paramValidationSchema), channelController.getOne)
    .delete(validate.params(paramValidationSchema), channelController.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(channelPUTchema), channelController.update)


//workspaceUser
router.get('/workspace-users/:workspaceId',validate.params(paramValidationWorkspaceIdSchema),workspaceUserController.index)
router.get('/workspace-invited/',workspaceUserController.getInvetedWorkspace)
router.get('/my/workspace/',workspaceUserController.myInvetedWorkspace)


router.put('/workspace-invited/accepted/:id',workspaceUserController.acceptedInvetedWorkspace)


router.get('/workspace-users/count', workspaceUserController.count);
router.post('/workspace-user', validate.schema(workspaceUserPOSTSchema), workspaceUserController.store);
router.route('/workspace-users/:id')
    .get(validate.params(paramValidationSchema), workspaceUserController.getOne)
    .delete(validate.params(paramValidationSchema), workspaceUserController.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(workspaceUserPOSTSchema), workspaceUserController.update)

export default router;
