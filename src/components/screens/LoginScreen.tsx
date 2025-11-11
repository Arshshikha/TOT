import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import { useUser } from "../../context/UserContext";
type RootStackParamList = {
  LoginScreen: { redirectTo?: string } | undefined;
  MainTabs: { screen?: string } | undefined;
  MyAccount: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginScreen">;


export default function LoginScreen() {
  const [phone, setPhone] = useState("");
 const navigation = useNavigation<LoginScreenNavigationProp>();

 
  const { login } = useUser(); // ✅ use updated login from context
  const route = useRoute() as { params?: { redirectTo?: string } };
const redirectTo = route.params?.redirectTo || "MainTabs";


  

  // ✅ Handle keypad input
  const handleNumberPress = (num: string) => {
    if (num === "⌫") {
      setPhone(phone.slice(0, -1));
    } else if (/^\d$/.test(num)) {
      if (phone.length < 10) setPhone(phone + num);
    }
  };

  // ✅ Handle login action
  const handleContinue = () => {
  if (phone.length === 10) {
    const userData = {
      name: "Arshshikha",
      phone: `+91 ${phone}`,
      profileImage: require("../../../assets/images/profile.png"),
    };

    // ✅ Save user data in context
    login(userData);

    // ✅ Navigate to Account tab after successful login
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "MainTabs",
            state: {
              routes: [{ name: "MyAccount" }],
            },
          },
        ],
      })
    );
  } else {
    alert("Please enter a valid 10-digit phone number.");
  }
};

  const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["#", "0", "⌫"],
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ImageBackground
        source={require("../../../assets/images/Maskgroup.png")}
        style={styles.topSection}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace("MainTabs", { screen: "Home" })}
        >
          <Text style={styles.skipText}>Skip →</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>tot</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>LOGIN</Text>
        <Text style={styles.loginSubtitle}>
          Enter your phone number to continue
        </Text>

        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="9874561230"
              placeholderTextColor="#7A7A7A"
              keyboardType="number-pad"
              value={phone}
              editable={false}
            />
            <Ionicons name="call-outline" size={22} color="#7A7A7A" />
          </View>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>

        <View style={styles.keypadContainer}>
          {keypad.map((row, i) => (
            <View key={i} style={styles.keyRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.keyButton,
                    (key === "#" || key === "⌫") && styles.specialKeyButton,
                  ]}
                  onPress={() => handleNumberPress(key)}
                >
                  {key === "⌫" ? (
                    <Ionicons name="backspace-outline" size={22} color="#1a1a1a" />
                  ) : (
                    <Text style={styles.keyText}>{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

// ===== Styles =====
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topSection: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  skipButton: { position: "absolute", top: 20, right: 20 },
  skipText: { color: "#fff", fontSize: 16 },
  logoContainer: { alignItems: "center" },
  logo: {
    backgroundColor: "#FF6600",
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: "#fff", fontWeight: "bold", fontSize: 24 },
  loginCard: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    marginTop: -40,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  loginSubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
  },
  inputWrapper: { marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 2,
  },
  countryCode: { fontSize: 16, color: "#000" },
  phoneInput: { flex: 1, fontSize: 16, color: "#000" },
  continueButton: {
    backgroundColor: "#FF6600",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  continueText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  keypadContainer: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  keyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "90%",
  },
  keyButton: {
    backgroundColor: "#FFE1D1",
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 6,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: { fontSize: 22, color: "#1a1a1a", fontWeight: "500" },
  specialKeyButton: { backgroundColor: "#FFFFFF" },
});

