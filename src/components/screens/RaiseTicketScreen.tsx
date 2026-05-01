import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTickets } from "../../context/TicketContext";

const ISSUE_LABELS = {
  ORDER: "Order related issue",
  PAYMENT: "Payment issue",
  ACCOUNT: "Account issue",
  OTHER: "Other issue",
};

export default function RaiseTicketScreen({ navigation, route }) {
  const { issueType } = route.params || {};
  const { addTicket } = useTickets();

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert("Error", "Please describe your issue.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const ticket = {
        id: `TOT-${Math.floor(1000 + Math.random() * 9000)}`,
        issueType,
        description,
        status: "OPEN",
        createdAt: new Date().toISOString(),
      };

      addTicket(ticket);
      setLoading(false);

      Alert.alert("Ticket Raised ", `Ticket ID: ${ticket.id}`, [
        {
          text: "OK",
          onPress: () => navigation.navigate("MyTicketsScreen"),
        },
      ]);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#333" marginTop={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raise Ticket</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Issue Type */}
        <Text style={styles.label}>Issue Type</Text>
        <View style={styles.issuePill}>
          <Ionicons name="information-circle-outline" size={16} color="#FF7A00" />
          <Text style={styles.issueText}>
            {ISSUE_LABELS[issueType]}
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.label}>Describe your issue</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Tell us what went wrong…"
          placeholderTextColor="#999"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            loading && { opacity: 0.7 },
          ]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitText}>
            {loading ? "Submitting..." : "Submit Ticket"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginTop:26,
  },
  body: {
    padding: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 18,
    color: "#444",
  },

  /* Issue pill */
  issuePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFF1E6",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 30,
    alignSelf: "flex-start",
  },
  issueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  /* Text area */
  textArea: {
    height: 130,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#333",
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  /* Submit button */
  submitBtn: {
    marginTop: 32,
    backgroundColor: "#FF7A00",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#FF7A00",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
