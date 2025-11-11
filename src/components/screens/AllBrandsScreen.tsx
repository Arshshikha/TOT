import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  BrandScreen: undefined;
  AllBrandsScreen: undefined;
  ProductListingScreen: { brandName: string; category?: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "AllBrandsScreen">;

type Brand = {
  id: number;
  name: string;
  logo: any;
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 28;

const brands: Brand[] = [
  { id: 1, name: "AJIO", logo: require("../../../assets/images/AJIOextend.png") },
  { id: 2, name: "Levi's", logo: require("../../../assets/images/LEVISextend.png") },
  { id: 3, name: "H&M", logo: require("../../../assets/images/hmextend.png") },
  { id: 4, name: "ZARA", logo: require("../../../assets/images/zaraextend.png") },
  { id: 5, name: "Pantaloons", logo: require("../../../assets/images/Pantaloonsextend.png") },
  { id: 6, name: "Calvin Klein", logo: require("../../../assets/images/celvinextend.png") },
  { id: 7, name: "Louis Vuitton", logo: require("../../../assets/images/LVextend.png") },
  { id: 8, name: "Allen Solly", logo: require("../../../assets/images/allenextend.png") },
];

const AllBrandsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBrandPress = (brandName: string) => {
    navigation.navigate("ProductListingScreen", { brandName, category: undefined });
  };

  const renderBrandCard = ({ item }: { item: Brand }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleBrandPress(item.name)}
      activeOpacity={0.85}
    >
      <Image source={item.logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.brandName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>All Brands</Text>

      <FlatList
        data={brands}
        renderItem={renderBrandCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AllBrandsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 48, // ⬅️ adds space below the status bar
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 26, // ⬅️ gives breathing room before grid starts
    textAlign: "center",
    color: "#000",
  },
  listContent: {
    paddingBottom: 30,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logo: {
    width: 90,
    height: 55,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
