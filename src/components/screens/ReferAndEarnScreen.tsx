import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Clipboard } from "react-native";


const ORANGE = "#FF6600";

const ReferAndEarnScreen = () => {
  const referralCode = "ARSH123";

  const handleCopy = async () => {
    await Clipboard.setStringAsync(referralCode);
    Alert.alert("Copied", "Referral code copied to clipboard");
  };

  const handleShare = (platform: string) => {
    Alert.alert("Share", `Sharing via ${platform} (dummy action)`);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* =====================
          Referral Banner
         ===================== */}
      <View style={styles.banner}>
        <Ionicons name="gift-outline" size={40} color="#fff" />
        <Text style={styles.bannerTitle}>Invite friends & earn ₹100</Text>
        <Text style={styles.bannerSubtitle}>
          Earn rewards for every successful referral
        </Text>
      </View>

      {/* =====================
          Referral Code Card
         ===================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Referral Code</Text>

        <View style={styles.codeRow}>
          <Text style={styles.codeText}>{referralCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Ionicons name="copy-outline" size={16} color="#fff" />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* =====================
          How It Works
         ===================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>How it works</Text>

        <View style={styles.step}>
          <Ionicons name="share-social-outline" size={20} color={ORANGE} />
          <Text style={styles.stepText}>Share your referral code</Text>
        </View>

        <View style={styles.step}>
          <Ionicons name="person-add-outline" size={20} color={ORANGE} />
          <Text style={styles.stepText}>Friend signs up using your code</Text>
        </View>

        <View style={styles.step}>
          <Ionicons name="wallet-outline" size={20} color={ORANGE} />
          <Text style={styles.stepText}>You earn rewards</Text>
        </View>
      </View>

      {/* =====================
          Share Buttons
         ===================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Share with friends</Text>

        <View style={styles.shareRow}>
          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: "#25D366" }]}
            onPress={() => handleShare("WhatsApp")}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.shareText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: "#E1306C" }]}
            onPress={() => handleShare("Instagram")}
          >
            <Ionicons name="logo-instagram" size={18} color="#fff" />
            <Text style={styles.shareText}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: ORANGE }]}
            onPress={handleCopy}
          >
            <Ionicons name="link-outline" size={18} color="#fff" />
            <Text style={styles.shareText}>Copy Link</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* =====================
          Earnings Summary
         ===================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Earnings Summary</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>5</Text>
            <Text style={styles.summaryLabel}>Total Referrals</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>₹300</Text>
            <Text style={styles.summaryLabel}>Earned</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryValue}>₹100</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReferAndEarnScreen;

/* =====================
   Styles
   ===================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  banner: {
    backgroundColor: ORANGE,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bannerSubtitle: {
    color: "#fff",
    fontSize: 13,
    marginTop: 4,
    opacity: 0.9,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },

  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF3EC",
    padding: 12,
    borderRadius: 10,
  },
  codeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: ORANGE,
    letterSpacing: 1,
  },
  copyButton: {
    flexDirection: "row",
    backgroundColor: ORANGE,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  copyText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },

  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stepText: {
    marginLeft: 10,
    color: "#333",
    fontSize: 14,
  },

  shareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  shareText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryBox: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: ORANGE,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
