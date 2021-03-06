import User from '../models/User';
import logger from '../utils/logger';
import * as bcrypt from '../utils/bcrypt';
import * as object from '../utils/object';
import transform from '../utils/transform';
import Role from '../resources/enums/Role';
import UserDetail from '../domain/entities/UserDetail';
import UserPayload from '../domain/requests/UserPayload';

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<UserDetail[]>}
 */
export async function fetchAll(): Promise<UserDetail[]> {
  logger.log('info', 'Fetching users from database');

  const users = await User.fetchAll();
  const res = transform(users.serialize(), (user: UserDetail) => ({
    id : user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    updatedAt: new Date(user.updatedAt).toLocaleString(),
    createdAt: new Date(user.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Fetched all users successfully:', res);

  return res;
}

/**
 * Insert user from given user payload
 *
 * @param {UserPayload} params
 * @returns {Promise<UserDetail>}
 */
export async function insert(params: UserPayload): Promise<UserDetail> {
  logger.log('info', 'Inserting user into database:', params);

  const password = await bcrypt.hash(params.password);
  const user = (await new User({ ...params, password, roleId: Role.NORMAL_USER }).save()).serialize();

  logger.log('debug', 'Inserted user successfully:', user);

  return object.camelize(user);
}


export async function update(id: number, params: UserPayload): Promise<UserDetail> {

  const userByDisplayName = (await new User().where({'display_name':params.displayName}).where('id','<>',id).fetchAll()).count()
  let maxId = (await (await User.fetchAll()).query((qb)=>{
    qb.max('id')
  }).fetch()).serialize()

  maxId = maxId.length ? maxId[0]['max'] ? maxId[0]['max'] : 0 : 0;

  if(userByDisplayName){
    params.displayName = `${params.displayName}${maxId}`;
  }
  const user = (
      await new User().where({ id: id }).save({ ...params }, { patch: true })
  ).serialize();

  return object.camelize(user);
}

export async function setImage(id: number, image: any): Promise<UserDetail> {

  const user = (
      await new User().where({ id: id }).save({ image : image.filename }, { patch: true })
  ).serialize();

  return object.camelize(user);
}

