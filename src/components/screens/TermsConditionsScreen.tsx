// ===============================================================
// File: TermsConditionsScreen.tsx
// Purpose: Shows full Terms & Conditions with Back Button + Center Title
// ===============================================================

import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const TermsConditionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* ===== Header Section ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000000ff" marginTop="28"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          Welcome to our application. By accessing or using our platform, you
          agree to the following Terms & Conditions. Please read this document
          carefully.
        </Text>

        <Text style={styles.subHeading}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By registering, accessing, or using our services, you agree to be
          bound by these Terms & Conditions and our Privacy Policy.
        </Text>

        <Text style={styles.subHeading}>2. Eligibility</Text>
        <Text style={styles.text}>
          You must be 18 years or older to create an account or place orders. If
          you are below 18, you may use our services under the supervision of a
          parent or guardian.
        </Text>

        <Text style={styles.subHeading}>3. User Account</Text>
        <Text style={styles.text}>
          You must provide accurate personal information during registration.
          You are responsible for maintaining confidentiality of your login
          credentials. Any misuse or unauthorized use must be reported
          immediately.
        </Text>

        <Text style={styles.subHeading}>4. Orders & Payments</Text>
        <Text style={styles.text}>
          All orders placed are subject to availability and acceptance. Prices
          shown include applicable taxes unless mentioned otherwise.
        </Text>

        <Text style={styles.subHeading}>5. Shipping & Delivery</Text>
        <Text style={styles.text}>
          Delivery timelines are estimates and may vary due to external
          conditions. Ownership of the product transfers to you after delivery.
        </Text>

        <Text style={styles.subHeading}>6. Prohibited Activities</Text>
        <Text style={styles.text}>
          You agree not to misuse the platform, upload harmful content, violate
          copyrights, attempt hacking or reverse engineering.
        </Text>

        <Text style={styles.subHeading}>7. Limitation of Liability</Text>
        <Text style={styles.text}>
          We are not responsible for service interruptions, incorrect usage of
          credentials, delay in deliveries or third-party technical failures.
        </Text>

        <Text style={styles.subHeading}>8. Changes to Terms</Text>
        <Text style={styles.text}>
          We reserve the right to update these Terms at any time. Continued use
          of our services indicates your acceptance of the updated Terms.
        </Text>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default TermsConditionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18, backgroundColor: "#fff" },

  /* ===== Header Styling ===== */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    justifyContent: "center",
    position: "relative",
    marginTop: 5,
  },
  backBtn: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000ff",
    textAlign: "center",
    marginTop:28,
  },

  /* ===== Content Styling ===== */
  subHeading: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    color: "#FF6600",
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 5,
    color: "#333",
  },
});
