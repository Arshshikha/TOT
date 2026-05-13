import React from "react";
import { CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useOrders } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";

const { width } = Dimensions.get("window");

export default function MyAccountScreen({ navigation }) {
  const { activeOrders } = useOrders();
  const { cartItems } = useCart();
  const { user, logout } = useUser();

  
  const handleLogout = () => {
    if (user && user?.firstName) {
      
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ]);
    } else {
     
      Alert.alert("Info", "You are not logged in.", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Login", { redirectTo: "MyAccountScreen" });
          },
        },
      ]);
    }
  };

  
  type MenuItem = { id: string; label: string; icon: any; screen?: string };
  const settingsItems: MenuItem[] = [
   
    {
      id: "1",
      label: "Saved Address",
      icon: require("../../../assets/icons/Location-1.png"),
      screen: "SavedAddressScreen",
    },
    {
      id: "2",
      label: "Edit Profile",
      icon: require("../../../assets/icons/edit.png"),
      screen: "EditProfileScreen",
    },
  ];

  const activitiesItems: MenuItem[] = [
    {
      id: "1",
      label: "Active Orders",
      icon: require("../../../assets/icons/Location-1.png"),
    },
    {
      id: "2",
      label: "Order History",
      icon: require("../../../assets/icons/OrderHistory.png"),
    },
    {
      id: "3",
      label: "Reviews & Ratings",
      icon: require("../../../assets/icons/Location-1.png"),
      screen: "MyReviewsScreen",
    },
  ];

  const supplierItems: MenuItem[] = [
    {
      id: "1",
      label: "Become a Vendor",
      icon: require("../../../assets/icons/Vendor.png"),
      screen: "BecomeVendorScreen",
    },
    {
      id: "2",
      label: "Refer & Earn",
      icon: require("../../../assets/icons/refer.png"),
      screen: "ReferAndEarnScreen",
    },
  ];

  const supportItems: MenuItem[] = [
    {
    id: "0",
    label: "Help & Support",
    icon: require("../../../assets/icons/customer-service.png"),
    screen: "HelpSupportScreen",
  },
    {
      id: "1",
      label: "Contact Us",
      icon: require("../../../assets/icons/customer-service.png"),
      screen: "ContactUsScreen",
    },
    {
      id: "2",
      label: "FAQs",
      icon: require("../../../assets/icons/faq.png"),
      screen: "FAQsScreen",
    },
    {
  id: "3",
  label: "Report a Problem",
 icon: require("../../../assets/icons/termsconditions.png"),
  screen: "ReportProblemScreen",
}

  ];

  const legalItems: MenuItem[] = [
    {
      id: "1",
      label: "Privacy Policy",
      icon: require("../../../assets/icons/privacy.png"),
    },
    {
      id: "2",
      label: "Terms & Conditions",
      icon: require("../../../assets/icons/termsconditions.png"),
    },
    {
      id: "3",
      label: "Return Policy",
      icon: require("../../../assets/icons/return.png"),
    },
  ];

  
  return (
    <SafeAreaView style={styles.container}>
      {/* ========== Header ========== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Account</Text>

        <TouchableOpacity
          style={styles.cartIconWrapper}
          onPress={() => {
            if (!user?.firstName) {
              Alert.alert("Login Required", "Please log in to view your cart.", [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Login", {
                      redirectTo: "MyAccountScreen",
                    });
                  },
                },
              ]);
            } else {
              navigation.navigate("CartScreen");
            }
          }}
        >
          <Ionicons name="cart-outline" size={24} color="#000" />
          {cartItems?.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ========== Scrollable Body ========== */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ========== Profile Info ========== */}
        <View style={styles.profileCard}>
          <Image
            source={
              user?.avatarUrl
                ? { uri: user?.avatarUrl }
                : require("../../../assets/images/profile.png")
            }
            style={styles.profileImage}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.userName}>Hi {user?.firstName || "Guest"}</Text>
            <Text style={styles.userPhone}>
              {user?.phone || "+00 0000000000"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!user?.firstName) {
                Alert.alert("Login Required", "Please log in first.", [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.navigate("Login", {
                        redirectTo: "EditProfileScreen",
                      });
                    },
                  },
                ]);
              } else {
                navigation.navigate("EditProfileScreen");
              }
            }}
          >
            <Image
              source={require("../../../assets/icons/edit.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ========== Active Orders ========== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Active Orders</Text>

            {activeOrders.length > 0 && (
              <TouchableOpacity
                onPress={() => navigation.navigate("ActiveOrdersScreen")}
              >
                <Text style={styles.viewAll}>View All →</Text>
              </TouchableOpacity>
            )}
          </View>

          {activeOrders.length === 0 ? (
            <View style={styles.noOrdersContainer}>
              <Text style={styles.noOrdersText}>No active orders</Text>
            </View>
          ) : (
            <FlatList
              data={activeOrders}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.orderCard}>
                  <Image source={item.image} style={styles.orderImage} />
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.orderStatus}>{item.status}</Text>
                    <Text style={styles.orderDelivery}>{item.delivery}</Text>
                    <Text style={styles.orderDetails}>
                      Size: {item.size} | Qty: {item.qty} | ₹
                      {item.price.toString().replace(/[^0-9.]/g, "")}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#FF6600" />
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* ========== Account Settings ========== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.row}
              onPress={() => {
                if (!user?.firstName) {
                  Alert.alert("Login Required", "Please log in first.", [
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.navigate("Login", {
                          redirectTo: item.screen || "MyAccountScreen",
                        });
                      },
                    },
                  ]);
                } else if (item.screen) {
                  navigation.navigate(item.screen);
                }
              }}
            >
              <Image source={item.icon} style={styles.rowIcon} />
              <Text style={styles.rowText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#FF6600" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ========== Other Sections ========== */}
        {[activitiesItems, supplierItems, supportItems, legalItems].map(
          (section, index) => {
            let sectionTitle = "";
            switch (index) {
              case 0:
                sectionTitle = "My Activities";
                break;
              case 1:
                sectionTitle = "Become a Supplier";
                break;
              case 2:
                sectionTitle = "Support";
                break;
              case 3:
                sectionTitle = "Legal";
                break;
            }

            return (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{sectionTitle}</Text>

                {section.map((item) => {
                  // ---------- Legal Section ----------
                  if (index === 3) {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.row}
                        onPress={() => {
                          switch (item.label) {
                            case "Privacy Policy":
                              navigation.navigate("PrivacyPolicy");
                              break;
                            case "Terms & Conditions":
                              navigation.navigate("TermsConditions");
                              break;
                            case "Return Policy":
                              navigation.navigate("ReturnPolicy");
                              break;
                          }
                        }}
                      >
                        <Image source={item.icon} style={styles.rowIcon} />
                        <Text style={styles.rowText}>{item.label}</Text>
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#FF6600"
                        />
                      </TouchableOpacity>
                    );
                  }

                  // ---------- Activities Section ----------
                  if (index === 0) {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.row}
                        onPress={() => {
                          if (!user?.firstName) {
                            Alert.alert(
                              "Login Required",
                              "Please log in first.",
                              [
                                {
                                  text: "OK",
                                  onPress: () => {
                                    navigation.navigate("Login", {
                                      redirectTo: "OrderHistoryScreen",
                                    });
                                  },
                                },
                              ]
                            );
                            return;
                          }

                          switch (item.label) {
                            case "Active Orders":
                              navigation.navigate("ActiveOrdersScreen");
                              break;
                            case "Order History":
                              navigation.navigate("OrderHistoryScreen");
                              break;
                            default:
                              if (item.screen) navigation.navigate(item.screen);
                              break;
                          }
                        }}
                      >
                        <Image source={item.icon} style={styles.rowIcon} />
                        <Text style={styles.rowText}>{item.label}</Text>
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#FF6600"
                        />
                      </TouchableOpacity>
                    );
                  }

                  // ---------- Supplier Section ----------
                  if (index === 1) {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.row}
                        onPress={() => {
                          if (!user?.firstName) {
                            Alert.alert(
                              "Login Required",
                              "Please log in first.",
                              [
                                {
                                  text: "OK",
                                  onPress: () => {
                                    navigation.navigate("Login", {
                                      redirectTo: item.screen,
                                    });
                                  },
                                },
                              ]
                            );
                            return;
                          }

                          // Navigate exactly to the screen defined in supplierItems
                          navigation.navigate(item.screen);
                        }}
                      >
                        <Image source={item.icon} style={styles.rowIcon} />
                        <Text style={styles.rowText}>{item.label}</Text>
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#FF6600"
                        />
                      </TouchableOpacity>
                    );
                  }

                  // ---------- Support Section ----------
                  if (index === 2) {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.row}
                        onPress={() => {
                          if (item.screen) navigation.navigate(item.screen);
                        }}
                      >
                        <Image source={item.icon} style={styles.rowIcon} />
                        <Text style={styles.rowText}>{item.label}</Text>
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#FF6600"
                        />
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            );
          }
        )}

        {/* ========== Logout Button ========== */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={20} color="#FF6600" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* ========== Footer ========== */}
        <Text style={styles.appVersion}>App Version 2.6.5.2</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },
  noOrdersContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  noOrdersText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 4,
  },
  cartIconWrapper: { position: "relative" },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  profileImage: { width: 60, height: 60, borderRadius: 30 },
  userName: { fontSize: 16, fontWeight: "bold" },
  userPhone: { fontSize: 14, color: "#777" },
  editIcon: { width: 24, height: 24 },
  section: { marginTop: 16, backgroundColor: "#fff", padding: 12 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "normal" },
  viewAll: { color: "#FF6600", fontWeight: "bold" },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    marginRight: 12,
    borderRadius: 10,
    elevation: 2,
    width: width * 0.7,
    alignItems: "center",
  },
  orderImage: { width: 60, height: 60, borderRadius: 6 },
  orderStatus: { color: "green", fontWeight: "bold", fontSize: 14 },
  orderDelivery: { fontSize: 12, color: "#777" },
  orderDetails: { fontSize: 12, color: "#555" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  rowIcon: { width: 24, height: 24, marginRight: 12, tintColor: "#777" },
  rowText: { flex: 1, fontSize: 14, color: "#000", fontWeight: "bold" },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#FF6600",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  logoutText: {
    color: "#FF6600",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  appVersion: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginVertical: 16,
  },
});
