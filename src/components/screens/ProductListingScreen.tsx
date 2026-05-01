import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Text,
} from "react-native";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext"; // ✅ Add this line
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40) / 2; // 2-column layout

const ProductListingScreen: React.FC = () => {
  const navigation = useNavigation<any>();

 const route = useRoute<any>();
const params = route?.params || {};
const brandName = params?.brandName || "AJIO";  // fallback brand
const category = params?.category || null;      // optional

const [sortAscending, setSortAscending] = useState(true);


  const [searchQuery, setSearchQuery] = useState("");
  const { wishlistItems, toggleWishlist } = useWishlist();

 const { addToCart, cartItems } = useCart();

  // Brand-wise product data
const brandProducts: {
  [key: string]: { topwear: any[]; bottomwear: any[] };
} = {
  AJIO: {
    topwear: [
      {
        id: 1,
        name: "AJIO Classic Tee",
        price: "₹799",
        image: require("../../../assets/images/Topwear1.png"),
      },
      {
        id: 2,
        name: "AJIO Denim Shirt",
        price: "₹1,299",
        image: require("../../../assets/images/Topwear2.png"),
      },
    ],
    bottomwear: [
      {
        id: 3,
        name: "AJIO Slim Jeans",
        price: "₹1,499",
        image: require("../../../assets/images/bottomwear1.png"),
      },
      {
        id: 4,
        name: "AJIO Cargo Pants",
        price: "₹1,699",
        image: require("../../../assets/images/bottomwear2.png"),
      },
    ],
  },

  ZARA: {
    topwear: [
      {
        id: 5,
        name: "ZARA Oversized Tee",
        price: "₹1,499",
        image: require("../../../assets/images/Topwear1.png"),
      },
      {
        id: 6,
        name: "ZARA White Shirt",
        price: "₹2,099",
        image: require("../../../assets/images/Topwear2.png"),
      },
    ],
    bottomwear: [
      {
        id: 7,
        name: "ZARA Wide-Leg Pants",
        price: "₹2,999",
        image: require("../../../assets/images/bottomwear1.png"),
      },
      {
        id: 8,
        name: "ZARA Formal Trousers",
        price: "₹3,499",
        image: require("../../../assets/images/bottomwear2.png"),
      },
    ],
  },

  LEVIS: {
    topwear: [
      {
        id: 9,
        name: "LEVIS Graphic Tee",
        price: "₹999",
        image: require("../../../assets/images/Topwear1.png"),
      },
      {
        id: 10,
        name: "LEVIS Denim Jacket",
        price: "₹2,499",
        image: require("../../../assets/images/Topwear2.png"),
      },
    ],
    bottomwear: [
      {
        id: 11,
        name: "LEVIS 511 Jeans",
        price: "₹2,999",
        image: require("../../../assets/images/bottomwear1.png"),
      },
      {
        id: 12,
        name: "LEVIS Cargo Shorts",
        price: "₹1,499",
        image: require("../../../assets/images/bottomwear2.png"),
      },
    ],
  },

  HM: {
    topwear: [
      {
        id: 13,
        name: "H&M Cotton Tee",
        price: "₹899",
        image: require("../../../assets/images/Topwear1.png"),
      },
      {
        id: 14,
        name: "H&M Hoodie",
        price: "₹1,999",
        image: require("../../../assets/images/Topwear2.png"),
      },
    ],
    bottomwear: [
      {
        id: 15,
        name: "H&M Joggers",
        price: "₹1,799",
        image: require("../../../assets/images/bottomwear1.png"),
      },
      {
        id: 16,
        name: "H&M Slim Jeans",
        price: "₹2,299",
        image: require("../../../assets/images/bottomwear2.png"),
      },
    ],
  },

  PANTALOONS: {
    topwear: [
      {
        id: 17,
        name: "PANTALOONS Casual Shirt",
        price: "₹1,199",
        image: require("../../../assets/images/Topwear1.png"),
      },
      {
        id: 18,
        name: "PANTALOONS Polo Tee",
        price: "₹999",
        image: require("../../../assets/images/Topwear2.png"),
      },
    ],
    bottomwear: [
      {
        id: 19,
        name: "PANTALOONS Chinos",
        price: "₹1,499",
        image: require("../../../assets/images/bottomwear1.png"),
      },
      {
        id: 20,
        name: "PANTALOONS Jeans",
        price: "₹1,799",
        image: require("../../../assets/images/bottomwear2.png"),
      },
    ],
  },

  "CALVIN KLEIN": {
    topwear: [
      {
        id: 21,
        name: "CALVIN KLEIN Logo Tee",
        price: "₹2,499",
        image: require("../../../assets/images/Topwear1.png"),
      },
      {
        id: 22,
        name: "CALVIN KLEIN Sweatshirt",
        price: "₹3,299",
        image: require("../../../assets/images/Topwear2.png"),
      },
    ],
    bottomwear: [
      {
        id: 23,
        name: "CALVIN KLEIN Jeans",
        price: "₹4,199",
        image: require("../../../assets/images/bottomwear1.png"),
      },
      {
        id: 24,
        name: "CALVIN KLEIN Shorts",
        price: "₹2,599",
        image: require("../../../assets/images/bottomwear2.png"),
      },
    ],
  },

  "LOUIS VUITTON": {
    topwear: [
      {
        id: 25,
        name: "LOUIS VUITTON Designer Tee",
        price: "₹9,999",
        image: require("../../../assets/images/Topwear1.png"),
      },
      {
        id: 26,
        name: "LOUIS VUITTON Shirt",
        price: "₹12,999",
        image: require("../../../assets/images/Topwear2.png"),
      },
    ],
    bottomwear: [
      {
        id: 27,
        name: "LOUIS VUITTON Trousers",
        price: "₹15,999",
        image: require("../../../assets/images/bottomwear1.png"),
      },
      {
        id: 28,
        name: "LOUIS VUITTON Jeans",
        price: "₹13,999",
        image: require("../../../assets/images/bottomwear2.png"),
      },
    ],
  },

  "ALLEN SOLLY": {
    topwear: [
      {
        id: 29,
        name: "ALLEN SOLLY Casual Shirt",
        price: "₹1,499",
        image: require("../../../assets/images/Topwear1.png"),
      },
      {
        id: 30,
        name: "ALLEN SOLLY Formal Shirt",
        price: "₹1,799",
        image: require("../../../assets/images/Topwear2.png"),
      },
    ],
    bottomwear: [
      {
        id: 31,
        name: "ALLEN SOLLY Formal Pants",
        price: "₹2,199",
        image: require("../../../assets/images/bottomwear1.png"),
      },
      {
        id: 32,
        name: "ALLEN SOLLY Jeans",
        price: "₹1,999",
        image: require("../../../assets/images/bottomwear2.png"),
      },
    ],
  },
};



  // Brand logos mapping
 const brandLogos: { [key: string]: any } = {
  ajio: require("../../../assets/images/AJIOextend.png"),
  zara: require("../../../assets/images/zaraextend.png"),
  levis: require("../../../assets/images/LEVISextend.png"),
  hm: require("../../../assets/images/hmextend.png"),
  "calvin klein": require("../../../assets/images/celvinextend.png"),
  pantaloons: require("../../../assets/images/Pantaloonsextend.png"),
  "louis vuitton": require("../../../assets/images/LVextend.png"),
  "allen solly": require("../../../assets/images/allenextend.png"),
};


  // Normalize brandName to match keys
 // lowercase key for logos
const logoKey = brandName
  ? brandName.trim().toLowerCase().replace(/[^a-z ]/g, "").trim()
  : "";

// uppercase key for product data
const cleanBrandName = brandName
  ? brandName.trim().toUpperCase().replace(/[^A-Z ]/g, "").trim()
  : "";

// now get brand data safely
const brandData = brandProducts[cleanBrandName];


 // Filter products by brand + search query
// ✅ Combine all brand products if no category is selected
let products: any[] = [];

if (cleanBrandName) {
  const brandData = brandProducts[cleanBrandName];


  if (category) {
    // Show only selected category (e.g., "topwear" or "bottomwear")
   products = brandData?.[category] || [];

  } else {
    // Show all products for that brand (topwear + bottomwear)
    const topwear = brandData?.topwear || [];
    const bottomwear = brandData?.bottomwear || [];
    products = [...topwear, ...bottomwear];
  }
}

// ✅ Apply search filter
products = products.filter((p) =>
  p.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const [filteredProducts, setFilteredProducts] = useState(products || []);



const renderProductCard = ({ item }: any) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ProductDetailsScreen", {
          product: item,
          selectedBrand: cleanBrandName,
 // ✅ pass brand name
        })
      }
    >
      <Image source={item.image} style={styles.productImage} />

      {/* ❤️ + 🛒 icons */}
      <View style={styles.iconColumn}>
        {/* ❤️ Wishlist */}
       <TouchableOpacity
  onPress={() => toggleWishlist({ ...item, brandName: brandName })}
  style={styles.iconBackground}
