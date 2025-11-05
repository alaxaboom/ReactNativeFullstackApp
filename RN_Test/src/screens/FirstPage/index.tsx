import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavigation from '../../components/BottomNavigation';
import BenefitCard from './components/BenefitCard';
import ActionButton from './components/ActionButton';
import { FirstPageProps } from './types';
import { PageStyles, BenefitCardStyles, ActionButtonStyles } from './styles';
import { useNavigation } from '../../contexts/NavigationContext';

const FirstPage: React.FC<FirstPageProps> = () => {
  const { navigateTo } = useNavigation();

  const handleApplyForLoan = () => navigateTo('loan');
  const handleCallMeBack = () => navigateTo('callback');
  const handleLogin = () => navigateTo('login');

  return (
    <LinearGradient
      colors={['#00C853', '#00B047', '#009624']}
      style={PageStyles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView edges={['top', 'left', 'right']} style={PageStyles.headerSafeArea}>
        <ScrollView contentContainerStyle={PageStyles.scrollViewContent}>
          <View style={PageStyles.headerSection}>
            <View style={PageStyles.headerTop}>
              <Text style={PageStyles.welcomeTitle}>Welcome to{"\n"}Forza App</Text>
              <Text style={PageStyles.subtitle}>Quick loans in 15 minutes</Text>
            </View>

            <View style={PageStyles.benefitsContainer}>
              <View style={PageStyles.benefitsRow}>
                <BenefitCard
                  text="30 days without\ninterest or costs"
                  style={[
                    BenefitCardStyles.benefitCard,
                    BenefitCardStyles.topLeft,
                  ]}
                />
                <BenefitCard
                  text="Up to 36 months of\nrepayment"
                  style={[
                    BenefitCardStyles.benefitCard,
                    BenefitCardStyles.topRight,
                  ]}
                />
              </View>
              <View style={PageStyles.benefitsRow}>
                <BenefitCard
                  text="Approval on the spot"
                  style={[
                    BenefitCardStyles.benefitCard,
                    BenefitCardStyles.bottomLeft,
                  ]}
                />
                <BenefitCard
                  text="No hidden costs"
                  style={[
                    BenefitCardStyles.benefitCard,
                    BenefitCardStyles.bottomRight,
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={PageStyles.contentSection}>
            <View style={PageStyles.actionButtonsContainer}>
              <ActionButton
                iconName="folder-sharp"
                title="Apply for a loan"
                subtitle="1 day approve"
                onPress={handleApplyForLoan}
                style={ActionButtonStyles.actionButton}
              />
              <ActionButton
                iconName="call-sharp"
                title="Call me back"
                subtitle="Loan by phone"
                onPress={handleCallMeBack}
                style={ActionButtonStyles.actionButton}
              />
            </View>

            <View style={PageStyles.loginSection}>
              <Text style={PageStyles.loginPrompt}>or login here</Text>
              <TouchableOpacity
                style={PageStyles.loginButton}
                onPress={handleLogin}
              >
                <Text style={PageStyles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <SafeAreaView edges={['bottom']} style={PageStyles.bottomNavContainer}>
        <BottomNavigation currentScreen="firstpage" />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FirstPage;