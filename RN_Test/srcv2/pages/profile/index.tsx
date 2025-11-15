import React from 'react';
import { BottomNavigation } from '../../widgets/bottom-navigation';
import { ProfileView } from '../../features/profile/view-profile';

export const ProfilePage: React.FC = () => {
  return (
    <>
      <ProfileView />
      <BottomNavigation currentScreen="profile" />
    </>
  );
};


