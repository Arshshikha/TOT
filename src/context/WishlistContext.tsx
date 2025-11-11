import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: string;
  name?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  images?: any[];
  sizes?: string[];
   image: any; 
  description?: string;
  rating?: number;
  reviews?: any[];
  similarProducts?: any[];
  address?: string;
  brandName?: string; // ✅ only declare, no assignment
  brandLogo?: any;    // ✅ only declare, no assignment
  brand?: string;

}

interface WishlistContextType {
  wishlistItems: Product[];
  toggleWishlist: (item: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// ✅ Case-insensitive brand logo resolver
const getBrandLogo = (brandName?: string) => {
  if (!brandName) return require("../../assets/images/AJIOextend.png");

  const cleanName = brandName.trim().toLowerCase();

  switch (cleanName) {
    case "Levis":
      return require("../../assets/images/LEVISextend.png");
    case "h&m":
    case "hm":
      return require("../../assets/images/hmextend.png");
    case "ajio":
      return require("../../assets/images/AJIOextend.png");
    case "calvin klein":
    case "ck":
      return require("../../assets/images/celvinextend.png");
    case "pantaloons":
      return require("../../assets/images/Pantaloonsextend.png");
    case "louis vuitton":
    case "lv":
      return require("../../assets/images/LVextend.png");
    case "allen solly":
    case "allen":
      return require("../../assets/images/allenextend.png");
    case "zara":
      return require("../../assets/images/zaraextend.png");
    default:
      return require("../../assets/images/AJIOextend.png");
  }
};


export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const toggleWishlist = (item: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);

      if (exists) {
        // ✅ Remove if exists
        return prev.filter((p) => p.id !== item.id);
      } else {
        // ✅ Add product with full info
        const fullItem: Product = {
          id: item.id,
          name: item.name || "Unnamed Product",
          price: item.price || "N/A",
          originalPrice: item.originalPrice || "",
          discount: item.discount || "",
          images: item.images || [item.image],
          sizes: item.sizes || [],
          brandName: item.brandName || item.brand || "Unknown",

brandLogo: item.brandLogo || getBrandLogo(item.brandName),
 // ✅ correct place!
          image: item.image,
          description: item.description || "No description available",
          rating: item.rating ?? 0,
          reviews: item.reviews || [],
          similarProducts: item.similarProducts || [],
          address: item.address || "",
        };

        return [...prev, fullItem];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
