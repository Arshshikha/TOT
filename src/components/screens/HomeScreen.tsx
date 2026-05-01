import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ===== Interfaces =====
interface Brand {
  id: string;
  name: string;
  logo: any;
  time: string;
}

interface Product {
  id: string;
  image: any;
  brand: string;
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  gender: "M" | "F";
}

interface Offer {
  id: string;
  banner: any;
}

const chunkArray = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export default function HomeScreen() {
  const [selectedGender, setSelectedGender] = useState("M");

  const brands: Brand[] = [
    { id: "1", name: "LEVIS", logo: require("../../../assets/images/Levis.png"), time: "20–30 mins" },
    { id: "2", name: "AJIO", logo: require("../../../assets/images/AJIO.png"), time: "20–30 mins" },
    { id: "3", name: "HM", logo: require("../../../assets/images/hm.png"), time: "20–30 mins" },
    { id: "4", name: "Zara", logo: require("../../../assets/images/zara.png"), time: "20–30 mins" },
    { id: "5", name: "Calvin Klein", logo: require("../../../assets/images/calvin.png"), time: "20–30 mins" },
    { id: "6", name: "Pantaloons", logo: require("../../../assets/images/pantaloons.png"), time: "20–30 mins" },
    { id: "7", name: "Louis Vuitton", logo: require("../../../assets/images/lv.png"), time: "20–30 mins" },
    { id: "8", name: "Allen Solly", logo: require("../../../assets/images/Allen.png"), time: "20–30 mins" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = React.useRef<ScrollView>(null);
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { cartItems, addToCart } = useCart();

  const [location, setLocation] = useState({
    city: "Kolkata",
    address: "52/2 Bidhanpally near Durga Mandir, Kolkata 700122",
  });

  // Responsive constants
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  const isTablet = SCREEN_WIDTH >= 600;

  const BANNER_WIDTH = Math.round(SCREEN_WIDTH * 0.92);
  const BANNER_HEIGHT = Math.round(SCREEN_HEIGHT * (isTablet ? 0.30 : 0.25));
  const PRODUCT_CARD_WIDTH = Math.round(SCREEN_WIDTH * (isTablet ? 0.28 : 0.43)); // two on phone visible horizontally
  const PRODUCT_CARD_HEIGHT = isTablet ? 350 : 290;
  const OFFER_BANNER_WIDTH = Math.round(SCREEN_WIDTH * 0.9);
  const OFFER_BANNER_HEIGHT = Math.round(SCREEN_HEIGHT * (isTablet ? 0.28 : 0.22));

  const scaleFont = (size: number) => {
    // simple scale function (keeps logic unchanged, only sizes)
    return Math.round(isTablet ? size * 1.35 : size);
  };

  // 🔥 FIXED — parse JSON address properly
  useFocusEffect(
    useCallback(() => {
      const fetchAddress = async () => {
        const saved = await AsyncStorage.getItem("selectedAddress");
        if (saved) {
          try {
            const parsed = JSON.parse(saved); // FIX
            setLocation((prev) => ({
              ...prev,
              address: parsed.fullAddress ?? parsed.address ?? prev.address, // safer
            }));
          } catch (e) {
            // if parsing fails, keep previous address (do not change logic)
          }
        }
      };
      fetchAddress();
    }, [])
  );

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setCurrentIndex(slide);
  };

  type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "HomeScreen"
  >;
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const banners = [
    { image: require("../../../assets/images/Imagebanner.png") },
    { image: require("../../../assets/images/Imagebanner.png") },
    { image: require("../../../assets/images/Imagebanner.png") },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        scrollRef.current?.scrollTo({
          x: nextIndex * BANNER_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const products: Product[] = [
    {
      id: "1",
      image: require("../../../assets/images/Topwear1.png"),
      brand: "AJIO",
      name: "Men Relaxed Fit Cargo Joggers",
      price: "₹1,440",
      oldPrice: "₹3,599",
      discount: "(60% OFF)",
      gender: "M",
    },
    {
      id: "2",
      image: require("../../../assets/images/Topwear2.png"),
      brand: "AJIO",
      name: "Men Checked Tailored Fit Shirt",
      price: "₹1,580",
      oldPrice: "₹4,549",
      discount: "(70% OFF)",
      gender: "M",
    },
    {
      id: "3",
      image: require("../../../assets/images/Topwear1.png"),
      brand: "ZARA",
      name: "Women Floral Print Dress",
      price: "₹2,999",
      oldPrice: "₹4,999",
      discount: "(40% OFF)",
      gender: "F",
    },
  ];

  const offers: Offer[] = [
    { id: "1", banner: require("../../../assets/images/ajiosnitch.png") },
    { id: "2", banner: require("../../../assets/images/snitch.png") },
  ];

  // dynamic styles using computed sizes
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: Platform.OS === "android" ? 25 : 0,
    },
    scrollContent: {
      paddingBottom: 18,
    },
    locationIcon: { width: isTablet ? 24 : 20, height: isTablet ? 24 : 20, marginRight: 5 },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Math.round(SCREEN_WIDTH * 0.04),
      paddingTop: 10,
    },
    locationContainer: { flex: 1 },
    locationRow: { flexDirection: "row", alignItems: "center" },
    locationLabel: { color: "#FF6600", fontWeight: "600", fontSize: scaleFont(13) },
    locationText: { color: "#555", fontSize: scaleFont(13), width: Math.round(SCREEN_WIDTH * 0.55) },
    cartIcon: { position: "relative" },
    cartBadge: {
      position: "absolute",
      top: -6,
      right: -8,
      backgroundColor: "#FF6600",
      borderRadius: 8,
      paddingHorizontal: 5,
      paddingVertical: 1,
    },
    cartCount: { color: "#fff", fontSize: scaleFont(10), fontWeight: "bold" },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Math.round(SCREEN_WIDTH * 0.04),
      marginVertical: isTablet ? 14 : 10,
    },
    searchContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F6F6F6",
      borderRadius: 10,
      paddingHorizontal: 12,
      height: isTablet ? 50 : 40,
      marginRight: 10,
    },
    searchInput: { flex: 1, color: "#000", fontSize: scaleFont(14) },
    searchIconWrapper: { justifyContent: "center", alignItems: "center" },
    searchIcon: { width: isTablet ? 22 : 18, height: isTablet ? 22 : 18, tintColor: "#888" },
    genderToggleWrapper: {
      flexDirection: "row",
      backgroundColor: "#F0F0F0",
      borderRadius: 20,
      padding: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    genderButton: {
      width: isTablet ? 40 : 30,
      height: isTablet ? 35 : 28,
      borderRadius: isTablet ? 18 : 14,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 2,
    },
    genderButtonActive: { backgroundColor: "#007bff" },
    genderButtonText: { color: "#666", fontWeight: "600", fontSize: scaleFont(13) },
    genderButtonTextActive: { color: "#fff", fontWeight: "700" },
    bannerWrapper: { position: "relative", marginBottom: 15 },
    bannerImage: {
      width: BANNER_WIDTH,
      height: BANNER_HEIGHT,
      borderRadius: 10,
      marginHorizontal: Math.round(SCREEN_WIDTH * 0.01),
    },
    dotContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#FFD8B0",
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: "#FF6600",
      width: 10,
      height: 10,
    },
    brandContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: 10,
  paddingHorizontal: Math.round(SCREEN_WIDTH * 0.03),
},

