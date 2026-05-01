

import React, { useState, useRef, useEffect } from "react";
import { Share } from "react-native";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";

import { useAddress } from "../../context/AddressContext";


const { width } = Dimensions.get("window");



interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  images?: any[];
  sizes?: string[];
  brandName?: string;
     image: any; 
   brand?: string;
   
}

interface RouteParams {
  product: Product;
  selectedBrand: string;
}

const ProductDetailsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { product, selectedBrand } = route.params as RouteParams;
  const scrollRef = useRef<ScrollView>(null); 

  const getBrandLogo = (brandName) => {
  switch (brandName?.toLowerCase()) {
    case "levis":
      return require("../../../assets/images/Levis.png");
    case "ajio":
      return require("../../../assets/images/AJIO.png");
    case "hm":
      return require("../../../assets/images/hm.png");
    case "zara":
      return require("../../../assets/images/zara.png");
    case "calvin klein":
      return require("../../../assets/images/calvin.png");
    case "pantaloons":
      return require("../../../assets/images/pantaloons.png");
    case "louis vuitton":
      return require("../../../assets/images/lv.png");
    case "allen solly":
      return require("../../../assets/images/Allen.png");
    default:
      return require("../../../assets/images/AJIO.png");
  }
};

const { placeOrder } = useOrders();
const { selectedAddress } = useAddress();


const handleOrderForTry = () => {
  if (!selectedSize) {
    alert("Please select a size before placing an order.");
    return;
  }
  if (!selectedAddress) return alert("Please select address");

navigation.navigate("OrderHistoryScreen", {
  selectedSize,
  selectedAddress, 
});


  const orderData = {
    productId: product.id,
    name: product.name,
    brand: selectedBrand,
    price: product.price,
    size: selectedSize,
    image: product.images?.[0] || require("../../../assets/images/Topwear1.png"),
    address,
  };

  placeOrder(orderData);
  alert("Order for Try placed successfully!");
  navigation.navigate("OrderHistoryScreen"); // Navigate to Orders section (optional)
};

const [isCartSelected, setIsCartSelected] = useState(false);
const [isTrySelected, setIsTrySelected] = useState(false);


  const [cartCount, setCartCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<ScrollView>(null);
   useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [product?.id]);
  
const { wishlistItems, toggleWishlist } = useWishlist();
const { addToCart, cartItems } = useCart();

 // 🔹 Brand-based Dummy Reviews
// 🔹 Brand-based Dummy Reviews
const brandReviews: Record<string, any[]> = {
  ajio: [
    { id: "1", name: "Ananya Mehta", location: "Pune", rating: 5, comment: "Love AJIO’s trendy designs!" },
    { id: "2", name: "Rohit Singh", location: "Delhi", rating: 4, comment: "Good fit and comfortable fabric." },
  ],
  zara: [
    { id: "3", name: "Tanya Kapoor", location: "Mumbai", rating: 5, comment: "Premium quality, perfect fit!" },
    { id: "4", name: "Karan Patel", location: "Gurugram", rating: 4, comment: "Loved the minimalist design." },
  ],
  levis: [
    { id: "5", name: "Aditi Rao", location: "Hyderabad", rating: 5, comment: "Classic denim and great stitching." },
    { id: "6", name: "Ramesh Bhatia", location: "Chennai", rating: 4, comment: "Timeless Levi’s quality as always." },
  ],
  "h&m": [
    { id: "7", name: "Simran Kaur", location: "Ludhiana", rating: 5, comment: "Trendy and affordable pieces!" },
    { id: "8", name: "Yash Raj", location: "Bangalore", rating: 4, comment: "Good quality but size runs a bit small." },
  ],
  pantaloons: [
    { id: "9", name: "Priya Das", location: "Kolkata", rating: 4, comment: "Decent collection and pricing." },
    { id: "10", name: "Nikhil Sharma", location: "Delhi", rating: 5, comment: "Loved the fabric and comfort." },
  ],
  "calvin klein": [
    { id: "11", name: "Ritika Malhotra", location: "Mumbai", rating: 5, comment: "Luxurious feel and premium quality!" },
    { id: "12", name: "Arjun Sethi", location: "Hyderabad", rating: 5, comment: "Soft material, fits like a dream." },
  ],
  "louis vuitton": [
    { id: "13", name: "Neha Kapoor", location: "Chandigarh", rating: 5, comment: "Unmatched luxury and craftsmanship!" },
    { id: "14", name: "Kunal Oberoi", location: "Delhi", rating: 5, comment: "Absolutely stunning collection." },
  ],
  "allen solly": [
    { id: "15", name: "Ankita Jain", location: "Pune", rating: 4, comment: "Office wear looks great!" },
    { id: "16", name: "Harshit Mehra", location: "Jaipur", rating: 5, comment: "Comfortable and elegant clothing." },
  ],
};

