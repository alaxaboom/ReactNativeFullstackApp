import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView as RNSafeAreaView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../../shared/lib/react-redux/hooks';
import { useGetMyApplicationsQuery, useGetMyCreditsQuery } from '../../../entities/loan-application';
import { LoansTab } from '../../../features/loans-list/view-loans';
import { ApplicationsTab } from '../../../features/loans-list/view-applications';
import { useNavigation } from '../../../shared/lib/react-navigation/hooks';
import { LoadingScreen } from '../../loading-screen';
import { styles } from './styles';

interface LoansListPageContentProps {
  initialTab?: 'applications' | 'loans';
}

export const LoansListPageContent: React.FC<LoansListPageContentProps> = ({ initialTab = 'loans' }) => {
  const { navigateTo } = useNavigation();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id || '';

  const [activeTab, setActiveTab] = useState<'loans' | 'applications'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const {
    data: userApplications = [],
    isLoading: applicationsLoading,
  } = useGetMyApplicationsQuery(undefined, {
    skip: !userId,
  });

  const {
    data: userLoans = [],
    isLoading: loansLoading,
  } = useGetMyCreditsQuery(undefined, {
    skip: !userId,
  });

  if (applicationsLoading || loansLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <RNSafeAreaView style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo('home')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'loans' && styles.activeTab]}
              onPress={() => setActiveTab('loans')}
            >
              <Text style={[styles.tabText, activeTab === 'loans' && styles.activeTabText]}>
                My credits
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'applications' && styles.activeTab]}
              onPress={() => setActiveTab('applications')}
            >
              <Text style={[styles.tabText, activeTab === 'applications' && styles.activeTabText]}>
                My applications
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'loans' ? (
          <LoansTab loans={userLoans} onGetStarted={() => navigateTo('loan')} />
        ) : (
          <ApplicationsTab applications={userApplications} onGetStarted={() => navigateTo('loan')} />
        )}
      </RNSafeAreaView>

      {((activeTab === 'loans' && userLoans.length === 0) ||
        (activeTab === 'applications' && userApplications.length === 0)) && (
        <View style={styles.getStartedContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigateTo('loan')}
          >
            <Text style={styles.getStartedButtonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

