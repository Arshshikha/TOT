// src/types/navigation.ts

export type RootStackParamList = {
  Splash: undefined;
  IntroSlider: undefined;
  Login: undefined;
  OtpScreen: { phone: string; mode: 'login' | 'register' };
  MainTabs: undefined;
  HomeScreen: undefined;
  BrandScreen: undefined;
  AllBrandsScreen: undefined;
  CategoryScreen: undefined;
  ViewAllCategoryScreen: undefined;
  EditProfileScreen: undefined;
  ProductListingScreen: { brandName?: string };
  ProductDetailsScreen: { product?: any; selectedBrand?: string };
  FavouriteScreen: undefined;
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
  BecomeVendorScreen: undefined;
  ReferAndEarnScreen: undefined;
  MyReviewsScreen: undefined;
  MyAccountScreen: undefined;
  RaiseTicketScreen: undefined;
  MyTicketsScreen: undefined;
  ReportProblemScreen: undefined;
};

