
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useWishlist } from "../../context/WishlistContext"; 
import { useCart } from "../../context/CartContext";


const { width } = Dimensions.get("window");

interface Brand {
  id: string;
  name:string,
  logo: any;
  deliveryTime: string;
}

interface Product {
  id: string;
  title: string;
  name: string;
  
  price: string;
  originalPrice: string;
  discount: string;
  badge?: string;
  brand?: string;
    image: any; 

}

const brandsData: Brand[] = [
  { id: "0", name: "All Brands", logo: null, deliveryTime: "All" },
  { id: "1", name: "LEVIS", logo: require("../../../assets/images/LEVISextend.png"), deliveryTime: "20–30 mins" },
  { id: "2", name: "AJIO", logo: require("../../../assets/images/AJIOextend.png"), deliveryTime: "20–30 mins" },
  { id: "3", name: "HM", logo: require("../../../assets/images/hmextend.png"), deliveryTime: "20–30 mins" },
  { id: "4", name: "Zara", logo: require("../../../assets/images/zaraextend.png"), deliveryTime: "20–30 mins" },
  { id: "5", name: "Pantaloons", logo: require("../../../assets/images/Pantaloonsextend.png"), deliveryTime: "20–30 mins" },
  { id: "6", name: "Calvin Klein", logo: require("../../../assets/images/celvinextend.png"), deliveryTime: "20–30 mins" },
  { id: "7", name: "Louis Vuitton", logo: require("../../../assets/images/LVextend.png"), deliveryTime: "20–30 mins" },
  { id: "8", name: "Allen Solly", logo: require("../../../assets/images/allenextend.png"), deliveryTime: "20–30 mins" },
];



