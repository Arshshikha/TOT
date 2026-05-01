// ===============================================================
// File: ReturnPolicyScreen.tsx
// Purpose: Shows full Return & Refund Policy with Back Button & Center Heading
// ===============================================================

import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ReturnPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* ===== Header ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#222120ff"  marginTop="28"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Return & Refund Policy</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          We want you to be fully satisfied with your purchase. If you're not
          happy with your order, please review our return and refund guidelines
          below.
        </Text>

        <Text style={styles.subHeading}>1. Eligibility for Return</Text>
        <Text style={styles.text}>
          - Product must be unused and in original condition{"\n"}
          - All tags, labels and packaging must be intact{"\n"}
          - Return request must be raised within allowed period
        </Text>

        <Text style={styles.subHeading}>2. Non-Returnable Items</Text>
        <Text style={styles.text}>
          - Used or damaged products{"\n"}
          - Customized items{"\n"}
          - Items marked as Final Sale or Non-returnable
        </Text>

        <Text style={styles.subHeading}>3. Return Process</Text>
        <Text style={styles.text}>
          1. Submit a return request through our app/website{"\n"}
          2. Provide reason and images (if required){"\n"}
          3. Pickup will be arranged (if applicable){"\n"}
          4. Refund is initiated after quality inspection
        </Text>

        <Text style={styles.subHeading}>4. Refund Timeline</Text>
        <Text style={styles.text}>
          UPI / Wallet: 1–3 business days{"\n"}
          Net Banking / Cards: 5–7 business days{"\n"}
          Store credit: Instant (if chosen by customer)
        </Text>

        <Text style={styles.subHeading}>5. Replacement & Exchange</Text>
        <Text style={styles.text}>
          If you received a defective, damaged or wrong item, you can request a
          replacement, size/color exchange, or refund after verification.
        </Text>

        <Text style={styles.subHeading}>6. Order Cancellation</Text>
        <Text style={styles.text}>
          Orders can be cancelled before dispatch for full refund. Once shipped,
          cancellation will follow the return process.
        </Text>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default ReturnPolicyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    justifyContent: "center",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#060606ff",
    textAlign: "center",
    marginTop:28,
  },

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
    color: "#3d3d3d",
  },
});