>

          <Ionicons
            name={
              wishlistItems.some((p) => p.id === item.id)
                ? "heart"
                : "heart-outline"
            }
            size={22}
            color={
              wishlistItems.some((p) => p.id === item.id) ? "red" : "#fff"
            }
          />
        </TouchableOpacity>

        {/* 🛒 Cart icon adds directly to cart */}
        <TouchableOpacity
          onPress={() => {
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              originalPrice: item.originalPrice,
              discount: item.discount,
              image: item.image,
              brandName: cleanBrandName,

            });
          }}
          style={[styles.iconBackground, { marginTop: 10 }]}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🏷️ Label */}
      {item.label && (
        <View style={styles.labelTag}>
          <Text style={styles.labelText}>{item.label}</Text>
        </View>
      )}

      {/* Product Info */}
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        <Text style={styles.discount}>{item.discount}</Text>
      </View>
    </TouchableOpacity>
  );
};




  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={18}
            color="#999"
            style={{ marginRight: 6 }}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
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

      {/* Brand + Utility Icons Row */}
     {/* Brand + Utility Icons Row */}
{/* 🔸 Brand + Sort + Filter Row */}
<View style={styles.utilityRow}>
  {/* Brand Logo */}
  {logoKey && brandLogos[logoKey] && (
    <Image
      source={brandLogos[logoKey]}
      style={styles.brandLogo}
      resizeMode="contain"
    />
  )}

  {/* Sort & Filter Buttons */}
  <View style={styles.utilityButtons}>
    {/* 🔹 Sort */}
    <TouchableOpacity
      style={styles.utilityButton}
      onPress={() => {
        const sorted = [...filteredProducts].sort((a, b) => {
          const priceA = parseInt(a.price.replace(/\D/g, ""));
          const priceB = parseInt(b.price.replace(/\D/g, ""));
          return sortAscending ? priceA - priceB : priceB - priceA;
        });
        setFilteredProducts(sorted);
        setSortAscending(!sortAscending);
      }}
    >
      <Image
        source={require("../../../assets/icons/sorting.png")}
        style={styles.utilityIcon}
      />
      <Text style={styles.utilityText}>Sort</Text>
    </TouchableOpacity>

    {/* 🔹 Filter */}
    <TouchableOpacity
      style={styles.utilityButton}
      onPress={() => {
        // Example filter: show only items below ₹2000
        const filtered = products.filter(
          (item) => parseInt(item.price.replace(/\D/g, "")) < 2000
        );
        setFilteredProducts(filtered);
      }}
    >
      <Image
        source={require("../../../assets/icons/Filter.png")}
        style={styles.utilityIcon}
      />
      <Text style={styles.utilityText}>Filter</Text>
    </TouchableOpacity>
  </View>
