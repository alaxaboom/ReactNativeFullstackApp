import React from 'react';
import { CallMeBackModal } from '../../widgets/call-me-back';

interface CallMeBackPageProps {
  visible: boolean;
  onClose: () => void;
}

export const CallMeBackPage: React.FC<CallMeBackPageProps> = ({ visible, onClose }) => {
  return <CallMeBackModal visible={visible} onClose={onClose} />;
};

