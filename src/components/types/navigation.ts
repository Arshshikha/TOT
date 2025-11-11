// src/types/navigation.ts

export type RootStackParamList = {
  HomeScreen: undefined;
  ProductListingScreen: { brandName: string };
  ProductDetailsScreen: { product: any; selectedBrand: string };
  FavouriteScreen: undefined;
  CartScreen: undefined;
};

