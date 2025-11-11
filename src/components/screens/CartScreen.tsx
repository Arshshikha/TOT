import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";


import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Product {
  id: string | number;
  name?: string;
  price?: string | number;
  originalPrice?: string;
  discount?: string;
  images?: any[];
  sizes?: string[];
  brandName?: string;
  brand?: string;
  quantity?: number;
  image?: any;
}

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart() as {
    cartItems: Product[];
    removeFromCart: (id: string | number) => void;
    clearCart: () => void;
    addToCart: (item: Product) => void;
  };

  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [expandedBrands, setExpandedBrands] = useState<Record<string, boolean>>({});
  const navigation = useNavigation<any>();

  // ✅ Brand Logo Picker
  const getBrandLogo = (brand: string) => {
    if (!brand) return require("../../../assets/images/AJIOextend.png");
    switch (brand.toLowerCase()) {
      case "levis":
        return require("../../../assets/images/LEVISextend.png");
      case "hm":
      case "h&m":
        return require("../../../assets/images/hmextend.png");
      case "ajio":
        return require("../../../assets/images/AJIOextend.png");
      case "louis vuitton":
        return require("../../../assets/images/LVextend.png");
      case "pantaloons":
        return require("../../../assets/images/Pantaloonsextend.png");
      case "calvin klein":
        return require("../../../assets/images/celvinextend.png");
      case "zara":
        return require("../../../assets/images/zaraextend.png");
      case "allen solly":
        return require("../../../assets/images/allenextend.png");
      default:
        return require("../../../assets/images/AJIOextend.png");
    }
  };

  // ✅ Group items by brand safely
  const groupedByBrand = cartItems.reduce<Record<string, Product[]>>((acc, item) => {
    const brand = item.brand || item.brandName || "Unknown Brand";
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(item);
    return acc;
  }, {});

  const toggleExpand = (brand: string) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedBrands((prev) => ({ ...prev, [brand]: !prev[brand] }));
  };

  // ✅ Merge duplicates by ID and count
  const getUniqueProductsWithCount = (items: Product[]) => {
    const map: Record<string, Product> = {};
    items.forEach((item) => {
      const id = item.id?.toString();
      if (!id) return;
      if (map[id]) {
        map[id].quantity = (map[id].quantity || 1) + (item.quantity || 1);
      } else {
        map[id] = { ...item, quantity: item.quantity || 1 };
      }
    });
    return Object.values(map);
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Cart</Text>
        {cartItems.length > 0 && (
          <View style={styles.iconWrapper}>
            <Ionicons name="cart" size={28} color="#333" />
            <View style={styles.badgeCircle}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          </View>
        )}
      </View>

      {/* ✅ Empty Cart */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={60} color="#999" />
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.entries(groupedByBrand).map(([brand, items]) => {
            const uniqueItems = getUniqueProductsWithCount(items);
            return (
              <View key={brand} style={styles.brandCard}>
                {/* ✅ Brand Header */}
                <TouchableOpacity
                  style={styles.brandHeader}
                  onPress={() => toggleExpand(brand)}
                  activeOpacity={0.7}
                >
                  <View style={styles.brandInfo}>
                    <Image source={getBrandLogo(brand)} style={styles.brandLogo} />
                    <Text style={styles.brandName}>Shop Name {brand}</Text>
                  </View>

                  <View style={styles.headerRight}>
                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>{items.length}</Text>
                    </View>
                    <Ionicons
                      name={expandedBrands[brand] ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#333"
                    />
                  </View>
                </TouchableOpacity>

                {/* ✅ Product List */}
                {expandedBrands[brand] && (
                  <View style={styles.productList}>
                    {uniqueItems.map((item) => (
                      <TouchableOpacity
                        key={item.id.toString()}
                        style={styles.productCard}
                        activeOpacity={0.8}
                        onPress={() =>
                          navigation.navigate("ProductDetailsScreen", {
                            product: item,
                            selectedBrand: item.brand,
                          })
                        }
                      >
                        <View>
                          {item.image ? (
                            <Image source={item.image} style={styles.productImage} />
                          ) : (
                            <View style={[styles.productImage, { backgroundColor: "#eee" }]} />
                          )}
                          {item.quantity && item.quantity > 1 && (
                            <View style={styles.itemBadge}>
                              <Text style={styles.itemBadgeText}>{item.quantity}</Text>
                            </View>
                          )}
                        </View>

                        <View style={styles.productInfo}>
                          <Text style={styles.productTitle} numberOfLines={2}>
                            {item.name}
                          </Text>
                          <Text style={styles.productPrice}>
                            ₹{item.price?.toString().replace(/₹/g, "").trim()}
                          </Text>
                        </View>

                        <View style={styles.quantityContainer}>
                          <TouchableOpacity
                            onPress={() => removeFromCart(item.id)}
                            style={styles.qtyButton}
                          >
                            <Text style={styles.qtyText}>−</Text>
                          </TouchableOpacity>
                          <Text style={styles.qtyCount}>{item.quantity}</Text>
                          <TouchableOpacity
                            onPress={() => addToCart({ ...item, brand })}
                            style={styles.qtyButton}
                          >
                            <Text style={styles.qtyText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    ))}

                    {/* ✅ Action Buttons */}
                  <View style={styles.actionRow}>
  {/* BUY NOW button */}
  <TouchableOpacity
    style={[
      styles.commonBtn,
      selectedButton === "buy" && styles.activeBtn,
    ]}
    onPress={() => setSelectedButton("buy")}
  >
    <Text
      style={[
        styles.commonText,
        selectedButton === "buy" && styles.activeText,
      ]}
    >
      BUY NOW
    </Text>
  </TouchableOpacity>

  {/* TRY NOW button */}
  <TouchableOpacity
    style={[
      styles.commonBtn,
      selectedButton === "try" && styles.activeBtn,
    ]}
    onPress={() => setSelectedButton("try")}
  >
    <Text
      style={[
        styles.commonText,
        selectedButton === "try" && styles.activeText,
      ]}
    >
      TRY NOW
    </Text>
  </TouchableOpacity>
</View>

                  </View>
                )}
              </View>
            );
          })}

          {/* ✅ Clear Cart */}
          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default CartScreen;

/* ---------------------------------------------------- */
/* ✅ Styles */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F3", padding: 16 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#333", marginTop: 26 },
  iconWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: 4,
  },
  badgeCircle: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#FF4D8D",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  brandCard: {
    backgroundColor: "#FFEDE3",
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  commonBtn: {
  flex: 1,
  borderWidth: 1.5,
  borderColor: "#FF6600",
  borderRadius: 10,
  paddingVertical: 10,
  alignItems: "center",
  backgroundColor: "#fff", // default white background
  marginHorizontal: 4,
},
activeBtn: {
  backgroundColor: "#FF6600", // orange when clicked
},
commonText: {
  color: "#FF6600", // default orange text
  fontWeight: "bold",
},
activeText: {
  color: "#fff", // white text when active
},

  brandHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandInfo: { flexDirection: "row", alignItems: "center" },
  brandLogo: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  brandName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  countBadge: {
    backgroundColor: "#FF4D8D",
    borderRadius: 10,
    paddingHorizontal: 8,
    marginRight: 6,
  },
  countText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  productList: { marginTop: 8 },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  productInfo: { flex: 1 },
  productTitle: { fontSize: 14, fontWeight: "600", color: "#333" },
  productPrice: { fontSize: 13, color: "#888", marginTop: 4 },
  itemBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  itemBadgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FF6600",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: { fontSize: 18, color: "#FF6600", fontWeight: "bold" },
  qtyCount: { marginHorizontal: 8, fontSize: 15, fontWeight: "600", color: "#333" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  buyNowBtn: {
    flex: 1,
    marginRight: 6,
    borderWidth: 1.5,
    borderColor: "#FF6600",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  buyNowText: { color: "#FF6600", fontWeight: "bold" },
  tryNowBtn: {
    flex: 1,
    backgroundColor: "#FF6600",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  tryNowText: { color: "#fff", fontWeight: "bold" },
  clearButton: {
    backgroundColor: "#FF6600",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  clearButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: "#999", fontSize: 16, marginTop: 10 },
});
