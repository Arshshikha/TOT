import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../context/CartContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App"; // ✅ Import your stack type

export const CartBadge = () => {
  const { cartItems } = useCart();

  // ✅ Give navigation proper type
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
      <View>
        <Ionicons name="cart-outline" size={24} color="#333" />
        {cartItems.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.badgeText}>{cartItems.length}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartBadge: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: "#FF6F00",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
