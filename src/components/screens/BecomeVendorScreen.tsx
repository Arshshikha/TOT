import React, { useState, memo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ORANGE = "#FF6600";

/* =======================
   Input Field Component
   ======================= */
const InputField = memo(
  ({
    icon,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    maxLength,
  }: any) => (
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={18} color={ORANGE} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        returnKeyType="next"
      />
    </View>
  )
);

const BecomeVendorScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    businessName: "",
    businessType: "",
    city: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const { fullName, mobile, email, businessName, city } = form;

    if (!fullName || !mobile || !email || !businessName || !city) {
      Alert.alert("Missing Details", "Please fill all required fields");
      return;
    }

    Alert.alert(
      "Application Submitted",
      "Thank you for applying! Our team will contact you shortly.",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Header (FIXED) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={22}
              color="#000"
              style={{ marginTop: 25 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Become a Vendor</Text>
        </View>

        {/* Intro (FIXED) */}
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Grow your business with us</Text>
          <Text style={styles.introText}>
            Fill in the details below to start selling on our platform.
          </Text>
        </View>

        {/* =======================
            SCROLLABLE FORM ONLY
           ======================= */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
        <View style={styles.formCard}>
  <ScrollView
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ paddingBottom: 40 }}
  >
    <InputField
      icon="person-outline"
      placeholder="Full Name *"
      value={form.fullName}
      onChangeText={(v: string) => handleChange("fullName", v)}
    />

    <InputField
      icon="call-outline"
      placeholder="Mobile Number *"
      value={form.mobile}
      keyboardType="phone-pad"
      maxLength={10}
      onChangeText={(v: string) => handleChange("mobile", v)}
    />

    <InputField
      icon="mail-outline"
      placeholder="Email Address *"
      value={form.email}
      keyboardType="email-address"
      onChangeText={(v: string) => handleChange("email", v)}
    />

    <InputField
      icon="storefront-outline"
      placeholder="Business / Shop Name *"
      value={form.businessName}
      onChangeText={(v: string) => handleChange("businessName", v)}
    />

    <InputField
      icon="briefcase-outline"
      placeholder="Business Type (Individual / Store)"
      value={form.businessType}
      onChangeText={(v: string) =>
        handleChange("businessType", v)
      }
    />

    <InputField
      icon="location-outline"
      placeholder="City / Location *"
      value={form.city}
      onChangeText={(v: string) => handleChange("city", v)}
    />

    <TouchableOpacity
      style={styles.submitButton}
      onPress={handleSubmit}
    >
      <Text style={styles.submitText}>
        Apply to Become a Vendor
      </Text>
      <Ionicons name="arrow-forward" size={18} color="#fff" />
    </TouchableOpacity>
  </ScrollView>
</View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BecomeVendorScreen;

/* =======================
   Styles
   ======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 25,
    color: "#000",
  },

  intro: {
    padding: 16,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },
  introText: {
    fontSize: 14,
    color: "#666",
  },

  formCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },

  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});
