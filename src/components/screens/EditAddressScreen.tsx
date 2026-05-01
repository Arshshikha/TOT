import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAddress } from "../../context/AddressContext";

export default function EditAddressScreen({ route, navigation }) {
  const { address } = route.params; // incoming address
  const { updateAddress } = useAddress();

  const [title, setTitle] = useState(address.title);
  const [fullAddress, setFullAddress] = useState(address.fullAddress);
  const [phone, setPhone] = useState(address.phone || "");

  const handleSave = () => {
    const updated = {
      ...address,
      title,
      fullAddress,
      phone,
    };

    updateAddress(updated);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Address Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Full Address</Text>
      <TextInput style={styles.input} value={fullAddress} onChangeText={setFullAddress} />

      <Text style={styles.label}>Phone (optional)</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: "#fc850ee1",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});