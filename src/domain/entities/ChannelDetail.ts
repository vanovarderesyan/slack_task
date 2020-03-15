/**
 * ChannelDetail interface.
 */

import UserDetail from './UserDetail';
import WorkspaceDetail from './WorkspaceDetail';

interface ChannelDetail {
    id: number;
    name: string;
    creatorId: number;
    workspaceId:number,
    workspace : WorkspaceDetail,
    creator : UserDetail;
    createdAt: string;
    updatedAt: string;
  }
  
  export default ChannelDetail;
  