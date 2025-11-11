import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useOrders } from "../../context/OrderContext";

const { width } = Dimensions.get("window");

export default function ActiveOrdersScreen({ navigation }) {
  const { activeOrders } = useOrders();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Active Orders</Text>
      </View>

      {/* List or Empty */}
      {activeOrders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>No active orders</Text>
        </View>
      ) : (
        <FlatList
          data={activeOrders}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.orderCard}>
              <Image source={item.image} style={styles.orderImage} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.orderStatus}>{item.status}</Text>
                <Text style={styles.orderDelivery}>{item.delivery}</Text>
              <Text style={styles.orderDetails}>
  Size: {item.size} | Qty: {item.qty} | ₹
  {item.price.toString().replace(/[^0-9.]/g, "")}
</Text>

              </View>
              <Ionicons name="chevron-forward" size={20} color="#FF6600" />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    paddingHorizontal: 16,
    paddingTop: 40, // 👈 adds nice top space to move content slightly down
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10, // 👈 extra adjustment for header positioning
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginRight: 24,
  },

  noOrdersContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noOrdersText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  orderImage: { width: 70, height: 70, borderRadius: 8 },
  orderStatus: { color: "green", fontWeight: "bold", fontSize: 14 },
  orderDelivery: { fontSize: 12, color: "#777" },
  orderDetails: { fontSize: 12, color: "#555" },
});