// 🔹 Brand-based Dummy Similar Products
const brandSimilarProducts: Record<string, any[]> = {
  ajio: [
    { id: "1", name: "AJIO Oversized Hoodie", price: "₹1,799", originalPrice: "₹3,499", discount: "50% off", image: require("../../../assets/images/Topwear1.png") },
    { id: "2", name: "AJIO Slim Fit Jeans", price: "₹1,299", originalPrice: "₹2,999", discount: "55% off", image: require("../../../assets/images/productpant.png") },
  ],
  zara: [
    { id: "3", name: "ZARA Cotton Tee", price: "₹999", originalPrice: "₹1,999", discount: "50% off", image: require("../../../assets/images/Topwear2.png") },
    { id: "4", name: "ZARA Linen Pants", price: "₹1,899", originalPrice: "₹3,799", discount: "50% off", image: require("../../../assets/images/productpant.png") },
  ],
  levis: [
    { id: "5", name: "Levi’s Denim Jacket", price: "₹2,999", originalPrice: "₹5,999", discount: "50% off", image: require("../../../assets/images/productshirt.png") },
    { id: "6", name: "Levi’s Slim Fit Jeans", price: "₹2,499", originalPrice: "₹4,999", discount: "50% off", image: require("../../../assets/images/productpant.png") },
  ],
  "h&m": [
    { id: "7", name: "H&M Printed T-Shirt", price: "₹799", originalPrice: "₹1,599", discount: "50% off", image: require("../../../assets/images/Topwear1.png") },
    { id: "8", name: "H&M Jogger Pants", price: "₹1,299", originalPrice: "₹2,499", discount: "48% off", image: require("../../../assets/images/productpant.png") },
  ],
  pantaloons: [
    { id: "9", name: "Pantaloons Casual Shirt", price: "₹1,099", originalPrice: "₹2,199", discount: "50% off", image: require("../../../assets/images/productshirt.png") },
    { id: "10", name: "Pantaloons Formal Trousers", price: "₹1,699", originalPrice: "₹3,399", discount: "50% off", image: require("../../../assets/images/productpant.png") },
  ],
  "calvin klein": [
    { id: "11", name: "Calvin Klein Logo Tee", price: "₹3,499", originalPrice: "₹6,999", discount: "50% off", image: require("../../../assets/images/Topwear2.png") },
    { id: "12", name: "Calvin Klein Slim Jeans", price: "₹5,299", originalPrice: "₹10,499", discount: "49% off", image: require("../../../assets/images/productpant.png") },
  ],
  "louis vuitton": [
    { id: "13", name: "Louis Vuitton Polo", price: "₹25,999", originalPrice: "₹32,999", discount: "20% off", image: require("../../../assets/images/productshirt.png") },
    { id: "14", name: "Louis Vuitton Designer Jacket", price: "₹58,499", originalPrice: "₹72,999", discount: "20% off", image: require("../../../assets/images/Topwear1.png") },
  ],
  "allen solly": [
    { id: "15", name: "Allen Solly Formal Shirt", price: "₹1,799", originalPrice: "₹3,499", discount: "48% off", image: require("../../../assets/images/productshirt.png") },
    { id: "16", name: "Allen Solly Chinos", price: "₹2,099", originalPrice: "₹4,199", discount: "50% off", image: require("../../../assets/images/productpant.png") },
  ],
};


  
  // 🔹 Address states
  const [address, setAddress] = useState({
    street: "House 23, Green Park",
    landmark: "Near City Mall",
    city: "Delhi",
    pincode: "110016",
  });
  const [tempAddress, setTempAddress] = useState(address);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // ✅ Functions for modal
  const openModal = () => {
    setTempAddress(address); // pre-fill modal fields
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    setAddress(tempAddress);
    setShowAddressModal(false);
  };

  const cancelModal = () => {
    setShowAddressModal(false);
  };

  interface Brand {
  id: string;
  name: string;
  logo: any; // asset image
}

  const images = product?.images?.length
    ? product.images
    : [require("../../../assets/images/Topwear1.png"),
      require("../../../assets/images/Topwear2.png"),
      require("../../../assets/images/productshirt.png"),
      
    ];

  const sizes = product?.sizes || ["S", "M", "L", "XL", "XXL"];

  // 🔹 Dummy Reviews
 // 🔹 Dynamic Brand-based Reviews (with fallback)
