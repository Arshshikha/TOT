import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const issues = [
  { id: "1", title: "Order related issue", type: "ORDER" },
  { id: "2", title: "Payment issue", type: "PAYMENT" },
  { id: "3", title: "Account issue", type: "ACCOUNT" },
  { id: "4", title: "Other issue", type: "OTHER" },
];

export default function HelpSupportScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#333" marginTop={25} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.subTitle}>What’s the issue?</Text>

        {issues.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("RaiseTicketScreen", {
                issueType: item.type,
              })
            }
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconCircle}>
                <Ionicons name="help-circle-outline" size={18} color="#FF7A00" />
              </View>
              <Text style={styles.cardText}>{item.title}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#FF7A00" />
          </TouchableOpacity>
        ))}

        {/* My Tickets Button */}
        <TouchableOpacity
          style={styles.myTicketsBtn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("MyTicketsScreen")}
        >
          <Ionicons name="ticket-outline" size={18} color="#fff" />
          <Text style={styles.myTicketsText}>View My Tickets</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const ORANGE = "#FF7A00";

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
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginTop:25,
  },

  body: {
    padding: 16,
  },

  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardText: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#222",
  },

  myTicketsBtn: {
    marginTop: 24,
    padding: 15,
    borderRadius: 14,
    backgroundColor: ORANGE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ORANGE,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  myTicketsText: {
    marginLeft: 8,
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
