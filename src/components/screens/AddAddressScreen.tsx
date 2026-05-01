import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAddress } from "../../context/AddressContext";

export default function AddAddressScreen() {
  const navigation = useNavigation();
  const { addAddress } = useAddress();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const saveAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      title: "Home",
      fullAddress: address,
      phone,
    };

    addAddress(newAddress);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Address</Text>

      <TextInput
        placeholder="Full Address"
        style={styles.input}
        onChangeText={setAddress}
        value={address}
      />

      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={setPhone}
        value={phone}
      />

      <TouchableOpacity style={styles.btn} onPress={saveAddress}>
        <Text style={styles.btnText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "600", marginTop: 40 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginTop: 24,
  },
  btn: {
    backgroundColor: "#FF6600",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