const reviews =
  brandReviews[selectedBrand?.toLowerCase()] || [
    { id: "1", name: "Rahul Sharma", location: "Delhi", rating: 5, comment: "Great quality and fast delivery!" },
    { id: "2", name: "Anita Verma", location: "Mumbai", rating: 4, comment: "Product is good but packaging could improve." },
  ];
   const [pressedButton, setPressedButton] = useState(null);

  const handlePress = async (buttonName, action) => {
    setPressedButton(buttonName);
    try {
      await action();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setPressedButton(null), 200);
    }
  };

  // Dynamically fetch brand logo from assets



  // 🔹 Dummy Similar Products
 // 🔹 Dynamic Brand-based Similar Products (with fallback)
const similarProducts =
  brandSimilarProducts[selectedBrand?.toLowerCase()] || [
    {
      id: "1",
      name: "Casual Cotton Shirt",
      price: "₹999",
      originalPrice: "₹1,999",
      discount: "50% off",
      image: require("../../../assets/images/Topwear1.png"),
    },
    {
      id: "2",
      name: "Relaxed Fit Cargo Joggers",
      price: "₹1,440",
      originalPrice: "₹3,599",
      discount: "60% off",
      badge: "BESTSELLER",
      image: require("../../../assets/images/Topwear2.png"),
    },
  ];


  const handleScroll = (e: any) => {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
    if (slide !== activeIndex) setActiveIndex(slide);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
  {selectedBrand && (
    <Image
      source={getBrandLogo(selectedBrand)}
      style={{
        width: 50,
        height: 50,
        resizeMode: "contain",
        borderRadius: 8,
      }}
    />
  )}
</View>


        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
  <Ionicons name="cart-outline" size={24} color="#333" />
  

  {cartItems.length > 0 && (
    <View style={styles.cartBadge}>
      <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
    </View>
  )}
</TouchableOpacity>

      </View>

      {/* ===== Scrollable Content ===== */}
      <ScrollView  ref={scrollRef} contentContainerStyle={{ paddingBottom: 140 }}>
        
        {/* 🔸 Product Image Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={carouselRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              source={img}
              style={{ width: width, height: 420, resizeMode: "cover" }}
            />
          ))}
        </ScrollView>
    


        {/* Pagination Dots */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 8 }}>
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: activeIndex === index ? "orange" : "#ccc",
              }}
            />
          ))}
        </View>

        {/* Wishlist Button */}
     <TouchableOpacity
  style={styles.wishlistIcon}
  onPress={() =>
    toggleWishlist({
      ...product,
      image: product.images && product.images[0] ? product.images[0] : require("../../../assets/images/Topwear1.png"),
    })
  }
>
  <Ionicons
    name={wishlistItems.some((p) => p.id === product.id) ? "heart" : "heart-outline"}
    size={24}
    color={wishlistItems.some((p) => p.id === product.id) ? "red" : "#fff"}
  />
</TouchableOpacity>


        {/* 🔹 Color Information */}
<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 4,
  }}
>
  {/* Selected Color */}
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    {/* Dummy color dot */}
    <View/>
    <Text style={{ fontSize: 14, color: "#111111ff", fontWeight: "600" }}>
      Color: <Text style={{ color: "#000", fontWeight: "400" }}>Brown</Text>
    </Text>
  </View>

  {/* Available Colors Count */}
  <Text style={{ fontSize: 13, color: "#252424ff" }}>Available Colors  <Text style={{ color: "#000", fontWeight: "600" }}>8</Text></Text>
