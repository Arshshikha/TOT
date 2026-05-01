import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useAddress } from "../../context/AddressContext";
import { Ionicons } from "@expo/vector-icons";

export default function LocationScreen() {
  const navigation = useNavigation();
  const { addresses, selectAddress, deleteAddress } = useAddress();
  const [currentAddress, setCurrentAddress] = useState("");

  const detectCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return alert("Permission denied");

    let pos = await Location.getCurrentPositionAsync({});
    const detected = `Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`;

    setCurrentAddress(detected);
    selectAddress({
      id: Date.now().toString(),
      title: "Current Location",
      fullAddress: detected,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a location</Text>

      <TouchableOpacity style={styles.currentLocationBox} onPress={detectCurrentLocation}>
        <Image source={require("../../../assets/icons/Location-1.png")} style={styles.icon} />
        <View>
          <Text style={styles.currentLocationTitle}>Use current location</Text>
          <Text style={styles.currentLocationText}>{currentAddress || "Tap to detect"}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addAddress}
        onPress={() => navigation.navigate("AddAddressScreen")}
      >
        <Text style={styles.addPlus}>＋</Text>
        <Text style={styles.addText}>Add Address</Text>
      </TouchableOpacity>

      <Text style={styles.savedTitle}>SAVED ADDRESSES</Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.addressCard}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                selectAddress(item);
                navigation.goBack();
              }}
            >
              <Text style={styles.addressName}>{item.title}</Text>
              <Text style={styles.addressDetails}>{item.fullAddress}</Text>

           {item.phone && <Text style={styles.phone}>Phone: {item.phone}</Text>}

<View style={[styles.phoneRow, { justifyContent: "flex-end", marginTop: 10 }]}>
  <TouchableOpacity
    onPress={() => navigation.navigate("EditAddressScreen", { address: item })}
    style={{ marginRight: 14 }}
  >
    <Ionicons name="create-outline" size={20} color="#007AFF" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => deleteAddress(item.id)}>
    <Ionicons name="trash-outline" size={20} color="red" />
  </TouchableOpacity>
</View>

            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginTop: 40 },
  currentLocationBox: {
    flexDirection: "row",
    marginTop: 30,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  icon: { width: 22, height: 22, marginRight: 10 },
  currentLocationTitle: { color: "#FF6600", fontWeight: "600", fontSize: 16 },
  currentLocationText: { color: "#555", fontSize: 14 },
  addAddress: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  addPlus: { fontSize: 24, color: "#FF6600", marginRight: 10 },
  addText: { fontSize: 16, color: "#333" },
  savedTitle: { marginTop: 20, fontSize: 14, fontWeight: "600", color: "#444" },

  addressCard: {
    backgroundColor: "#fff",
    elevation: 2,
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },

  addressName: { fontSize: 16, fontWeight: "600" },
  addressDetails: { color: "#555", marginVertical: 4 },
  phone: { color: "#777" },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    justifyContent: "space-between",
  },
});
