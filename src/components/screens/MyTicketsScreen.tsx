import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTickets } from "../../context/TicketContext";

const ISSUE_LABELS = {
  ORDER: "Order related issue",
  PAYMENT: "Payment issue",
  ACCOUNT: "Account issue",
  OTHER: "Other issue",
};

const STATUS_LABELS = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN PROGRESS",
  RESOLVED: "RESOLVED",
};

export default function MyTicketsScreen({ navigation }) {
  const { tickets } = useTickets();

  const handleBackPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "HelpSupportScreen" }],
    });
  };

  const renderStatusChip = (status: string) => {
    return (
      <View style={[styles.statusChip, styles[`status_${status}`]]}>
        <Text style={styles.statusText}>{STATUS_LABELS[status]}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={22} color="#333" marginTop={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Ticket List */}
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Top Row */}
            <View style={styles.cardTop}>
              <Text style={styles.ticketId}>{item.id}</Text>
              {renderStatusChip(item.status)}
            </View>

            {/* Issue */}
            <Text style={styles.issueType}>
              {ISSUE_LABELS[item.issueType]}
            </Text>

            {/* Description */}
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <Ionicons name="time-outline" size={14} color="#999" />
              <Text style={styles.dateText}>
                {new Date(item.createdAt).toDateString()}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            You haven’t raised any tickets yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
const ORANGE = "#FF7A00";

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
    borderBottomWidth: 0.5,
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

  listContainer: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ticketId: {
    fontSize: 13,
    fontWeight: "700",
    color: ORANGE,
  },

  issueType: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  desc: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  dateText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#999",
  },

  /* Status Chips */
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  status_OPEN: {
    backgroundColor: "#FFE5D0",
  },

  status_IN_PROGRESS: {
    backgroundColor: "#D6E9FF",
  },

  status_RESOLVED: {
    backgroundColor: "#DFF5E3",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#333",
  },

  empty: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 14,
    color: "#999",
  },
});
