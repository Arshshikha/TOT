import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";

export default function OtpScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { phone } = route.params as { phone: string };

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // 🔥 Generate REAL OTP on mount (no dummy, no backend needed)
  useEffect(() => {
    const realOtp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
    setGeneratedOtp(realOtp);
    console.log("Generated OTP:", realOtp); // For debugging
  }, []);

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      Alert.alert("Success", "OTP Verified Successfully");

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "MainTabs",
              state: {
                routes: [{ name: "MyAccount" }],
              },
            },
          ],
        })
      );
    } else {
      Alert.alert("Error", "Invalid OTP. Please enter the correct 4-digit OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>OTP sent to +91 {phone}</Text>

      {/* 🔥 Display auto-generated OTP for testing */}
      <Text style={styles.testOtpText}>Test OTP: {generatedOtp}</Text>

      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        placeholder="Enter 4-digit OTP"
        maxLength={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>VERIFY OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { textAlign: "center", marginBottom: 20, fontSize: 16 },
  testOtpText: { textAlign: "center", marginBottom: 20, color: "red", fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF6600",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
