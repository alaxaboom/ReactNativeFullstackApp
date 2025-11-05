import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Dimensions,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useAppSelector } from '../../store/store';
import {
  useGetMeQuery,
  useGetMyApplicationsQuery,
  useGetMyCreditsQuery,
} from '../../store/api';
import BottomNavigation from '../../components/BottomNavigation';
import { LoadingScreen } from '../../components/LoadingScreen';
import UserHeader from './components/UserHeader';
import LoanCard from '../ProductsListPage/components/LoanCard';
import QuickActions from './components/QuickActions';
import ProductsSection from './components/ProductsSection';
import { HomeScreenProps } from './types';
import { LoanApplication } from '../../types';
import { homePageStyles } from './styles';
import { useNavigation } from '../../contexts/NavigationContext';

const { width } = Dimensions.get('window');

const HomePage: React.FC<HomeScreenProps> = ({ isAuthenticated }) => {
  const { navigateTo } = useNavigation();
  const { isAuthenticated: authState } = useAppSelector((state) => state.auth);
  const { data: user, isLoading: userLoading, error: userError } = useGetMeQuery(undefined, {
    skip: !authState,
  });

  const userId = user?.id?.toString() || '';
  const { data: applications = [] } = useGetMyApplicationsQuery(undefined, {
    skip: !userId,
  });
  const { data: credits = [], isLoading: creditsLoading } = useGetMyCreditsQuery(undefined, {
    skip: !userId,
  });

  const getLatestCredits = (credits: LoanApplication[]): LoanApplication[] => {
    if (credits.length === 0) return [];
    return [...credits]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      })
      .slice(0, 3);
  };

  const latestCredits = getLatestCredits(credits);

  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (latestCredits.length > 0) {
      Animated.timing(indicatorPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [latestCredits.length, indicatorPosition]);

  if (userLoading || (userId && creditsLoading === true)) {
    return <LoadingScreen />;
  }

  if (userError) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Error loading profile</Text>
      </SafeAreaView>
    );
  }

  const handleApplyForLoan = () => navigateTo('loan');
  const handleCallMeBack = () => navigateTo('callback');
  const handleApplicationsList = () =>
    navigateTo('products', { tab: 'applications' });

  const renderStepIndicator = () => {
    if (latestCredits.length === 0) return null;

    const dotWidth = 4;
    const activeWidth = 20;
    const spacing = 8;
    const totalDots = latestCredits.length;

    const positions = Array.from({ length: totalDots }, (_, i) => {
      return i * (dotWidth + spacing) + (i === 0 ? 0 : (activeWidth - dotWidth) / 2);
    });

    const containerWidth = width - 48;
    const totalIndicatorWidth = (totalDots - 1) * (dotWidth + spacing) + activeWidth;
    const offset = (containerWidth - totalIndicatorWidth) / 2;

    return (
      <View style={[homePageStyles.stepIndicatorContainer, { paddingHorizontal: 24 }]}>
        <Animated.View
          style={[
            homePageStyles.activeStepIndicator,
            {
              position: 'absolute',
              left: indicatorPosition.interpolate({
                inputRange: Array.from({ length: totalDots }, (_, i) => i),
                outputRange: positions.map((pos) => pos + offset),
              }),
              width: activeWidth,
              height: 4,
              borderRadius: 2,
            },
          ]}
        />
        {latestCredits.map((_, index) => (
          <View key={index} style={homePageStyles.stepIndicatorDot} />
        ))}
      </View>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = width - 48;
    const maxIndex = latestCredits.length - 1;
    const currentIndex = Math.round(contentOffsetX / itemWidth);

    Animated.timing(indicatorPosition, {
      toValue: Math.min(currentIndex, maxIndex),
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 80,
        }}
      >
        <UserHeader user={user ?? null} />
        {latestCredits.length > 0 ? (
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 12 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {latestCredits.map((credit) => (
              <View key={credit.id} style={{ width: width - 48, marginRight: 12 }}>
                <LoanCard loan={credit} />
              </View>
            ))}
          </ScrollView>
        ) : (
          <LoanCard loan={null} onGetStarted={handleApplyForLoan} />
        )}
        {renderStepIndicator()}
        <QuickActions
          onApplicationsList={handleApplicationsList}
          onCallMeBack={handleCallMeBack}
        />
        <ProductsSection
          onProductSelect={(key) => navigateTo('loan', { product: key })}
        />
      </ScrollView>
      <BottomNavigation currentScreen="home" />
    </SafeAreaView>
  );
};

export default HomePage;