brandCard: {
  width: "23.5%",   // 👈 ALWAYS 4 CARDS IN A ROW
  aspectRatio: 1,   // 👈 Makes square cards & responsive
  backgroundColor: "#fff",
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#f6d9c9",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 18,
  overflow: "hidden",
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},

brandLogo: {
  width: "70%",
  height: "125%",
  resizeMode: "contain",
  marginBottom: 10,
},

timeContainer: {
  width: "100%",
  backgroundColor: "#ffe9d9",
  paddingVertical: 6,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: 0,
},


    brandTime: {
      fontSize: scaleFont(12),
      color: "#5a5a5a",
      marginLeft: 4,
    },

    brandtext: { fontSize: scaleFont(18), fontWeight: "600", paddingHorizontal: Math.round(SCREEN_WIDTH * 0.04) },
    sectionHeader: {
      flexDirection: "column",
      alignItems: "flex-start",
      paddingHorizontal: Math.round(SCREEN_WIDTH * 0.04),
      marginTop: 15,
    },
    sectionTitle: {
      fontSize: scaleFont(17),
      fontWeight: "500",
      color: "#6c6c6cff",
      marginTop:20,
    },
    productCard: {
      width: PRODUCT_CARD_WIDTH,
      height: PRODUCT_CARD_HEIGHT,
      backgroundColor: "#fff",
      borderRadius: 10,
      marginRight: Math.round(SCREEN_WIDTH * 0.04),
      marginTop: 15,
      elevation: 3,
      marginBottom: 12,
    },
    productImage: {
      width: "100%",
      height: isTablet ? 240 : 200,
      borderRadius: 8,
      marginBottom: 8,
    },
    productInfo: { padding: 8 },
    productBrand: { color: "#fd6863ff", fontSize: scaleFont(12) },
    productName: { color: "#7d7b7bff", fontSize: scaleFont(13), fontWeight: "500" },
    priceRow: { flexDirection: "row", alignItems: "center" },
    productPrice: { color: "#000", fontWeight: "bold", fontSize: scaleFont(14) },
    oldPrice: {
      color: "#777",
      fontSize: scaleFont(12),
      textDecorationLine: "line-through",
    },
    discount: { color: "#FF6600", fontSize: scaleFont(12), marginLeft: 8 },
    iconColumn: { position: "absolute", top: 10, right: 10, alignItems: "center" },
    wishlistIcon: { marginBottom: 10 },
    cartAddIcon: { borderRadius: 20, padding: 5, elevation: 2 },
    offerScroll: { paddingHorizontal: Math.round(SCREEN_WIDTH * 0.04), paddingBottom: 10 },
    offerColumn: { marginRight: 10 },
    offerBanner: {
      width: OFFER_BANNER_WIDTH,
      height: OFFER_BANNER_HEIGHT,
      borderRadius: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== Top Bar ===== */}
        <View style={styles.topBar}>
          <View style={styles.locationContainer}>
            <TouchableOpacity
              style={styles.locationRow}
              onPress={() => navigation.navigate("LocationScreen")}
            >
              <Image
                source={require("../../../assets/icons/Location-1.png")}
                style={styles.locationIcon}
              />
              <Text style={styles.locationLabel}>My Location</Text>
            </TouchableOpacity>

            <Text style={styles.locationText} numberOfLines={1}>
              {location.address || "Fetching location..."}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cartIcon}
            onPress={() => navigation.navigate("CartScreen")}
          >
            <Ionicons name="cart-outline" size={isTablet ? 28 : 24} color="#000" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartCount}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ===== Search + Gender Selection ===== */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.searchIconWrapper}>
              <Image
                source={require("../../../assets/icons/search.png")}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>

         <View style={styles.genderToggleWrapper}>
  <TouchableOpacity
    style={[
      styles.genderButton,
      selectedGender === "M" && { backgroundColor: "#007bff" },
    ]}
    onPress={() => setSelectedGender("M")}
  >
    <Text
      style={[
        styles.genderButtonText,
        selectedGender === "M" && styles.genderButtonTextActive,
      ]}
    >
      M
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.genderButton,
      selectedGender === "F" && { backgroundColor: "#FF69B4" },
    ]}
    onPress={() => setSelectedGender("F")}
  >
    <Text
      style={[
        styles.genderButtonText,
        selectedGender === "F" && styles.genderButtonTextActive,
      ]}
    >
      F
    </Text>
  </TouchableOpacity>
