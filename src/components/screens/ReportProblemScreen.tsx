import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const REPORT_TYPES = [
  { label: "App not working properly", value: "APP_ISSUE" },
  { label: "Incorrect information shown", value: "DATA_ISSUE" },
  { label: "Payment discrepancy", value: "PAYMENT_ISSUE" },
  { label: "Fraud / suspicious activity", value: "FRAUD" },
  { label: "Privacy or data concern", value: "PRIVACY" },
  { label: "Other", value: "OTHER" },
];

export function ReportProblemScreen({ navigation }) {
  const [reportType, setReportType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submitReport = () => {
    if (!reportType) {
      Alert.alert("Missing info", "Please select a report type.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Missing info", "Please describe the issue.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Report Submitted ✅",
        "Thanks for reporting. Our team will review this carefully.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" marginTop={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a Problem</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ✅ KEYBOARD HANDLING FIX */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={22} color="#FF7A00" />
            <Text style={styles.infoText}>
              Report serious issues or concerns. Our team will review this
              carefully.
            </Text>
          </View>

          {/* Report Type */}
          <Text style={styles.label}>Report Type</Text>
          {REPORT_TYPES.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.optionCard,
                reportType === item.value && styles.optionSelected,
              ]}
              onPress={() => setReportType(item.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  reportType === item.value && { color: "#FF7A00" },
                ]}
              >
                {item.label}
              </Text>
              {reportType === item.value && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#FF7A00"
                />
              )}
            </TouchableOpacity>
          ))}

          {/* Description */}
          <Text style={styles.label}>Describe the issue</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Please explain the issue in detail..."
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.9}
            onPress={submitReport}
            disabled={loading}
          >
            <Text style={styles.submitText}>
              {loading ? "Submitting..." : "Submit Report"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
     marginTop:26,
  },
  body: {
    padding: 16,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#FFF3E8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#444",
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 3,
    marginBottom: 6,
  },
  optionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: "#FF7A00",
    backgroundColor: "#FFF6EE",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 14,
  },
  uploadBox: {
    height: 120,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  uploadText: {
    marginTop: 6,
    color: "#777",
    fontSize: 13,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  submitBtn: {
    marginTop: 30,
    backgroundColor: "#FF7A00",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    marginBottom: 35,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    
  },
});
