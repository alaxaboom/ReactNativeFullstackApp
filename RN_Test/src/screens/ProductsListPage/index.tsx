import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView as RNSafeAreaView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../store/store';
import {
  useGetMyApplicationsQuery,
  useGetMyCreditsQuery,
} from '../../store/api';
import BottomNavigation from '../../components/BottomNavigation';
import LoanCard from './components/LoanCard';
import ApplicationCard from './components/ApplicationCard';
import { productsListPageStyles as styles } from './styles';
import { useNavigation } from '../../contexts/NavigationContext';
import { ProductsListPageProps } from './types';

const ProductsListPage: React.FC<ProductsListPageProps> = ({ initialTab = 'loans' }) => {
  const { navigateTo } = useNavigation();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id || '';

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

  const [activeTab, setActiveTab] = useState<'loans' | 'applications'>(initialTab);

  const renderContent = () => {
    if (applicationsLoading || loansLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (activeTab === 'loans') {
      if (userLoans.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No credits yet</Text>
            <Text style={styles.emptySubtitle}>
              You don't have any credits yet. Press the button to choose a loan.
            </Text>
          </View>
        );
      }
      return (
        <ScrollView style={styles.listContainer}>
          {userLoans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </ScrollView>
      );
    }

    if (activeTab === 'applications') {
      if (userApplications.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No applications yet</Text>
            <Text style={styles.emptySubtitle}>
              You don't have any applications yet. Press the button to start.
            </Text>
          </View>
        );
      }
      return (
        <ScrollView style={styles.listContainer}>
          {userApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </ScrollView>
      );
    }
  };

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
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'loans' && styles.activeTabText,
                ]}
              >
                My credits
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'applications' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('applications')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'applications' && styles.activeTabText,
                ]}
              >
                My applications
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderContent()}
      </RNSafeAreaView>

      <BottomNavigation currentScreen="products" />

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

export default ProductsListPage;