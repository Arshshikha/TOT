import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";


import { WishlistProvider } from "./src/context/WishlistContext";
import { CartProvider } from "./src/context/CartContext";
import { OrderProvider } from "./src/context/OrderContext";
import { UserProvider } from "./src/context/UserContext";


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



export type RootStackParamList = {
  Splash: undefined;
  IntroSlider: undefined;
  Login: undefined;
  MainTabs: undefined;
  BrandScreen: undefined;
  AllBrandsScreen: undefined;
  CategoryScreen: undefined;
  ViewAllCategoryScreen: undefined;
  EditProfileScreen: undefined; // ✅ Added missing type
  ProductListingScreen: { brandName?: string };
  ProductDetailsScreen: { product?: any; selectedBrand?: string };
  CartScreen: undefined;
  ActiveOrdersScreen: undefined; // ✅ Added this too
};

export type MainTabParamList = {
  Home: undefined;
  Brands: undefined;
  Favourites: undefined;
  MyAccount: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();


function MainTabs() {
  return (
      <Tab.Navigator
     id={"MainTabs" as any} // ✅ Add this line
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


export default function App() {
  return (
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <NavigationContainer>
             <Stack.Navigator
  id={"RootStack" as any}
  initialRouteName="Splash"
  screenOptions={{ headerShown: false }}
>

  <Stack.Screen name="Splash" component={SplashScreen} />
  <Stack.Screen name="IntroSlider" component={IntroSlider} />
  <Stack.Screen name="Login" component={LoginScreen} />

  <Stack.Screen name="MainTabs" component={MainTabs} />

 
  <Stack.Screen name="BrandScreen" component={BrandScreen} />
  <Stack.Screen name="AllBrandsScreen" component={AllBrandsScreen} />
  <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
  <Stack.Screen name="ViewAllCategoryScreen" component={ViewAllCategoryScreen} />

  
  <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
  <Stack.Screen name="ActiveOrdersScreen" component={ActiveOrdersScreen} />


  <Stack.Screen name="ProductListingScreen" component={ProductListingScreen} />
  <Stack.Screen
    name="ProductDetailsScreen"
    component={ProductDetailsScreen}
    options={{
      animation: "slide_from_right",
      presentation: "card",
    }}
  />
  <Stack.Screen name="CartScreen" component={CartScreen} />
</Stack.Navigator>

            </NavigationContainer>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
  );
}
