/**
 *  UserPayload Interface.
 */
interface UserPayload {
  name: string;
  email: string;
  displayName ? : string;
  password: string;
}

export default UserPayload;
