import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';
import User from './User'
import Workspace from './Workspace'


class Channel extends bookshelf.Model<Channel> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.CHANNELS;
  }

  get hasTimestamps(): boolean {
    return true;
  }

  creator():User{
    return this.belongsTo(User,'creator_id').query((qb)=>{
        qb.select('id','name','image','display_name')
    })
  }


  workspace():Workspace{
    return this.belongsTo(Workspace,'workspace_id').query((qb)=>{
        qb.select('id','name')
    })
  }
}

export default Channel;
