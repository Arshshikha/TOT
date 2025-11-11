import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// ✅ Enable smooth animation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Product {
  id: string;
  title: string;
   image: any; 
  price: string;
  brand?: string;
  name?: string;

}

const topWear: Product[] = [
  { id: "1", title: "T-Shirts",  name: "T-Shirts" ,image: require("../../../assets/images/tshirt1.png"), price: "From ₹999" },
  { id: "2", title: "Shirts",  name: "T-Shirts" ,image: require("../../../assets/images/tshirt2.png"), price: "From ₹999" },
  { id: "3", title: "Sweatshirt", name: "T-Shirts" , image: require("../../../assets/images/tshirt3.png"), price: "From ₹999" },
  { id: "4", title: "Hoodies",  name: "T-Shirts" ,image: require("../../../assets/images/tshirt4.png"), price: "From ₹999" },
];

const bottomWear: Product[] = [
  { id: "1", title: "Jeans", name: "T-Shirts" , image: require("../../../assets/images/bottom1.png"), price: "From ₹999" },
  { id: "2", title: "Track Pants", name: "T-Shirts" , image: require("../../../assets/images/bottom2.png"), price: "From ₹999" },
  { id: "3", title: "Skinny fit Jeans",  name: "T-Shirts" , image: require("../../../assets/images/bottom3.png"), price: "From ₹999" },
];

const ethnicEssentials: Product[] = [
  { id: "1", title: "Innerwear", name: "T-Shirts" , image: require("../../../assets/images/ethnic1.png"), price: "From ₹999" },
  { id: "2", title: "Socks",  name: "T-Shirts" ,image: require("../../../assets/images/ethnic2.png"), price: "From ₹999" },
  { id: "3", title: "Innerwear", name: "T-Shirts" , image: require("../../../assets/images/ethnic3.png"), price: "From ₹999" },
  { id: "4", title: "Socks", name: "Socks" , image: require("../../../assets/images/ethnic4.png"), price: "From ₹999" },
];

const kidsFashion: Product[] = [
  { id: "1", title: "T-Shirts",  name: "T-Shirts" ,image: require("../../../assets/images/kids1.png"), price: "From ₹999" },
  { id: "2", title: "Shirts", name: "Shirts" , image: require("../../../assets/images/kids2.png"), price: "From ₹999" },
  { id: "3", title: "Sweatshirts", name: "Sweatshirts" , image: require("../../../assets/images/kids3.png"), price: "From ₹999" },
  { id: "4", title: "Sleeveless T-Shirts",  name: "Sleeveless T-Shirts" ,image: require("../../../assets/images/kids4.png"), price: "From ₹999" },
];

const maleCategories = {
  topWear,
  bottomWear,
  ethnicEssentials,
  kidsFashion,
};

const femaleCategories = {
  topWear: [
    { id: "1", title: "Kurtas", image: require("../../../assets/images/Topwear1.png"), price: "From ₹899" },
    { id: "2", title: "Tops", image: require("../../../assets/images/Topwear2.png"), price: "From ₹799" },
    { id: "3", title: "Dresses", image: require("../../../assets/images/Topwear1.png"), price: "From ₹1299" },
  ],
  bottomWear: [
    { id: "1", title: "Jeans", image: require("../../../assets/images/Topwear1.png"), price: "From ₹999" },
    { id: "2", title: "Leggings", image: require("../../../assets/images/bottom2.png"), price: "From ₹699" },
  ],
  ethnicEssentials: [
    { id: "1", title: "Sarees", image: require("../../../assets/images/Topwear2.png"), price: "From ₹1499" },
    { id: "2", title: "Dupattas", image: require("../../../assets/images/bottom2.png"), price: "From ₹499" },
  ],
  kidsFashion: [
    { id: "1", title: "Frocks", image: require("../../../assets/images/Topwear1.png"), price: "From ₹799" },
    { id: "2", title: "Skirts", image: require("../../../assets/images/bottom2.png"), price: "From ₹899" },
  ],
};

const CategoryScreen = () => {
  const [selectedGender, setSelectedGender] = useState<"M" | "F">("M");
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { brandName = "AJIO" } = (route.params as { brandName?: string }) || {};

  const categories = selectedGender === "M" ? maleCategories : femaleCategories;

  // ✅ Make product cards clickable
  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.productCard}
      onPress={() =>
        navigation.navigate("ProductListingScreen", {
          category: item.title,
          brandName,
        })
      }
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  const renderSection = (title: string, data: Product[], key: string) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewAllCategoryScreen", {
              categoryKey: key.toLowerCase(),
              brandName,
              gender: selectedGender,
            })
          }
        >
          <Text style={styles.viewAllText}>View All →</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={150}
      />
    </View>
  );

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{brandName} — Select Category</Text>
          <View style={styles.genderToggle}>
            {["M", "F"].map((g) => (
              <TouchableOpacity
                key={g}
                activeOpacity={0.7}
                style={[
                  styles.genderButton,
                  selectedGender === g && styles.genderActive,
                ]}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setSelectedGender(g as "M" | "F");
                }}
              >
                <Text
                  style={[
                    styles.genderText,
                    selectedGender === g && styles.genderTextActive,
                  ]}
                >
                  {g}
                </Text>
                <Ionicons
                  name={g === "M" ? "male" : "female"}
                  size={16}
                  color={selectedGender === g ? "#fff" : "#000"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Scrollable sections */}
        <ScrollView style={styles.scrollContainer}>
          {renderSection("Top Wear", categories.topWear, "Topwear")}
          {renderSection("Bottom Wear", categories.bottomWear, "Bottomwear")}
          {renderSection("Ethnic & Essentials", categories.ethnicEssentials, "Ethnic")}
          {renderSection("Kids Fashion", categories.kidsFashion, "Kidsfashion")}
        </ScrollView>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={16} color="#f67a7aff" />
          <Text style={styles.closeText}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 60,
    maxHeight: "87%",
    width: 350,
    alignSelf: "center",
    marginBottom: 58,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  genderToggle: { flexDirection: "row", alignItems: "center" },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  genderActive: { backgroundColor: "blue", borderColor: "blue" },
  genderText: { marginRight: 4, color: "#000", fontWeight: "bold" },
  genderTextActive: { color: "#fff" },
  divider: { height: 1, backgroundColor: "#E0E0E0", marginHorizontal: 12 },
  scrollContainer: { marginTop: 8, marginBottom: 20 },
  section: { marginVertical: 10 },
  sectionHeader: {
    marginHorizontal: 12,
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#555" },
  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF6600",
  },
  productCard: {
    width: 140,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    paddingBottom: 6,
    overflow: "hidden",
  },
  productImage: {
    width: 80,
    height: 110,
    resizeMode: "cover",
    alignSelf: "center",
  },
  productTitle: { fontSize: 14, textAlign: "center", marginVertical: 4 },
  productPrice: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d06b6bff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  closeText: { color: "#f67a7aff", fontWeight: "bold", marginLeft: 6 },
});

export default CategoryScreen;