</View>

        </View>

        {/* ===== Banner ===== */}
        <View style={styles.bannerWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: Math.round((SCREEN_WIDTH - BANNER_WIDTH) / 2) }}
          >
            {banners.map((banner, index) => (
              <Image
                key={index}
                source={banner.image}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <View style={styles.dotContainer}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* ===== Brands ===== */}
        <Text style={styles.brandtext}>Select Your Store</Text>
        <View style={styles.brandContainer}>
          {brands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={styles.brandCard}
              onPress={() =>
                navigation.navigate("ProductListingScreen", {
                  brandName: brand.name,
                })
              }
              activeOpacity={0.8}
            >
              <Image
                source={brand.logo}
                style={styles.brandLogo}
                resizeMode="contain"
              />
              <View style={styles.timeContainer}>
                <Text style={styles.brandTime}>{brand.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== Products ===== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
        </View>

        <FlatList
          data={products.filter((item) => item.gender === selectedGender)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: Math.round(SCREEN_WIDTH * 0.04) }}
          renderItem={({ item }) => {
            const isFavourite = wishlistItems.some((p) => p.id === item.id);
            return (
              <TouchableOpacity
                style={styles.productCard}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("ProductDetailsScreen", {
                    product: item,
                    selectedBrand: item.brand,
                  })
                }
              >
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productBrand}>{item.brand}</Text>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{item.price} </Text>
                    <Text style={styles.oldPrice}>{item.oldPrice} </Text>
                    <Text style={styles.discount}>{item.discount}</Text>
                  </View>
                </View>

                <View style={styles.iconColumn}>
                  <TouchableOpacity
                    style={styles.wishlistIcon}
                    onPress={() => toggleWishlist(item)}
                  >
                    <Ionicons
                      name={isFavourite ? "heart" : "heart-outline"}
                      size={isTablet ? 22 : 20}
                      color={isFavourite ? "red" : "#f9f5f5ff"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cartAddIcon}
                    onPress={() => addToCart(item)}
                  >
                    <Ionicons name="cart-outline" size={isTablet ? 22 : 20} color="#f9f5f2ff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* ===== Offers ===== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Brand’s Offers</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offerScroll}
        >
          {chunkArray([...offers, ...offers], 2).map((pair, colIndex) => (
            <View key={colIndex} style={styles.offerColumn}>
              {pair.map((offer, index) => (
                <Image
                  key={index}
                  source={offer.banner}
                  style={styles.offerBanner}
                  resizeMode="cover"
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