</View>


        {/* Thumbnail List */}
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, marginTop: 12 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                carouselRef.current?.scrollTo({ x: index * width, animated: true });
                setActiveIndex(index);
              }}
            >
              <Image
                source={item}
                style={{
                  width: 80,
                  height: 80,
                  marginHorizontal: 6,
                  borderWidth: activeIndex === index ? 2 : 1,
                  borderColor: activeIndex === index ? "orange" : "#ccc",
                  borderRadius: 6,
                }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        {/* ===== Product Information ===== */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
            {product?.name || "Product Name"}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", marginRight: 6 }}>
              {product?.price || "₹999"}
            </Text>
            <Text style={{ fontSize: 14, color: "#999", textDecorationLine: "line-through" }}>
              {product?.originalPrice || "₹1999"}
            </Text>
            <Text style={{ fontSize: 14, color: "red", marginLeft: 6 }}>
              {product?.discount || "50% off"}
            </Text>
          </View>

          {/* Size Selector */}
          <Text style={{ fontSize: 14, fontWeight: "500", marginVertical: 8 }}>Select Size</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderWidth: 1,
                  borderColor: selectedSize === size ? "#FF6F00" : "#999",
                  borderRadius: 4,
                  backgroundColor: selectedSize === size ? "#FF6F00" : "transparent",
                }}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={{ fontSize: 13, color: selectedSize === size ? "#fff" : "#333" }}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
         {/* 🔸 Delivery Address */}
{/* 🔸 Delivery Address */}
{/* 🔸 Delivery Address */}
<View style={styles.addressSection}>
  <View style={styles.addressRow}>
    
    <View style={{ flex: 1 }}>
      {/* 📍 Location Icon + Deliver To Label in ONE ROW */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../../assets/icons/Location-1.png")} // you will update path if needed
          style={styles.locationIcon}
        />
        <Text style={styles.addressLabel}>Deliver to</Text>
      </View>

      {selectedAddress ? (
        <>
          <Text style={styles.addressTxt}>{selectedAddress.fullAddress}</Text>
          {selectedAddress.phone && (
            <Text style={styles.addressTxt}> {selectedAddress.phone}</Text>
          )}
        </>
      ) : (
        <Text style={[styles.addressTxt, { color: "#999" }]}>
          Please select an address
        </Text>
      )}
    </View>

    {/* Change Button */}
    <TouchableOpacity
      style={styles.changeBtn}
      onPress={() => navigation.navigate("SavedAddressScreen")}
    >
      <Text style={styles.changeTxt}>Change</Text>
    </TouchableOpacity>

  </View>
</View>



<View style={styles.divider} />
        </View>
         
        


        {/* ===== Reviews Section ===== */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Reviews & Ratings</Text>
            <Image
              source={require("../../../assets/icons/StarActive.png")}
              style={{ width: 14, height: 14, marginLeft: 8 }}
              resizeMode="contain"
            />
            <Text style={{ marginLeft: 98, fontSize: 15, color: "#ffbb00", fontWeight: "600" }}>
              4.7
            </Text>
            <Text style={{ marginLeft: 6, color: "#666", fontSize: 13 }}>814 Reviews</Text>
          </View>

          {/* Rating Bars */}
          <View style={{ marginVertical: 8 }}>
            {[5, 4, 3, 2, 1].map((star, i) => {
              const counts = [210, 150, 154, 200, 150];
              const maxCount = Math.max(...counts);
              return (
                <View
                  key={star}
                  style={{ flexDirection: "row", alignItems: "center", marginVertical: 2 }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", width: 40 }}>
                    <Text style={{ fontSize: 13 }}>{star}</Text>
                    <Image
                      source={require("../../../assets/icons/StarActive.png")}
                      style={{ width: 12, height: 12, marginLeft: 4 }}
                    />
                  </View>
                  <View style={{ flex: 1, height: 6, backgroundColor: "#e0e0e0", marginHorizontal: 6 }}>
                    <View
                      style={{
                        width: `${(counts[i] / maxCount) * 100}%`,
                        height: 6,
                        backgroundColor: "green",
                      }}
                    />
                  </View>
                  <Text style={{ width: 40 }}>{counts[i]}</Text>
                </View>
              );
            })}
          </View>

          {/* Individual Reviews */}
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{ marginVertical: 8, backgroundColor: "#fff", padding: 10, borderRadius: 6 }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ color: "#888", fontSize: 12 }}>{item.location}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Image
                        key={idx}
                        source={require("../../../assets/icons/StarActive.png")}
                        style={{ width: 12, height: 12, marginLeft: 2 }}
                      />
                    ))}
                  </View>
                </View>
                <Text style={{ color: "#333", fontSize: 12, lineHeight: 16 }}>{item.comment}</Text>
                <View style={{ height: 1, backgroundColor: "#E0E0E0", marginTop: 8 }} />
              </View>
            )}
            scrollEnabled={false}
          />
        </View>

        {/* ===== Similar Products ===== */}
        {/* ===== Similar Products ===== */}
