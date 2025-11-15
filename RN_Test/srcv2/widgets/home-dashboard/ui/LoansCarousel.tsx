import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { LoanApplication } from '../../../shared/types';
import { homePageStyles } from '../styles';

interface LoansCarouselProps {
  loans: LoanApplication[];
  renderLoanCard: (loan: LoanApplication | null, index?: number) => React.ReactNode;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const { width } = Dimensions.get('window');

export const LoansCarousel: React.FC<LoansCarouselProps> = ({ loans, renderLoanCard, onScroll }) => {
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (loans.length > 0) {
      Animated.timing(indicatorPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [loans.length, indicatorPosition]);

  if (loans.length === 0) {
    return <View>{renderLoanCard(null)}</View>;
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = width - 48;
    const maxIndex = loans.length - 1;
    const currentIndex = Math.round(contentOffsetX / itemWidth);

    Animated.timing(indicatorPosition, {
      toValue: Math.min(currentIndex, maxIndex),
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (onScroll) {
      onScroll(event);
    }
  };

  const renderStepIndicator = () => {
    if (loans.length === 0) return null;

    const dotWidth = 4;
    const activeWidth = 20;
    const spacing = 8;
    const totalDots = loans.length;

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
        {loans.map((_, index) => (
          <View key={index} style={homePageStyles.stepIndicatorDot} />
        ))}
      </View>
    );
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 12 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {loans.map((loan, index) => (
          <View key={loan.id} style={{ width: width - 48, marginRight: 12 }}>
            {renderLoanCard(loan, index)}
          </View>
        ))}
      </ScrollView>
      {renderStepIndicator()}
    </View>
  );
};


