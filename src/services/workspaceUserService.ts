import WorkspaceUserDetail from '../domain/entities/WorkspaceUserDetail';
import WorkspaceUser from '../models/WorkspaceUser';
import transform from '../utils/transform';
import WorkspaceUserPayload from '../domain/requests/WorkspaceUserPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(creatorId: number, workspaceId: number): Promise<WorkspaceUserDetail[]> {
    const workspaceUsers = await (await new WorkspaceUser().where({ "creator_invite_id": creatorId, 'workspace_id': workspaceId })).fetchAll({ withRelated: ['creator', 'workspace'] })
    const res = transform(workspaceUsers.serialize(), (workspaceUser: WorkspaceUserDetail) => ({
        id: workspaceUser.id,
        workspace: workspaceUser.workspace,
        workspaceId: workspaceUser.workspaceId,
        accepted: workspaceUser.accepted,
        creatorInvite: workspaceUser.creatorInvite,
        creatorInviteId: workspaceUser.creatorInviteId,
        invite: workspaceUser.invite,
        inviteId: workspaceUser.inviteId,
        updatedAt: new Date(workspaceUser.updatedAt).toLocaleString(),
        createdAt: new Date(workspaceUser.updatedAt).toLocaleString(),
    }))

    return res;
}

export async function getInvetedWorkspace(creatorId: number): Promise<WorkspaceUserDetail[]> {
    const workspaces = await (await new WorkspaceUser().where({ "invite_id": creatorId, accepted: false })).fetchAll({ withRelated: ['creatorInvite', 'workspace'] })

    const res = transform(workspaces.serialize(), (workspace: WorkspaceUserDetail) => ({
        id: workspace.id,
        creatorInvite: workspace.creatorInvite,
        workspace: workspace.workspace,
        accepted: workspace.accepted,
        updatedAt: new Date(workspace.updatedAt).toLocaleString(),
        createdAt: new Date(workspace.updatedAt).toLocaleString(),
    }))

    return res;
}

export async function myInvetedWorkspace(creatorId: number): Promise<WorkspaceUserDetail[]> {
    const workspaces = await (await new WorkspaceUser().where({ "invite_id": creatorId, accepted: true })).fetchAll({ withRelated: ['creatorInvite', 'workspace'] })

    const res = transform(workspaces.serialize(), (workspace: WorkspaceUserDetail) => ({
        workspace: workspace.workspace,
        updatedAt: new Date(workspace.updatedAt).toLocaleString(),
        createdAt: new Date(workspace.updatedAt).toLocaleString(),
    }))

    return res;
}

export async function acceptedInvetedWorkspace(id: number, creatorId: number): Promise<WorkspaceUserDetail[]> {

    const workspaceUser = (
        await new WorkspaceUser().where({ id: id, 'invite_id': creatorId }).save({ accepted : true }, { patch: true })
    ).serialize();

    return object.camelize(workspaceUser);
}

export async function count(): Promise<object> {
    const count = await (await WorkspaceUser.fetchAll()).count();
    return { count }
}


export async function insert(params: WorkspaceUserPayload): Promise<WorkspaceUserDetail> {

    const workspaceUser = (await new WorkspaceUser({ ...params }).save()).serialize();

    return workspaceUser;


}

export async function getById(id: number): Promise<WorkspaceUserDetail> {

    const workspaceUser = (await new WorkspaceUser({ id: id }).fetch({ withRelated: ['creator'] }));

    if (workspaceUser) {
        return workspaceUser.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<WorkspaceUserDetail> {

    const res = (await new WorkspaceUser({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: WorkspaceUserPayload, creatorId: number): Promise<WorkspaceUserDetail> {

    const workspaceUser = (
        await new WorkspaceUser().where({ id: id, 'creator_invite_id': creatorId }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(workspaceUser);
}