// 🧱 Dummy brand-wise products
const brandProducts: Record<string, { topwear: Product[]; bottomwear: Product[] }> = {
  "LEVIS": {
    topwear: [
      {
        id: "levi_top_1",
        title: "Levi's Classic Denim Jacket",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/Topwear1.png"),
        price: "₹2,499",
        originalPrice: "₹4,999",
        discount: "50% off",
      },
      {
        id: "levi_top_2",
        title: "Levi's Logo Tee",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/Topwear2.png"),
        price: "₹999",
        originalPrice: "₹1,999",
        discount: "50% off",
        badge: "BESTSELLER",
      },
    ],
    bottomwear: [
      {
        id: "levi_bottom_1",
        title: "Levi's Slim Fit Jeans",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/bottomwear1.png"),
        price: "₹1,799",
        originalPrice: "₹3,599",
        discount: "50% off",
      },
      {
        id: "levi_bottom_2",
        title: "Levi's Cargo Pants",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/bottomwear2.png"),
        price: "₹1,599",
        originalPrice: "₹3,199",
        discount: "50% off",
      },
    ],
  },

  AJIO: {
    topwear: [
      {
        id: "ajio_top_1",
        title: "AJIO Cotton Casual Shirt",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/Topwear2.png"),
        price: "₹1,199",
        originalPrice: "₹2,399",
        discount: "50% off",
      },
      {
        id: "ajio_top_2",
        title: "AJIO Printed Polo Tee",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/Topwear1.png"),
        price: "₹899",
        originalPrice: "₹1,799",
        discount: "50% off",
      },
    ],
    bottomwear: [
      {
        id: "ajio_bottom_1",
        title: "AJIO Slim Fit Chinos",
         name: "Classic Denim Jacket",
        image: require("../../../assets/images/bottomwear2.png"),
        price: "₹1,299",
        originalPrice: "₹2,599",
        discount: "50% off",
      },
      {
        id: "ajio_bottom_2",
        title: "AJIO Tapered Jeans",
         name: "Classic Denim Jacket",
        image: require("../../../assets/images/bottomwear1.png"),
        price: "₹1,599",
        originalPrice: "₹3,199",
        discount: "50% off",
      },
    ],
  },

  "HM": {
    topwear: [
      {
        id: "hm_top_1",
        title: "H&M Linen Shirt",
         name: "Classic Denim Jacket",
        image: require("../../../assets/images/Topwear2.png"),
        price: "₹1,499",
        originalPrice: "₹2,999",
        discount: "50% off",
      },
      {
        id: "hm_top_2",
        title: "H&M Oversized Tee",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/Topwear1.png"),
        price: "₹999",
        originalPrice: "₹1,999",
        discount: "50% off",
        badge: "TRENDING",
      },
    ],
    bottomwear: [
      {
        id: "hm_bottom_1",
        title: "H&M Trousers",
         name: "Classic Denim Jacket",
        image: require("../../../assets/images/bottomwear2.png"),
        price: "₹1,899",
        originalPrice: "₹3,7999",
        discount: "50% off",
      },
      {
        id: "hm_bottom_2",
        title: "H&M Cargo Joggers",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/bottomwear1.png"),
        price: "₹1,499",
        originalPrice: "₹2,9999",
        discount: "50% off",
      },
    ],
  },

  Zara: {
    topwear: [
      {
        id: "zara_top_1",
        title: "Zara Cotton Overshirt",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/Topwear1.png"),
        price: "₹2,199",
        originalPrice: "₹4,399",
        discount: "50% off",
      },
      {
        id: "zara_top_2",
        title: "Zara Graphic Tee",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/Topwear2.png"),
        price: "₹1,299",
        originalPrice: "₹2,599",
        discount: "50% off",
      },
    ],
    bottomwear: [
      {
        id: "zara_bottom_1",
        title: "Zara Wide Leg Pants",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/bottomwear1.png"),
        price: "₹2,499",
        originalPrice: "₹4,999",
        discount: "50% off",
      },
      {
        id: "zara_bottom_2",
        title: "Zara Slim Jeans",
         name: "Classic Denim Jacket",
        image: require("../../../assets/images/bottomwear2.png"),
        price: "₹2,299",
        originalPrice: "₹4,599",
        discount: "50% off",
      },
    ],
  },

  Pantaloons: {
    topwear: [
      {
        id: "pantaloon_top_1",
        title: "Pantaloons Formal Shirt",
         name: " Classic Denim Jacket",
        image: require("../../../assets/images/Topwear1.png"),
        price: "₹1,199",
        originalPrice: "₹2,399",
        discount: "50% off",
      },
      {
        id: "pantaloon_top_2",
        title: "Pantaloons Casual Tee",
         name: "Pantaloons Casual Tee",
        image: require("../../../assets/images/Topwear2.png"),
        price: "₹899",
        originalPrice: "₹1,799",
        discount: "50% off",
      },
    ],
    bottomwear: [
      {
        id: "pantaloon_bottom_1",
        title: "Pantaloons Regular Jeans",
         name: "Pantaloons Regular Jeans",
        image: require("../../../assets/images/bottomwear2.png"),
        price: "₹1,499",
        originalPrice: "₹2,999",
        discount: "50% off",
      },
      {
        id: "pantaloon_bottom_2",
        title: "Pantaloons Joggers",
         name: "Pantaloons Joggers",
        image: require("../../../assets/images/bottomwear1.png"),
        price: "₹1,399",
        originalPrice: "₹2,799",
        discount: "50% off",
      },
    ],
  },

  "Allen Solly": {
    topwear: [
      {
        id: "allen_top_1",
        title: "Allen Solly Polo T-Shirt",
         name: "Allen Solly Polo T-Shirt",
        image: require("../../../assets/images/Topwear2.png"),
        price: "₹1,299",
        originalPrice: "₹2,599",
        discount: "50% off",
      },
      {
        id: "allen_top_2",
        title: "Allen Solly Formal Shirt",
         name: "Allen Solly Formal Shirt",
        image: require("../../../assets/images/Topwear1.png"),
        price: "₹1,799",
        originalPrice: "₹3,599",
        discount: "50% off",
      },
    ],
    bottomwear: [
      {
        id: "allen_bottom_1",
        title: "Allen Solly Slim Fit Trousers",
         name: "Allen Solly Slim Fit Trousers",
        image: require("../../../assets/images/bottomwear1.png"),
        price: "₹1,899",
        originalPrice: "₹3,799",
        discount: "50% off",
      },
      {
        id: "allen_bottom_2",
        title: "Allen Solly Khaki Pants",
         name: "Allen Solly Khaki Pants",
        image: require("../../../assets/images/bottomwear2.png"),
        price: "₹1,599",
        originalPrice: "₹3,199",
        discount: "50% off",
      },
    ],
  },

  "Louis Vuitton": {
    topwear: [
      {
        id: "lv_top_1",
        title: "Louis Vuitton Designer Shirt",
         name: "Louis Vuitton Designer Shirt",
        image: require("../../../assets/images/Topwear1.png"),
        price: "₹24,999",
        originalPrice: "₹49,999",
        discount: "50% off",
        badge: "LUXURY",
      },
      {
        id: "lv_top_2",
        title: "Louis Vuitton Monogram Tee",
         name: "Louis Vuitton Monogram Tee",
        image: require("../../../assets/images/Topwear2.png"),
        price: "₹19,999",
        originalPrice: "₹39,999",
        discount: "50% off",
      },
    ],
    bottomwear: [
      {
        id: "lv_bottom_1",
        title: "Louis Vuitton Tailored Pants",
         name: "Louis Vuitton Tailored Pants",
        image: require("../../../assets/images/bottomwear2.png"),
        price: "₹29,999",
        originalPrice: "₹59,999",
        discount: "50% off",
      },
      {
        id: "lv_bottom_2",
        title: "Louis Vuitton Signature Jeans",
         name: "Louis Vuitton Signature Jeans",
        image: require("../../../assets/images/bottomwear1.png"),
        price: "₹22,999",
        originalPrice: "₹45,999",
        discount: "50% off",
      },
    ],
  },

  "Calvin Klein": {
    topwear: [
      {
        id: "ck_top_1",
        title: "Calvin Klein Slim Fit Tee",
         name: "Levi's Classic Denim Jacket",
        image: require("../../../assets/images/Topwear1.png"),
        price: "₹3,499",
        originalPrice: "₹6,999",
        discount: "50% off",
      },
      {
        id: "ck_top_2",
        title: "Calvin Klein Cotton Shirt",
         name: "Calvin Klein Cotton Shirt",
        image: require("../../../assets/images/Topwear2.png"),
        price: "₹4,199",
        originalPrice: "₹8,399",
        discount: "50% off",
      },
    ],
    bottomwear: [
      {
        id: "ck_bottom_1",
        title: "Calvin Klein Denim Jeans",
         name: "Calvin Klein Denim Jeans",
        image: require("../../../assets/images/bottomwear1.png"),
        price: "₹4,999",
        originalPrice: "₹9,999",
        discount: "50% off",
      },
      {
        id: "ck_bottom_2",
        title: "Calvin Klein Smart Trousers",
         name: "Calvin Klein Smart Trousers",
        image: require("../../../assets/images/bottomwear2.png"),
        price: "₹5,199",
        originalPrice: "₹10,399",
        discount: "50% off",
      },
    ],
  },
};
const shopDetails = {
  "Levi's": {
    name: "Levi's Store Kolkata",
    rating: "4.6",
    address: "15 Park Street, Kolkata 700016",
    distance: "2.1 km",
    deliveryInfo: "25–35 mins · Free delivery above ₹1499",
  },
  "AJIO": {
    name: "AJIO Fashion Hub",
    rating: "4.5",
    address: "52/2 Bidhanpally near Durga Mandir, Kolkata 700122",
    distance: "1.2 km",
    deliveryInfo: "20–30 mins · Free Delivery if you buy 3 or more",
  },
  "H&M": {
    name: "H&M Lifestyle Mall",
    rating: "4.4",
    address: "Acropolis Mall, Kasba, Kolkata 700107",
    distance: "3.5 km",
    deliveryInfo: "30–40 mins · ₹50 delivery below ₹999",
  },
  "Zara": {
    name: "Zara City Center",
    rating: "4.7",
    address: "Quest Mall, Park Circus, Kolkata 700017",
    distance: "4.2 km",
    deliveryInfo: "25–35 mins · Free delivery above ₹1999",
  },
  "Pantaloons": {
    name: "Pantaloons Fashion Point",
    rating: "4.3",
    address: "Gariahat Market, Kolkata 700019",
    distance: "2.8 km",
    deliveryInfo: "20–30 mins · Free delivery on all orders",
  },
  "Calvin Klein": {
    name: "Calvin Klein Select Store",
    rating: "4.8",
    address: "South City Mall, Prince Anwar Shah Rd, Kolkata 700068",
    distance: "5.0 km",
    deliveryInfo: "30–40 mins · Premium delivery ₹100",
  },
  "Louis Vuitton": {
    name: "Louis Vuitton Boutique",
    rating: "4.9",
    address: "Quest Mall, Park Circus, Kolkata 700017",
    distance: "4.2 km",
    deliveryInfo: "35–45 mins · Exclusive delivery ₹200",
  },
  "Allen Solly": {
    name: "Allen Solly Fashion Hub",
    rating: "4.4",
    address: "City Centre 2, Rajarhat, Kolkata 700136",
    distance: "3.8 km",
    deliveryInfo: "25–35 mins · Free Delivery above ₹999",
  },
};




