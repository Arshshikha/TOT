// ==================================================
// File: OrderHistoryScreen.tsx
// Purpose: Shows order history list with Clear All,
// Long-press delete, menu actions, reorder, rate
// ==================================================

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useOrders, OrderItem, ProductItem } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const ORANGE = "#FF6600";

export default function OrderHistoryScreen() {
  const navigation = useNavigation<any>();
  const { orderHistory, clearOrderHistory, removeOrderById } = useOrders();
  const { addToCart, addMultipleToCart } = useCart() as any;

  const [menuOrderId, setMenuOrderId] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // ------------------------ Clear All Orders
  const handleClearAll = () => {
    Alert.alert(
      "Clear all history",
      "Are you sure you want to delete all order history?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: clearOrderHistory },
      ]
    );
  };

  // ------------------------ Delete From Long Press
  const handleLongPressDelete = (id: string) => {
    Alert.alert("Delete order", "Delete this order from history?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => removeOrderById(id) },
    ]);
  };

  // ------------------------ Reorder Items
  const handleReorder = (products: ProductItem[]) => {
    if (typeof addMultipleToCart === "function") addMultipleToCart(products);
    else if (typeof addToCart === "function") products.forEach((p) => addToCart(p));

    Alert.alert("Added to cart", "All items from this order have been added to your cart");
    navigation.navigate("CartScreen");
  };

  // ------------------------ Menu Open / Close
  const openMenu = (orderId: string) => {
    setMenuOrderId(orderId);
    setMenuVisible(true);
  };
  const closeMenu = () => {
    setMenuOrderId(null);
    setMenuVisible(false);
  };

  // ------------------------ Dummy Data (Demo only)
  const dummyOrders: OrderItem[] = [
    {
      id: "ORD001",
      amount: 5550,
      date: "20 Nov 2025",
      time: "12:45 PM",
      deliveredIn: 35,
      products: [
        {
          id: "P1",
          name: "AJIO",
          price: 1500,
          image: require("../../../assets/images/AJIOextend.png"),
          productImage: require("../../../assets/images/Topwear1.png"),
        },
        {
          id: "P2",
          name: "ZARA",
          price: 1500,
          image: require("../../../assets/images/zaraextend.png"),
          productImage: require("../../../assets/images/bottomwear2.png"),
        },
        {
          id: "P3",
          name: "HM",
          price: 2500,
          image: require("../../../assets/images/hmextend.png"),
          productImage: require("../../../assets/images/Topwear1.png"),
        },
      ],
    },
    {
      id: "ORD002",
      amount: 4500,
      date: "18 Nov 2025",
      time: "8:12 PM",
      deliveredIn: 30,
      products: [
        {
          id: "P4",
          name: "ZARA",
          price: 3500,
          image: require("../../../assets/images/zaraextend.png"),
          productImage: require("../../../assets/images/bottomwear1.png"),
        },
        {
          id: "P5",
          name: "AJIO",
          price: 1000,
          image: require("../../../assets/images/AJIOextend.png"),
          productImage: require("../../../assets/images/Topwear1.png"),
        },
      ],
    },
  ];

  const listData = orderHistory.length === 0 ? dummyOrders : orderHistory;
  const isEmpty = listData.length === 0;

  // ------------------------ UI Components
  const renderProductThumbnails = (products: ProductItem[]) => (
    <View style={styles.thumbnailsRow}>
      {products.map((p) => (
        <View key={p.id} style={styles.doubleThumbBox}>
          <Image source={p.productImage} style={styles.productPhoto} resizeMode="cover" />
          <Image source={p.image} style={styles.overlayBrandLogo} resizeMode="contain" />
        </View>
      ))}
    </View>
  );

  const renderOrder = ({ item }: { item: OrderItem }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={() => handleLongPressDelete(item.id)}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.statusRow}>
          <Ionicons name="checkmark-circle" size={18} color={ORANGE} />
          <Text style={styles.arrivalText}>Arrived in {item.deliveredIn} minutes</Text>
        </View>
        <TouchableOpacity onPress={() => openMenu(item.id)}>
          <Ionicons name="ellipsis-vertical" size={20} color={ORANGE} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.amountText}>₹{item.amount}</Text>
        <Text style={styles.datetimeText}>
          {item.date}, {item.time}
        </Text>
        {renderProductThumbnails(item.products)}
      </View>
    </TouchableOpacity>
  );

  // ==================================================
  // Screen Layout
  // ==================================================
  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000ff"  marginTop="29"/>
        </TouchableOpacity>
        <Text style={styles.title}>Order History</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* 🧾 Order List */}
      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="time-outline" size={52} color={ORANGE} />
          <Text style={styles.emptyText}>No previous orders found</Text>
        </View>
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(o) => o.id}
          contentContainerStyle={{ padding: 14 }}
          renderItem={renderOrder}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      )}

      {/* ⛔ Bottom Menu (delete confirmation) */}
      <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={closeMenu}>
        <Pressable style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => {
                closeMenu();
                Alert.alert(
                  "Delete Order?",
                  "Are you sure you want to delete this order?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => removeOrderById(menuOrderId!),
                    },
                  ]
                );
              }}
            >
              <Ionicons name="trash-outline" size={20} color={ORANGE} style={{ marginRight: 8 }} />
              <Text style={styles.menuText}>Delete Order</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

// ==================================================
// Styles — Orange + White premium theme
// ==================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#FFE0CC",
    shadowColor: "#FF6600",
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginTop:28,
  },

  clearAll: {
    fontSize: 14,
    fontWeight: "700",
    color: ORANGE,
     marginTop:28,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFD9C2",
    shadowColor: ORANGE,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusRow: { flexDirection: "row", alignItems: "center" },

  arrivalText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: ORANGE,
  },

  cardBody: { marginTop: 10 },

  amountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  datetimeText: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },

  thumbnailsRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
    flexWrap: "wrap",
  },

  doubleThumbBox: {
    width: 72,
    height: 72,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFD5B8",
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 3,
  },

  productPhoto: { width: "100%", height: "100%" },

  overlayBrandLogo: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ORANGE,
    padding: 2,
  },

  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  emptyText: { marginTop: 8, fontSize: 16, color: "#777" },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  menuBox: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "#ffa023ff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 12,
  },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  menuText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
});
