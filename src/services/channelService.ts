import ChannelDetail from '../domain/entities/ChannelDetail';
import Channel from '../models/Channel';
import transform from '../utils/transform';
import ChannelPayload from '../domain/requests/ChannelPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(creatorId:number,workspaceId : number): Promise<ChannelDetail[]> {
    const channels = await (await new Channel().where({"creator_id":creatorId,'workspace_id' : workspaceId})).fetchAll({ withRelated: ['creator','workspace'] })
    const res = transform(channels.serialize(), (channel: ChannelDetail) => ({
        id: channel.id,
        creatorId : channel.creatorId,
        workspace : channel.workspace,
        workspaceId : channel.workspaceId,
        creator : channel.creator,
        updatedAt: new Date(channel.updatedAt).toLocaleString(),
        createdAt: new Date(channel.updatedAt).toLocaleString(),
        name : channel.name
    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await Channel.fetchAll()).count();
    return {count}
}


export async function insert(params: ChannelPayload): Promise<ChannelDetail> {

    const channel = (await new Channel({ ...params }).save()).serialize();

    return channel;


}

export async function getById(id: number): Promise<ChannelDetail> {

    const channel = (await new Channel({ id: id }).fetch({ withRelated: ['creator'] }));

    if (channel) {
        return channel.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<ChannelDetail> {

    const res = (await new Channel({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: ChannelPayload,creatorId:number): Promise<ChannelDetail> {

    const channel = (
        await new Channel().where({ id: id ,'creator_id' :creatorId}).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(channel);
}