const BrandScreen: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("AJIO");
  const navigation = useNavigation<any>();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const topwearProducts = (brandProducts as any)[selectedBrand]?.topwear ?? [];
  const bottomwearProducts = (brandProducts as any)[selectedBrand]?.bottomwear ?? [];

  const handleBrandPress = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const renderBrandItem = ({ item }: { item: Brand }) => {
    const isSelected = item.name === selectedBrand;

    // Special "All Brands" card
    if (item.name === "All Brands") {
      return (
        <TouchableOpacity onPress={() => navigation.navigate("AllBrandsScreen")}>
          <View style={[styles.allBrandsCard, isSelected && styles.selectedBrand]}>
            <View style={styles.allBrandsLogoRow}>
              <Image source={require("../../../assets/images/AJIOextend.png")} style={styles.miniLogo} />
              <Image source={require("../../../assets/images/LEVISextend.png")} style={styles.miniLogo} />
              <Image source={require("../../../assets/images/hmextend.png")} style={styles.miniLogo} />
              <Image source={require("../../../assets/images/zaraextend.png")} style={styles.miniLogo} />
              <Image source={require("../../../assets/images/Pantaloonsextend.png")} style={styles.miniLogo} />
            </View>
            <View style={[styles.brandFooter, isSelected && styles.brandFooterSelected]}>
           
            <Text style={styles.deliveryText}>All Brands</Text>
          </View>
            <Text style={[styles.allBrandsTitle, isSelected && styles.allBrandsTitleSelected]}>All Brands</Text>
          </View>
        </TouchableOpacity>
      );
    }

    // Default brand card
    return (
      <TouchableOpacity onPress={() => handleBrandPress(item.name)}>
        <View style={[styles.brandCard, isSelected && styles.selectedBrand]}>
          {/* Brand logo */}
          {item.logo ? (
            <Image source={item.logo} style={styles.brandLogo} resizeMode="contain" />
          ) : (
            <View style={styles.brandLogoPlaceholder}>
              <Text style={styles.brandLogoPlaceholderText}>{item.name}</Text>
            </View>
          )}

          {/* Footer with icon + time */}
          <View style={[styles.brandFooter, isSelected && styles.brandFooterSelected]}>
            <Image source={require("../../../assets/icons/time-fast.png")} style={styles.clockIcon} />
            <Text style={styles.deliveryText}>{item.deliveryTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({ item, index }: { item: Product; index: number }) => {
  const isWishlisted = wishlistItems.some((p) => p.id === item.id);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetailsScreen", {
          product: item,
          brandName: selectedBrand,
          category:
            topwearProducts.includes(item) ? "topwear" : "bottomwear",
        })
      }
      activeOpacity={0.8}
    >
      <View style={styles.productCard}>
        <View>
          <Image source={item.image} style={styles.productImage} resizeMode="cover" />

          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}

          <View style={styles.overlayIcons}>
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={() =>
                toggleWishlist({
                  ...item,
                  brandName: selectedBrand,
                  images: [item.image],
                })
              }
            >
              <Ionicons
                name={isWishlisted ? "heart" : "heart-outline"}
                size={18}
                color={isWishlisted ? "red" : "white"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconWrapper, { marginTop: 12 }]}
              onPress={() =>
                addToCart({
                  id: item.id,
                  name: item.title,
                  price: item.price,
                  originalPrice: item.originalPrice,
                  image: item.image,
                  brandName: selectedBrand,
                })
              }
            >
              <Ionicons name="cart-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.productName} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price}</Text>
          {item.originalPrice && <Text style={styles.oldPrice}>{item.originalPrice}</Text>}
          {item.discount && <Text style={styles.discount}>{item.discount}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={styles.brandSelectorContainer}>
          <FlatList data={brandsData} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(i) => i.id} renderItem={renderBrandItem} />
        </View>

        {/* Shop details */}
        {selectedBrand !== "All Brands" && (
          <View style={styles.shopCard}>
            <View style={styles.shopNameRow}>
              <Text style={styles.shopName} numberOfLines={1}>
                {shopDetails[selectedBrand]?.name || `${selectedBrand} Store`}
              </Text>
              <View style={styles.shopRating}>
                <Image source={require("../../../assets/icons/star.png")} style={styles.iconSmall} />
                <Text style={styles.rating}>{shopDetails[selectedBrand]?.rating ?? "4.5"}</Text>
              </View>
            </View>

            <View style={styles.shopInfoRow}>
              <Image source={require("../../../assets/icons/Location-1.png")} style={styles.iconSmall} />
              <Text style={styles.shopAddress}>
                {shopDetails[selectedBrand]?.distance} · {shopDetails[selectedBrand]?.address}
              </Text>
            </View>

            <View style={styles.shopInfoRow}>
              <Image source={require("../../../assets/icons/time-fast.png")} style={styles.iconSmall} />
              <Text style={styles.deliveryInfo}>{shopDetails[selectedBrand]?.deliveryInfo ?? "Delivery info not available"}</Text>
            </View>
          </View>
        )}

        {/* Topwear */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Topwear</Text>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => navigation.navigate("ProductListingScreen", { brandName: selectedBrand, category: "topwear" })}
            >
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <FlatList data={topwearProducts} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(i) => i.id} renderItem={renderProductItem} />
        </View>

        {/* Bottomwear */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bottomwear</Text>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => navigation.navigate("ProductListingScreen", { brandName: selectedBrand, category: "bottomwear" })}
            >
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <FlatList data={bottomwearProducts} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(i) => i.id} renderItem={renderProductItem} />
        </View>
      </ScrollView>

      {/* Floating category button */}
      <TouchableOpacity
        style={styles.floatingCategoryBtn}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("CategoryScreen", { brandName: selectedBrand })}
      >
       <View style={styles.categoryContent}>
  <Image
    source={require("../../../assets/icons/Category Active-1.png")}
    style={styles.categoryIcon}
  />
  <Text style={styles.categoryText}>CATEGORY</Text>