<View style={{ paddingHorizontal: 16, marginTop: 24 }}>
  <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
    Similar Products
  </Text>

  <FlatList
    data={similarProducts}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.similarProductCard}
        onPress={() =>
          navigation.navigate("ProductDetailsScreen", {
            product: item,
            selectedBrand: item.brandName || "Unknown Brand",
          })
        }
      >
        {/* Product Image */}
        <Image
          source={item.image}
          style={{ width: 140, height: 140, borderRadius: 8 }}
          resizeMode="cover"
        />

        {/* ❤️ + 🛒 icons in top-right column */}
        <View style={styles.iconColumn}>
          <TouchableOpacity
            onPress={() => toggleWishlist({ ...item })}
            style={styles.iconBackground}
          >
            <Ionicons
              name={
                wishlistItems.some((p) => p.id === item.id)
                  ? "heart"
                  : "heart-outline"
              }
              size={20}
              color={
                wishlistItems.some((p) => p.id === item.id) ? "red" : "#fff"
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
  onPress={() =>
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price || "0", // ✅ fallback value
      originalPrice: item.originalPrice || "0",
      discount: item.discount || "0% off",
      image: item.image,
      brandName: item.brandName || "Unknown Brand",
      brand: selectedBrand?.toLowerCase()?.trim() || "unknown", // ✅ safe optional chaining
    })
  }
  style={[styles.iconBackground, { marginTop: 8 }]}
>
  <Ionicons name="cart-outline" size={18} color="#fff" />
</TouchableOpacity>

        </View>

        {/* Product Name */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#333",
            marginTop: 8,
          }}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        {/* Price Row */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#FF6F00" }}>
            {item.price}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              textDecorationLine: "line-through",
              marginLeft: 6,
            }}
          >
            {item.originalPrice}
          </Text>
          <Text style={{ fontSize: 12, color: "red", marginLeft: 6 }}>
            {item.discount}
          </Text>
        </View>
      </TouchableOpacity>
    )}
  />
</View>

        {/* ===== Modal for Editing Address ===== */}
     <Modal
  visible={showAddressModal}   
  animationType="fade"
  transparent
  onRequestClose={cancelModal}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Update Address</Text>

      <TextInput
        placeholder="Street / House No."
        style={styles.input}
        value={tempAddress.street}
        onChangeText={(text) => setTempAddress({ ...tempAddress, street: text })}
      />
      <TextInput
        placeholder="Landmark"
        style={styles.input}
        value={tempAddress.landmark}
        onChangeText={(text) =>
          setTempAddress({ ...tempAddress, landmark: text })
        }
      />
      <TextInput
        placeholder="City"
        style={styles.input}
        value={tempAddress.city}
        onChangeText={(text) => setTempAddress({ ...tempAddress, city: text })}
      />
      <TextInput
        placeholder="Pin Code"
        style={styles.input}
        value={tempAddress.pincode}
        keyboardType="numeric"
        onChangeText={(text) =>
          setTempAddress({ ...tempAddress, pincode: text })
        }
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          style={styles.modalButtonCancel}
          onPress={cancelModal}
        >
          <Text style={{ color: "#FF6F00", fontWeight: "600" }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalButtonSave} onPress={saveAddress}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
      </ScrollView>

