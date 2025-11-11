import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { CartBadge } from "../../components/CartBadge";

export default function FavouriteScreen() {
  const navigation = useNavigation<any>();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Adjusts status bar color and height properly */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* ✅ Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favourites</Text>
        <CartBadge />
      </View>

      {/* ✅ Wishlist Grid */}
      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items in wishlist</Text>
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("ProductDetailsScreen", {
                  product: item,
                  selectedBrand: item.brandName || item.brand || "Unknown",
                })
              }
            >
              {/* 🖼️ Product Image */}
              <Image
                source={
                  item.image
                    ? typeof item.image === "string"
                      ? { uri: item.image }
                      : item.image
                    : item.images?.[0]
                    ? typeof item.images[0] === "string"
                      ? { uri: item.images[0] }
                      : item.images[0]
                    : null
                }
                style={styles.image}
                resizeMode="cover"
              />

              {/* ❤️ Wishlist Toggle */}
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => toggleWishlist(item)}
              >
                <Ionicons name="heart" size={20} color="red" />
              </TouchableOpacity>

              {/* Product Info */}
              <Text style={styles.brandText}>{item.brandName}</Text>
              <Text style={styles.productName} numberOfLines={1}>
                {item.name}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                {item.originalPrice && (
                  <Text style={styles.oldPrice}>{item.originalPrice}</Text>
                )}
              </View>

              {/* 🛒 Add to Cart Button */}
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() =>
                  addToCart({
                    id: item.id,
                    name: item.name || "",
                    price: item.price || "",
                    originalPrice: item.originalPrice || "",
                    image: item.image,
                    brand: item.brandName,
                  })
                }
              >
                <Ionicons name="cart-outline" size={16} color="#333" />
                <Text style={styles.cartText}>Add to Cart</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 12,
  backgroundColor: "#fff",
  elevation: 3,
  paddingBottom: -14, // same bottom padding
  height: 85, // fixed height for consistent look
  paddingTop: 10, // 👈 this moves the icons/text down slightly
},


  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 10,
    padding: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 6,
    borderRadius: 6,
  },
  brandText: {
    color: "orange",
    fontWeight: "600",
    marginTop: 6,
  },
  productName: {
    fontSize: 13,
    color: "#333",
    marginTop: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },
  oldPrice: {
    marginLeft: 6,
    color: "#999",
    textDecorationLine: "line-through",
    fontSize: 12,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF6F00",
    borderRadius: 6,
    paddingVertical: 6,
    marginTop: 8,
  },
  cartText: {
    color: "#FF6F00",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
  },
});
