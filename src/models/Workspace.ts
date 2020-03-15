import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';
import User from './User'
import Channel from './Channel'
import { Collection } from 'bookshelf';


class Workspace extends bookshelf.Model<Workspace> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.WORKSPACE;
  }

  get hasTimestamps(): boolean {
    return true;
  }

  creator():User{
    return this.belongsTo(User,'creator_id').query((qb)=>{
        qb.select('id','name','image','display_name')
    })
  }

  channels():Collection<Channel>{
      return this.hasMany(Channel)
  }
}

export default Workspace;
