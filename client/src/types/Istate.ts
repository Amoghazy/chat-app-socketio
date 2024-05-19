/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserInfoState } from "./../RTK/slices/userInfo";

interface Istate {
  userInfo: UserInfoState;
  socket: any;
}
export default Istate;
