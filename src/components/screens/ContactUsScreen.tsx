import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ContactUsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !phone || !message) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    Alert.alert(
      "Thank you!",
      "Your issue has been submitted. Our team will contact you shortly."
    );

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" marginTop="28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Support Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Need Help?</Text>
          <Text style={styles.infoText}>We’re here to assist you 7 days a week.</Text>

          <TouchableOpacity onPress={() => Linking.openURL("tel:+918888888888")}>
            <Text style={styles.infoLabel}>
              📞 Customer Care: <Text style={styles.highlight}>+91 888 888 8888</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("mailto:support@yourapp.com")}>
            <Text style={styles.infoLabel}>
              ✉ Email: <Text style={styles.highlight}>support@yourapp.com</Text>
            </Text>
          </TouchableOpacity>

          <Text style={styles.infoLabel}>🕒 Working Hours: 9:00 AM – 10:00 PM</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="example@gmail.com" keyboardType="email-address" />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Enter phone number" keyboardType="phone-pad" />

          <Text style={styles.label}>Message / Issue</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            placeholder="Tell us your issue..."
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 3,
    
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginRight: 24,
    marginTop: 28,
  },
  infoBox: {
    backgroundColor: "#FFF4E8",
    padding: 15,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#FF6600",
    marginTop: 35,
  },
  infoTitle: { fontSize: 18, fontWeight: "bold", color: "#FF6600", marginBottom: 8 },
  infoText: { fontSize: 14, color: "#333", marginBottom: 8 },
  infoLabel: { fontSize: 14, marginBottom: 5 },
  highlight: { color: "#FF6600", fontWeight: "bold" },
  formContainer: { paddingHorizontal: 16 },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  textArea: { height: 110, textAlignVertical: "top" },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#FF6600",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
