import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/react-redux/hooks';
import { setUserData } from '../../../../entities/loan-application';
import { useAuth } from '../../../../shared/hooks/useAuth';

export const useRegistrationForm = (email: string, setEmail: (email: string) => void) => {
  const dispatch = useAppDispatch();
  const loanForm = useAppSelector((state) => state.loan);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user?.email && !email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user?.email, email, setEmail]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!loanForm.userData.firstName.trim()) {
        dispatch(setUserData({ firstName: user.firstName }));
      }
      if (!loanForm.userData.lastName.trim()) {
        dispatch(setUserData({ lastName: user.lastName }));
      }
      if (!loanForm.userData.phone.trim()) {
        dispatch(setUserData({ phone: user.phone }));
      }
      if (!loanForm.userData.jmbg.trim()) {
        dispatch(setUserData({ jmbg: user.jmbg }));
      }
    }
  }, [isAuthenticated, user, dispatch]);

  const updateUserData = (data: Partial<typeof loanForm.userData>) => {
    dispatch(setUserData(data));
  };

  return {
    userData: loanForm.userData,
    isAuthenticated,
    updateUserData,
  };
};



