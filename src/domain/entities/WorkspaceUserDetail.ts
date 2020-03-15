/**
 * ChannelDetail interface.
 */

import UserDetail from './UserDetail';
import WorkspaceDetail from './WorkspaceDetail';

interface ChannelDetail {
    id?: number;
    creatorInviteId?: number;
    inviteId?: number;
    workspaceId?:number,
    workspace? : WorkspaceDetail,
    invite? : UserDetail;
    creatorInvite ?: UserDetail;
    accepted?: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export default ChannelDetail;
  