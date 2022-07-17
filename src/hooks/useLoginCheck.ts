import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, selectUser } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useRTK';
import { auth } from '../plugins/firebase';
import { UserType } from '../types/UserType';

export const useLoginCheck = (): boolean => {
  const user: UserType = useAppSelector(selectUser);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch, navigate]);
  return user.uid !== "" ? true : false
};