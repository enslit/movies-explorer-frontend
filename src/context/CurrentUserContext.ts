import { createContext, Dispatch, SetStateAction } from 'react';
import { UserInfo } from '../types/responses/UserApiResponses';

interface ICurrentUserContext {
  currentUser: UserInfo;
  setCurrentUser: Dispatch<SetStateAction<UserInfo>> | null;
}

export const initialCurrentUserValue: UserInfo = {
  _id: null,
  name: null,
  email: null,
};

const CurrentUserContext = createContext<ICurrentUserContext>({
  currentUser: initialCurrentUserValue,
  setCurrentUser: null,
});

export default CurrentUserContext;
