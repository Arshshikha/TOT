import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WishlistProvider } from "./src/context/WishlistContext";
import { CartProvider } from "./src/context/CartContext";
import { OrderProvider } from "./src/context/OrderContext";
import { UserProvider } from "./src/context/UserContext";
import { AddressProvider, useAddress } from "./src/context/AddressContext";

// Screens
import SplashScreen from "./src/components/screens/SplashScreen";
import IntroSlider from "./src/components/screens/IntroSlider";
import LoginScreen from "./src/components/screens/LoginScreen";
import HomeScreen from "./src/components/screens/HomeScreen";
import BrandScreen from "./src/components/screens/BrandScreen";
import AllBrandsScreen from "./src/components/screens/AllBrandsScreen";
import MyAccountScreen from "./src/components/screens/MyAccountScreen";
import FavouritesScreen from "./src/components/screens/FavouritesScreen";
import CategoryScreen from "./src/components/screens/CategoryScreen";
import ViewAllCategoryScreen from "./src/components/screens/ViewAllCategoryScreen";
import ProductListingScreen from "./src/components/screens/ProductListingScreen";
import ProductDetailsScreen from "./src/components/screens/ProductDetailsScreen";
import CartScreen from "./src/components/screens/CartScreen";
import EditProfileScreen from "./src/components/screens/EditProfileScreen";
import ActiveOrdersScreen from "./src/components/screens/ActiveOrdersScreen";
import OrderHistoryScreen from "./src/components/screens/OrderHistoryScreen";
import TermsConditionsScreen from "./src/components/screens/TermsConditionsScreen";
import ReturnPolicyScreen from "./src/components/screens/ReturnPolicyScreen";
import PrivacyPolicyScreen from "./src/components/screens/PrivacyPolicyScreen";
import FAQsScreen from "./src/components/screens/FAQsScreen";
import ContactUsScreen from "./src/components/screens/ContactUsScreen";
import LocationScreen from "./src/components/screens/LocationScreen";
import AddAddressScreen from "./src/components/screens/AddAddressScreen";
import SavedAddressScreen from "./src/components/screens/SavedAddressScreen";
import EditAddressScreen from "./src/components/screens/EditAddressScreen";


// ⭐ NEWLY ADDED SCREEN (IMPORTANT)
import OtpScreen from "./src/components/screens/OtpScreen";
import BecomeVendorScreen from "./src/components/screens/BecomeVendorScreen";
import ReferAndEarnScreen from "./src/components/screens/BecomeVendorScreen";
import MyReviewsScreen from "./src/components/screens/MyReviewsScreen";
import HelpSupportScreen from "./src/components/screens/HelpSupportScreen";
import MyTicketsScreen from "./src/components/screens/MyTicketsScreen";
import RaiseTicketScreen from "./src/components/screens/RaiseTicketScreen";
import { TicketProvider } from "./src/context/TicketContext";
import {ReportProblemScreen}  from "./src/components/screens/ReportProblemScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// ----------------- TypeScript Stack Param List -----------------
export type RootStackParamList = {
  Splash: undefined;
  IntroSlider: undefined;
  Login: undefined;
  OtpScreen: { phone: string; mode: 'login' | 'register' };
  MainTabs: undefined;
  BrandScreen: undefined;
  AllBrandsScreen: undefined;
  CategoryScreen: undefined;
  ViewAllCategoryScreen: undefined;
  EditProfileScreen: undefined;
  ProductListingScreen: { brandName?: string };
  ProductDetailsScreen: { product?: any; selectedBrand?: string };
  CartScreen: undefined;
  ActiveOrdersScreen: undefined;
  OrderHistoryScreen: undefined;
  TermsConditions: undefined;
  ReturnPolicy: undefined;
  PrivacyPolicy: undefined;
  FAQsScreen: undefined;
  ContactUsScreen: undefined;
  HelpSupportScreen: undefined;
  LocationScreen: undefined;
  AddAddressScreen: undefined;
  SavedAddressScreen: undefined;
  EditAddressScreen: { address: any };
 BecomeVendorScreen:undefined;
 ReferAndEarnScreen:undefined;
 MyReviewsScreen:undefined;
 MyAccountScreen: undefined;
 RaiseTicketScreen:undefined;
 MyTicketsScreen:undefined;
 ReportProblemScreen:undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Brands: undefined;
  Favourites: undefined;
  MyAccount: undefined;
};

