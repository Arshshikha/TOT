import React from "react"; 
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// ✅ Define navigation types
type RootStackParamList = {
  ViewAllCategoryScreen: {
    categoryKey: string;
    brandName: string;
    gender: "M" | "F";
  };
  ProductListingScreen: {
    category: string;
    brandName: string;
    gender: "M" | "F";
  };
};

type ViewAllCategoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ViewAllCategoryScreen"
>;

type ViewAllCategoryScreenRouteProp = RouteProp<
  RootStackParamList,
  "ViewAllCategoryScreen"
>;

// ✅ Define category data
const maleCategories = {
  topwear: [
    { id: "1", title: "T-Shirts", image: require("../../../assets/images/tshirt1.png") },
    { id: "2", title: "Shirts", image: require("../../../assets/images/tshirt2.png") },
    { id: "3", title: "Sweatshirt", image: require("../../../assets/images/tshirt3.png") },
    { id: "4", title: "Hoodies", image: require("../../../assets/images/tshirt4.png") },
  ],
  bottomwear: [
    { id: "1", title: "Jeans", image: require("../../../assets/images/bottom1.png") },
    { id: "2", title: "Track Pants", image: require("../../../assets/images/bottom2.png") },
    { id: "3", title: "Skinny Fit Jeans", image: require("../../../assets/images/bottom3.png") },
  ],
  ethnic: [
    { id: "1", title: "Innerwear", image: require("../../../assets/images/ethnic1.png") },
    { id: "2", title: "Socks", image: require("../../../assets/images/ethnic2.png") },
  ],
  kidsfashion: [
    { id: "1", title: "T-Shirts", image: require("../../../assets/images/kids1.png") },
    { id: "2", title: "Shirts", image: require("../../../assets/images/kids2.png") },
    { id: "3", title: "Sweatshirts", image: require("../../../assets/images/kids3.png") },
  ],
};

const femaleCategories = {
  topwear: [
    { id: "1", title: "Kurtas", image: require("../../../assets/images/Topwear1.png") },
    { id: "2", title: "Tops", image: require("../../../assets/images/Topwear2.png") },
    { id: "3", title: "Dresses", image: require("../../../assets/images/Topwear1.png") },
  ],
  bottomwear: [
    { id: "1", title: "Jeans", image: require("../../../assets/images/Topwear1.png") },
    { id: "2", title: "Leggings", image: require("../../../assets/images/bottom2.png") },
  ],
  ethnic: [
    { id: "1", title: "Sarees", image: require("../../../assets/images/Topwear2.png") },
    { id: "2", title: "Dupattas", image: require("../../../assets/images/bottom2.png") },
  ],
  kidsfashion: [
    { id: "1", title: "Frocks", image: require("../../../assets/images/Topwear1.png") },
    { id: "2", title: "Skirts", image: require("../../../assets/images/bottom2.png") },
  ],
};

const ViewAllCategoryScreen = () => {
  // ✅ Declare navigation and route FIRST
  const navigation = useNavigation<ViewAllCategoryScreenNavigationProp>();
  const route = useRoute<ViewAllCategoryScreenRouteProp>();

  // ✅ Extract route params AFTER declaration
  const { categoryKey, brandName, gender } = route.params;

  // ✅ Choose category data
  const categories =
    gender === "M" ? maleCategories[categoryKey] : femaleCategories[categoryKey];

  // ✅ Category title mapping
  const titleMap: Record<string, string> = {
    topwear: "Top Wear",
    bottomwear: "Bottom Wear",
    ethnic: "Ethnic & Essentials",
    kidsfashion: "Kids Fashion",
  };

  const renderCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
     onPress={() =>
  navigation.navigate("ProductListingScreen", {
    category: categoryKey, // ✅ "topwear", "bottomwear"
    subCategory: item.title, // ✅ "T-Shirts"
    brandName,
    gender,
  })
}

    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {brandName} — {titleMap[categoryKey]}
        </Text>
      </View>

      {/* Category Grid */}
      <ScrollView>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderCard}
          contentContainerStyle={styles.grid}
        />
      </ScrollView>
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  backButton: {
    paddingTop: 26,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
    marginTop: 26,
  },
  grid: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 140,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardTitle: {
    marginTop: 8,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});

export default ViewAllCategoryScreen;
