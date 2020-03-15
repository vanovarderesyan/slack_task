import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';
import User from './User'
import Workspace from './Workspace'


class WorkspaceUser extends bookshelf.Model<WorkspaceUser> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.WORKSPACE_USERS;
  }

  get hasTimestamps(): boolean {
    return true;
  }

  creatorInvite():User{
    return this.belongsTo(User,'creator_invite_id').query((qb)=>{
        qb.select('id','name','image','display_name')
    })
  }

  invite():User{
    return this.belongsTo(User,'invite_id_id').query((qb)=>{
        qb.select('id','name','image','display_name')
    })
  }

  workspace():Workspace{
    return this.belongsTo(Workspace,'workspace_id').query((qb)=>{
        qb.select('id','name')
    })
  }
}

export default WorkspaceUser;
