import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavigation from '../../components/BottomNavigation';
import BenefitCard from './components/BenefitCard';
import ActionButton from './components/ActionButton';
import { FirstPageProps } from './types';
import styles from './styles';
import { useNavigation } from '../../contexts/NavigationContext';

const FirstPage: React.FC<FirstPageProps> = () => {
  const { navigateTo } = useNavigation();
  const handleApplyForLoan = () => {
    navigateTo('loan');
  };

  const handleCallMeBack = () => {
    navigateTo('callback');
  };

  const handleLogin = () => {
    navigateTo('login');
  };

  return (
    <LinearGradient
      colors={['#00C853', '#00B047', '#009624']}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <Text style={styles.welcomeTitle}>Welcome to{"\n"}Forza App</Text>
            <Text style={styles.subtitle}>Quick loans in 15 minutes</Text>
          </View>

          <View style={styles.benefitsContainer}>
            <View style={styles.benefitsRow}>
              <BenefitCard
                text="30 days without\ninterest or costs"
                style={[styles.benefitCard, styles.topLeft]}
              />
              <BenefitCard
                text="Up to 36 months of\nrepayment"
                style={[styles.benefitCard, styles.topRight]}
              />
            </View>
            <View style={styles.benefitsRow}>
              <BenefitCard
                text="Approval on the spot"
                style={[styles.benefitCard, styles.bottomLeft]}
              />
              <BenefitCard
                text="No hidden costs"
                style={[styles.benefitCard, styles.bottomRight]}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.contentSection}>
        <View style={styles.actionButtonsContainer}>
          <ActionButton
            iconName="folder-sharp"
            title="Apply for a loan"
            subtitle="1 day approve"
            onPress={handleApplyForLoan}
            style={styles.actionButton}
          />
          <ActionButton
            iconName="call-sharp"
            title="Call me back"
            subtitle="Loan by phone"
            onPress={handleCallMeBack}
            style={styles.actionButton}
          />
        </View>

        <View style={styles.loginSection}>
          <Text style={styles.loginPrompt}>or login here</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.bottomNavContainer}>
        <BottomNavigation
          currentScreen="firstpage"
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FirstPage;