</View>

      <FlatList
       
  data={filteredProducts && filteredProducts.length > 0 ? filteredProducts : products || []}


        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        renderItem={renderProductCard}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No products found.
          </Text>
        }
      />
    </View>
  );
};

export default ProductListingScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 2,
    height: 105,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#333" },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "pink",
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  cartBadgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  utilityText: {
  fontSize: 10,
  color: "#333",
  marginTop: 2,
  textAlign: "center",
},

  utilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  brandLogo: { width: 65, height: 30 },
  utilityButtons: { flexDirection: "row", gap: 20 },
  utilityButton: { alignItems: "center" },
  utilityIcon: { width: 24, height: 24, resizeMode: "contain" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    width: cardWidth,
    elevation: 2,
  },
  productImage: { width: "100%", height: 160, borderRadius: 10 },
  iconColumn: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  iconBackground: {
    width: 40,
    height: 30,
    marginRight: 3,
    marginTop: 3,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  labelTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#000",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  labelText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  productTitle: { fontSize: 13, fontWeight: "500", color: "#333", marginTop: 8 },
  priceRow: { flexDirection: "row", alignItems: "center", marginTop: 4, flexWrap: "wrap" },
  price: { fontSize: 14, fontWeight: "bold", color: "#000", marginRight: 5 },
  originalPrice: { fontSize: 12, color: "#999", textDecorationLine: "line-through", marginRight: 5 },
  discount: { fontSize: 12, color: "red" },
});
