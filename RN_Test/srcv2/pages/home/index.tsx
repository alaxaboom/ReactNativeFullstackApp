import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAppSelector } from '../../shared/lib/react-redux/hooks';
import { useGetMeQuery } from '../../entities/user';
import { useGetMyCreditsQuery } from '../../entities/loan-application';
import { BottomNavigation } from '../../widgets/bottom-navigation';
import { LoadingScreen } from '../../widgets/loading-screen';
import { HomeDashboard } from '../../widgets/home-dashboard';
import { useNavigation } from '../../shared/lib/react-navigation/hooks';
import { LoanCard } from '../../features/loans-list/view-loans';
import { LoanApplication } from '../../shared/types';
import { styles } from './styles';

interface HomePageProps {
  isAuthenticated: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  const { navigateTo } = useNavigation();
  const { isAuthenticated: authState } = useAppSelector((state) => state.auth);
  const { data: user, isLoading: userLoading, error: userError } = useGetMeQuery(undefined, {
    skip: !authState,
  });

  const userId = user?.id?.toString() || '';
  const { data: credits = [], isLoading: creditsLoading } = useGetMyCreditsQuery(undefined, {
    skip: !userId,
  });

  if (userLoading || (userId && creditsLoading === true)) {
    return <LoadingScreen />;
  }

  if (userError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorText}>Error loading profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleApplyForLoan = () => navigateTo('loan');
  const handleCallMeBack = () => navigateTo('callback');
  const handleApplicationsList = () => navigateTo('products', { tab: 'applications' });

  const renderLoanCard = (loan: LoanApplication | null) => {
    if (loan === null) {
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>No credits yet</Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 16, textAlign: 'center' }}>
            You don't have any credits yet. Press the button to choose a loan.
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: '#00C853', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 }}
            onPress={handleApplyForLoan}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Get started</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <LoanCard loan={loan} onGetStarted={handleApplyForLoan} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >
        <HomeDashboard
          user={user ?? null}
          credits={credits}
          isLoading={creditsLoading}
          renderLoanCard={renderLoanCard}
          onApplicationsList={handleApplicationsList}
          onCallMeBack={handleCallMeBack}
          onProductSelect={(key) => navigateTo('loan', { product: key })}
        />
      </ScrollView>
      <BottomNavigation currentScreen="home" />
    </SafeAreaView>
  );
};

