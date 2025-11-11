import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const progress = useRef(new Animated.Value(0)).current;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Animate from 0 to 100 in 3 seconds
    Animated.timing(progress, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Increment percentage for display
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100; // ✅ navigation removed from here
        }
        return prev + 1;
      });
    }, 30); // ~3 seconds total

    return () => clearInterval(interval);
  }, []);

  // ✅ separate effect only for navigation (fixes the error)
  useEffect(() => {
    if (percentage === 100) {
      const timeout = setTimeout(() => {
        navigation.replace('IntroSlider');
      }, 100); // small delay ensures safe navigation
      return () => clearTimeout(timeout);
    }
  }, [percentage, navigation]);

  return (
    <ImageBackground
      source={require('../../../assets/images/SplashScreen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Circular progress display */}
      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>{percentage}%</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#FF6B00', // Orange ring
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Slight dim background for contrast
  },
  progressText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
