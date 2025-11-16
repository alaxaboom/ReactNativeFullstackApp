import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LoanApplication } from '../../../../shared/types';
import { LoansTab } from '../../view-loans';
import { ApplicationsTab } from '../../view-applications';

interface LoansTabsProps {
  loans: LoanApplication[];
  applications: LoanApplication[];
  onGetStarted?: () => void;
  initialTab?: 'applications' | 'loans';
  onTabChange?: (tab: 'loans' | 'applications') => void;
}

export const LoansTabs: React.FC<LoansTabsProps> = ({ loans, applications, onGetStarted, initialTab = 'loans', onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'loans' | 'applications'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: 'loans' | 'applications') => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'loans' && styles.activeTab]}
          onPress={() => handleTabChange('loans')}
        >
          <Text style={[styles.tabText, activeTab === 'loans' && styles.activeTabText]}>
            My credits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'applications' && styles.activeTab]}
          onPress={() => handleTabChange('applications')}
        >
          <Text style={[styles.tabText, activeTab === 'applications' && styles.activeTabText]}>
            My applications
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'loans' ? (
        <LoansTab loans={loans} onGetStarted={onGetStarted} />
      ) : (
        <ApplicationsTab applications={applications} onGetStarted={onGetStarted} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    padding: 4,
    flex: 1,
    marginLeft: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#00C853',
    fontWeight: '600',
  },
});