</View>

      </TouchableOpacity>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  brandSelectorContainer: ViewStyle;
  brandCard: ViewStyle;
  selectedBrand: ViewStyle;
  brandLogo: ImageStyle;
  brandLogoPlaceholder: ViewStyle;
  brandLogoPlaceholderText: TextStyle;
  brandFooter: ViewStyle;
  brandFooterSelected: ViewStyle;
  clockIcon: ImageStyle;
  deliveryText: TextStyle;
  allBrandsCard: ViewStyle;
  allBrandsLogoRow: ViewStyle;
  miniLogo: ImageStyle;
  allBrandsTitle: TextStyle;
  allBrandsTitleSelected: TextStyle;
  shopCard: ViewStyle;
  shopNameRow: ViewStyle;
  shopRating: ViewStyle;
  shopName: TextStyle;
  shopInfoRow: ViewStyle;
  iconSmall: ImageStyle;
  rating: TextStyle;
  shopAddress: TextStyle;
  deliveryInfo: TextStyle;
  sectionContainer: ViewStyle;
  sectionHeader: ViewStyle;
  sectionTitle: TextStyle;
  viewAllBtn: ViewStyle;
  viewAllText: TextStyle;
  productCard: ViewStyle;
  productImage: ImageStyle;
  badge: ViewStyle;
  badgeText: TextStyle;
  overlayIcons: ViewStyle;
  iconWrapper: ViewStyle;
  productName: TextStyle;
  priceRow: ViewStyle;
  price: TextStyle;
  oldPrice: TextStyle;
  discount: TextStyle;
  floatingCategoryBtn: ViewStyle;
  categoryText: TextStyle;
  imageContainer: ViewStyle;
  image: ImageStyle;
  heartIconContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  brandSelectorContainer: { paddingVertical: 10 ,marginTop:35, },

 brandCard: {
  width: 110,
  height: 120,
  backgroundColor: "#ffffff",
  borderRadius: 12,
  borderWidth: 1.4,
  borderColor: "#f5d9c9",
  marginRight: 12,
  overflow: "hidden",
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  justifyContent: "center",
  alignItems: "center",
},

  selectedBrand: {
  borderColor: "#ff7a00",
  borderWidth: 2,
},

