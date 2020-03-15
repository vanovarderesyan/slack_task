/**
 * WorkspaceDetail interface.
 */

import UserDetail from './UserDetail';
interface WorkspaceDetail {
    id: number;
    name: string;
    creatorId: number;
    creator : UserDetail;
    createdAt: string;
    updatedAt: string;
  }
  
  export default WorkspaceDetail;
  