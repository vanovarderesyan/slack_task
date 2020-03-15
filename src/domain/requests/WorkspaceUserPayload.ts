/**
 * WorkspaceUserPayload interface.
 */
interface WorkspaceUserPayload {
    id: number;
    accepted: boolean;
    creatorInviteId: number;
    inviteid: number;
    workspaceId: number,
}

export default WorkspaceUserPayload;