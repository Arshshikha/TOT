import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAddress } from "../../context/AddressContext";

export default function SavedAddressScreen({ navigation }) {
  const { addresses, selectAddress, deleteAddress } = useAddress();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Saved Addresses</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              selectAddress(item);
              navigation.goBack();
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.addressTitle}>{item.title}</Text>
              <Text style={styles.addressText}>{item.fullAddress}</Text>
              {item.phone && <Text style={styles.phone}>📞 {item.phone}</Text>}
            </View>

            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditAddressScreen", { address: item })}
                style={{ marginRight: 18 }}
              >
                <Ionicons name="create-outline" size={22} color="#FF6600" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAddress(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#E40000" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 10,
    color: "#FF6600",
  },
  card: {
    backgroundColor: "#FFF6EE",
    borderLeftWidth: 5,
    borderLeftColor: "#FF6600",
    padding: 16,
    borderRadius: 14,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  addressTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
  },
  addressText: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
  phone: {
    fontSize: 13,
    marginTop: 6,
    color: "#777",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
  },
});
