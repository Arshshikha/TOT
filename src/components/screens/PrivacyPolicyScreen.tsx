import React from "react"; 
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function PrivacyPolicyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000ff" marginTop= "30" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.heading}>Your Privacy Matters</Text>

        <Text style={styles.text}>
          We are committed to protecting your personal information while ensuring a safe
          shopping experience. This Privacy Policy describes how we collect, use, store,
          and protect your data when you browse and shop products on our app.
        </Text>

        <Text style={styles.subHeading}>What Information We Collect</Text>
        <Text style={styles.text}>
          • Name, mobile number, email address{"\n"}
          • Delivery address and payment details{"\n"}
          • Product browsing history and order activity{"\n"}
          • Reviews, ratings and app usage patterns
        </Text>

        <Text style={styles.subHeading}>How We Use Your Information</Text>
        <Text style={styles.text}>
          • To deliver ordered products safely{"\n"}
          • To show personalized product recommendations{"\n"}
          • To improve user experience and app performance{"\n"}
          • To communicate offers, delivery updates and support
        </Text>

        <Text style={styles.subHeading}>Data Protection</Text>
        <Text style={styles.text}>
          Your details are encrypted and never shared with third parties except for secure
          payment gateways and delivery partners involved in delivering your order.
        </Text>
        
        <Text style={styles.update}>Last Updated: Feb 2025</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFF",
    elevation: 3,
    borderBottomColor: "#FF6600",
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#040404ff", marginTop: 30 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#f4753aff" },
  subHeading: { fontSize: 16, fontWeight: "bold", marginTop: 18, marginBottom: 6, color: "#f06e1dff" },
  text: { fontSize: 14, color: "#333", lineHeight: 20 },
  update: { fontSize: 12, marginTop: 20, color: "#070707ff", fontWeight: "600" },
});