{/* 🔸 Bottom Buttons*/ }
{/* 🔸 Bottom Buttons */}

 <View style={styles.container}> 
  <View style={styles.innerRow}>
    {/* Share Button */}
    <TouchableOpacity
      style={[
        styles.iconButton,
        pressedButton === "share" && styles.buttonActive,
      ]}
      onPress={() =>
        handlePress("share", async () => {
          try {
            await Share.share({
              message: `Check out this product: ${product?.name || "Product"} from ${selectedBrand}!`,
            });
          } catch (error) {
            console.error("Share Error:", error);
          }
        })
      }
    >
      <Ionicons
        name="share-social-outline"
        size={22}
        color={pressedButton === "share" ? "#fff" : "#FF6F00"}
      />
    </TouchableOpacity>

    {/* Add To Cart Button */}
    <TouchableOpacity
      style={[
        styles.addToCartButton,
        pressedButton === "cart" && styles.buttonActive,
      ]}
      onPress={() =>
        handlePress("cart", () =>
          addToCart({
            ...product,
            brand: selectedBrand,
            brandName: selectedBrand,
            image:
              product.images && product.images[0]
                ? product.images[0]
                : require("../../../assets/images/Topwear1.png"),
          })
        )
      }
    >
      <Text
        style={[
          styles.addToCartText,
          pressedButton === "cart" && styles.buttonTextActive,
        ]}
      >
        ADD TO CART
      </Text>
    </TouchableOpacity>

    {/* Order For Try Button */}
    <TouchableOpacity
      style={[
        styles.actionButton,
        pressedButton === "try" && styles.buttonActive,
      ]}
      onPress={() => handlePress("try", handleOrderForTry)}
    >
      <Text
        style={[
          styles.buttonText,
          pressedButton === "try" && styles.buttonTextActive,
        ]}
      >
        Order for Try
      </Text>
    </TouchableOpacity>
  </View>
</View>



</View>

   
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  addressSection: {
    backgroundColor: "#FFF7F0", // soft orange tint like Ajio
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  addressLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
locationIcon: {
  width: 20,
  height: 20,
  marginRight: 6,
  marginBottom:5,
},


  addressTxt: {
    fontSize: 13,
    color: "#333",
    marginTop: 3,
  },

  changeBtn: {
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FF6B00", // orange outline button
  },

  changeTxt: {
    fontSize: 12,
    color: "#FF6B00",
    fontWeight: "700",
    textTransform: "uppercase",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 2,
    marginTop: 60,
  },
 addToCartButton: {
  flex: 1,
  backgroundColor: "#fff",
  borderWidth: 1.5,
  borderColor: "#FF6F00",
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  marginRight: 8,
},
addToCartText: {
  color: "#FF6F00",
  fontSize: 15,
  fontWeight: "600",
},
actionButton: {
  flex: 1,
  backgroundColor: "#fff",
  borderWidth: 1.5,
  borderColor: "#FF6F00",
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
},
buttonText: {
  color: "#FF6F00",
  fontSize: 15,
  fontWeight: "600",
},
buttonActive: {
  backgroundColor: "#FF6F00",
},
buttonTextActive: {
  color: "#fff",
},



  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    flexWrap: "wrap",
  },
  addressText: { flex: 1, color: "#333", fontSize: 13, marginRight: 10, marginBottom: 12 },
  changeAddressBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#FF6F00",
    borderRadius: 4,
  },
   addressSection: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 12,
    marginVertical: 12,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
  
   
    // orange border for theme
  },

  addressLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000ff", // orange heading
    marginBottom: 6,
  },

  addressTxt: {
    fontSize: 14,
    color: "#333", // dark text
    marginBottom: 4,
  },

  changeBtn: {
    alignSelf: "flex-start",
    marginTop: 10,
    backgroundColor: "#FF6B00", // orange button
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  changeTxt: {
    color: "#FFFFFF", // white text
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  similarCard: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 12,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
  },
  modalBackground: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center",
},
modalContainer: {
  width: "85%",
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 16,
},
brandHeader: {
  alignItems: "center",
  marginTop: 10,
  marginBottom: 6,
},
brandLogo: {
  width: 80,
  height: 80,
  resizeMode: "contain",
  borderRadius: 10,
},

modalTitle: {
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 10,
},
input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  padding: 8,
  marginBottom: 10,
  fontSize: 13,
},
modalButtonCancel: {
  borderWidth: 1,
  borderColor: "#FF6F00",
  borderRadius: 6,
  padding: 10,
  flex: 1,
  alignItems: "center",
  marginRight: 8,
},
modalButtonSave: {
  backgroundColor: "#FF6F00",
  borderRadius: 6,
  padding: 10,
  flex: 1,
  alignItems: "center",
},

  cartBadge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "pink",
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  cartBadgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  wishlistIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 4,
  },
  
  
  similarProductCard: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 12,
    padding: 10,
    elevation: 2,
    marginBottom: 16,
  },
  

iconColumn: {
  position: "absolute",
  top: 16,
  right: 12,
  flexDirection: "column",
  alignItems: "center",
},

iconBackground: {
  width: 32,
  height: 25,
  borderRadius: 6,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
},

  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF6F00",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    alignItems: "center",
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  iconButton: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#FF6F00",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  });
