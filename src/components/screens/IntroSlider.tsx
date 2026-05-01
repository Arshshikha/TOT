import React, { useRef, useState, useEffect } from 'react'; 
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { slides, Slide } from '../../slides';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const AUTO_SLIDE_INTERVAL = 2000; // ⏱ Auto slide time (3 seconds)

const IntroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation<any>();
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  const slide = slides[currentIndex];

  // 🔄 Fade animation whenever the slide changes
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex]);

  // ▶ Auto slide logic
  useEffect(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }

    autoSlideTimer.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
      navigation.replace('Login'); // Go to login screen
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Animated.Image
        source={slide.image}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
      />

      {/* Headline (background text) */}
      <Text style={styles.headline}>HASSLE-FREE TRY AT HOME</Text>

      {/* Title and Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      {/* Navigation Controls */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={prevSlide} disabled={currentIndex === 0}>
          <Text
            style={[
              styles.navButton,
              currentIndex === 0 && styles.disabledButton,
            ]}
          >
            ← PREV
          </Text>
        </TouchableOpacity>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={nextSlide}>
          <Text style={styles.navButton}>
            {currentIndex === slides.length - 1 ? 'START →' : 'NEXT →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width,
    height,
    position: 'absolute',
  },
  headline: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'rgba(177, 177, 177, 0.1)',
    position: 'absolute',
    top: 490,
    textAlign: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: 180,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  navigation: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  navButton: {
    color: '#FF6B00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    color: '#444',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#555',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF6B00',
    width: 12,
    height: 12,
  },
});
