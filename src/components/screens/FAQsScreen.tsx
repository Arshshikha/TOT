import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FAQsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" marginTop="20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Queries */}
        <Text style={styles.pageTitle}>Top Queries</Text>
        

       

        <View style={styles.divider} />

        {/* FAQ questions */}
        {[
          "Why are there different prices for the same product? Is it legal?",
          "How can I contact a seller?",
          "Why are prices changing after selecting the size/variant of the product?",
          "How do I detect fraudulent calls/emails asking for personal information?",
          "Why is my cashback not added to my wallet?",
          "How do I cancel an order?",
          "How do I create a return request?",
          "When will my product be picked up after requesting a return?",
          "When will I receive my refund?",
          "Where do I self-ship the return items?",
        ].map((q, index) => (
          <Text key={index} style={styles.question}>
            {q}
          </Text>
        ))}

        {/* Category Sections */}
        <Text style={styles.sectionTitle}>Cancellations & Modifications</Text>
        <Text style={styles.answer}>
          • Orders can be cancelled before dispatch.{"\n"}
          • Modification of address/phone is possible before shipment.{"\n"}
          • Custom made / hygiene-based products cannot be cancelled after confirmation.
        </Text>

        <Text style={styles.sectionTitle}>Returns & Exchange</Text>
        <Text style={styles.answer}>
          • 7-day return window for most categories.{"\n"}
          • Replacement applicable for damaged/defective items.{"\n"}
          • Refund will be processed within 5–7 working days after quality check.{"\n"}
          • Items must be unused with tags and original packaging.
        </Text>

        <Text style={styles.sectionTitle}>Delivery & Shipping</Text>
        <Text style={styles.answer}>
          • Standard delivery takes 2–7 business days.{"\n"}
          • Delivery charges may vary based on seller/pin-code.{"\n"}
          • You will receive live tracking updates via notifications & SMS.
        </Text>

        <Text style={styles.sectionTitle}>Payments</Text>
        <Text style={styles.answer}>
          • We support UPI, Cards, Wallets and Cash-on-Delivery.{"\n"}
          • COD may not be available for high-value products.{"\n"}
          • Failed payments are automatically refunded within 3–5 business days.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 15,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" ,marginTop: 20,},
  pageTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#f17d35ff" },
  subText: { fontSize: 14, color: "#555" },
  bold: { fontWeight: "bold" },
  trackBtn: {
    borderWidth: 1,
    borderColor: "#FF6600",
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  trackBtnText: { color: "#FF6600", fontSize: 14, fontWeight: "bold" },
  divider: { height: 1, backgroundColor: "#DDD", marginVertical: 16 },
  question: {
    fontSize: 15,
    color: "#000",
    marginBottom: 18,
    fontWeight: "600",
    lineHeight: 20,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6600",
  },
  answer: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginTop: 6,
  },
});
