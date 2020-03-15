import WorkspaceDetail from '../domain/entities/WorkspaceDetail';
import Workspace from '../models/Workspace';
import transform from '../utils/transform';
import WorkspacePayload from '../domain/requests/WorkspacePayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(creatorId:number): Promise<WorkspaceDetail[]> {
    const workspaces = await (await new Workspace().where({"creator_id":creatorId})).fetchAll({ withRelated: ['creator'] })

    const res = transform(workspaces.serialize(), (workspace: WorkspaceDetail) => ({
        id: workspace.id,
        creatorId : workspace.creatorId,
        creator : workspace.creator,
        updatedAt: new Date(workspace.updatedAt).toLocaleString(),
        createdAt: new Date(workspace.updatedAt).toLocaleString(),
        name : workspace.name
    }))

    return res;
}




export async function count(): Promise<object> {
    const count = await (await Workspace.fetchAll()).count();
    return {count}
}


export async function insert(params: WorkspacePayload): Promise<WorkspaceDetail> {

    const workspace = (await new Workspace({ ...params }).save()).serialize();

    return workspace;


}

export async function getById(id: number): Promise<WorkspaceDetail> {

    const workspace = (await new Workspace({ id: id }).fetch({ withRelated: ['creator',"channels","channels.creator"] }));

    if (workspace) {
        return workspace.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<WorkspaceDetail> {

    const res = (await new Workspace({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: WorkspacePayload): Promise<WorkspaceDetail> {

    const workspace = (
        await new Workspace().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(workspace);
}