brandLogo: {
  width: 70,
  height: 40,
  resizeMode: "contain",
  marginTop: 28,
  
},

  brandLogoPlaceholder: {
    width: 70,
    height: 20,
    borderRadius: 6,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  brandLogoPlaceholderText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },

 brandFooter: {
  width: 120,
  backgroundColor: "#fce8dc",   // peach footer
  paddingVertical: 6,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop:28,
  columnGap: 4,
},

brandFooterSelected: {
  backgroundColor: "#ff7a00",   // orange footer
},

clockIcon: {
  width: 16,
  height: 16,
  tintColor: "#000",  // matches screenshot
},

deliveryText: {
  fontSize: 12,
  color: "#000",
  fontWeight: "500",
},

  allBrandsCard: {
    width: 110,
  height: 120,
  backgroundColor: "#ffffff",
  borderRadius: 12,
  borderWidth: 1.4,
  borderColor: "#f5d9c9",
  marginRight: 12,
  overflow: "hidden",
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  justifyContent: "center",
  alignItems: "center",
  marginLeft:20,
  
  },

  allBrandsLogoRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
   marginTop:58,
   
  },

  miniLogo: {
    width: 30,
    height: 32,
    resizeMode: "contain",
    marginHorizontal: 2,
    
  },

  allBrandsTitle: {
    width: 120,
  backgroundColor: "#fce8dc",   // peach footer
  paddingVertical: 6,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom:20,
  marginLeft:5,
  columnGap: 4,
  },

  allBrandsTitleSelected: {
    backgroundColor: "#fecf8aff",
   
  
    color: "#fff",
  },

  shopCard: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },

  shopNameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },

  shopRating: { flexDirection: "row", alignItems: "center" },

  shopName: { fontSize: 18, fontWeight: "700", marginBottom: 6 },

  shopInfoRow: { flexDirection: "row", alignItems: "center", marginVertical: 2 },

  iconSmall: { width: 14, height: 14 },

  rating: { marginLeft: 6, fontSize: 14, color: "#666" },

  shopAddress: { marginLeft: 6, fontSize: 12, color: "#666", flex: 1, flexWrap: "wrap" },

  deliveryInfo: { marginLeft: 6, fontSize: 12, color: "#666", flex: 1, flexWrap: "wrap" },

  sectionContainer: { marginVertical: 10 },

  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 12, marginBottom: 6 },

  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#555" },

  viewAllBtn: {},

  viewAllText: { color: "orange", fontSize: 12 },

  productCard: {
    width: 170,
    height: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 6 },
    paddingBottom: 6,
    marginTop: 8,
  },

  productImage: {
    width: "100%",
    height: 210,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "pink",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  badgeText: { fontSize: 10, color: "#fff" },

  overlayIcons: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "column",
    alignItems: "flex-end",
  },

  iconWrapper: {
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 8,
    padding: 6,
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    marginHorizontal: 10,
  },

  priceRow: { flexDirection: "row", alignItems: "center", marginHorizontal: 8, marginTop: 2 },

  price: { fontWeight: "700", color: "#000", fontSize: 14 },

  oldPrice: { marginLeft: 8, color: "#999", textDecorationLine: "line-through", fontSize: 12 },

  discount: { marginLeft: 8, color: "green", fontSize: 12, fontWeight: "600" },

  floatingCategoryBtn: {
    position: "absolute",
    top:750,
    right: 20,
    backgroundColor: "#fffffeff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 22,
    elevation: 8,
    zIndex: 999,
  },

  categoryContent: {
  flexDirection: "row",
  alignItems: "center",
},

categoryIcon: {
  width: 16,
  height: 18,
  marginRight: 6,
  tintColor: "#f9894eff", // optional: matches text color
},



  categoryText: {
    color: "#f9894eff",
    fontWeight: "500",
    fontSize: 14,
  },

  imageContainer: { position: "relative" },

  image: { width: "100%", height: 150 },

  heartIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 6,
  },
});

export default BrandScreen;