// ----------------- MainTabs Navigator -----------------
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      id={"MainTabs" as any}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6600",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#ddd",
          height: 70,
          paddingBottom: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: "absolute",
          left: 10,
          right: 10,
          elevation: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Brands"
        component={BrandScreen}
        options={{
          tabBarLabel: "Brands",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shirt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ----------------- RootStack Navigator -----------------
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <AddressProvider>
              <TicketProvider>
              <NavigationContainer>
                <Stack.Navigator
                  id={"RootStack" as any}
                  initialRouteName="Splash"
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen name="Splash" component={SplashScreen} />
                  <Stack.Screen name="IntroSlider" component={IntroSlider} />
                  <Stack.Screen name="Login" component={LoginScreen} />

                  {/* ⭐ ADDED OTP SCREEN */}
                  <Stack.Screen name="OtpScreen" component={OtpScreen} />

                  <Stack.Screen name="MainTabs" component={MainTabs} />
                  <Stack.Screen name="BrandScreen" component={BrandScreen} />
                  <Stack.Screen name="AllBrandsScreen" component={AllBrandsScreen} />
                  <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
                  <Stack.Screen
                    name="ViewAllCategoryScreen"
                    component={ViewAllCategoryScreen}
                  />
                  <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
                  <Stack.Screen name="ActiveOrdersScreen" component={ActiveOrdersScreen} />
                  <Stack.Screen
                    name="ProductListingScreen"
                    component={ProductListingScreen}
                  />
                  <Stack.Screen
                    name="ProductDetailsScreen"
                    component={ProductDetailsScreen}
                    options={{
                      animation: "slide_from_right",
                      presentation: "card",
                    }}
                  />
                  <Stack.Screen name="CartScreen" component={CartScreen} />
                  <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />

                  {/* Policy + Help */}
                  <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
                  <Stack.Screen name="ReturnPolicy" component={ReturnPolicyScreen} />
                  <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                  <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
                  <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
 <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />
                  {/* Addresses */}
                  <Stack.Screen name="LocationScreen" component={LocationScreen} />
                  <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
                  <Stack.Screen name="SavedAddressScreen" component={SavedAddressScreen} />
                  <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} />
                  <Stack.Screen name="BecomeVendorScreen" component={BecomeVendorScreen} />
                   <Stack.Screen name="ReferAndEarnScreen" component={ReferAndEarnScreen} />
                    <Stack.Screen name="MyReviewsScreen" component={MyReviewsScreen} />
                   <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
      
      <Stack.Screen name="RaiseTicketScreen" component={RaiseTicketScreen} />
      <Stack.Screen name="MyTicketsScreen" component={MyTicketsScreen} />
<Stack.Screen name="ReportProblemScreen"component={ReportProblemScreen}
/>

                </Stack.Navigator>
                </NavigationContainer>
                </TicketProvider>
            </AddressProvider>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
    </QueryClientProvider>
  );
}

// ----------------- SavedAddressScreen Component -----------------
export function SavedAddressScreenComponent({ navigation }: any) {
  const { addresses, selectAddress, deleteAddress } = useAddress();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Addresses</Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              selectAddress(item);
              navigation.goBack();
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.addressTitle}>{item.title}</Text>
              <Text style={styles.addressText}>{item.fullAddress}</Text>
              {item.phone && <Text style={styles.phone}>📞 {item.phone}</Text>}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditAddressScreen", { address: item })
                }
                style={{ marginRight: 14 }}
              >
                <Ionicons name="create-outline" size={22} color="#007AFF" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAddress(item.id)}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#F7F7F7",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  phone: {
    fontSize: 12,
    marginTop: 4,
    color: "#777",
  },
});
