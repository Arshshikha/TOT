import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Address = {
  id: string;
  title: string;
  fullAddress: string;
  distance?: string;
  phone?: string;
};

type AddressContextType = {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Address) => void;
  selectAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  updateAddress: (updatedAddress: Address) => void; // added here
};

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // 🟢 Load saved addresses & selected address from AsyncStorage on app start
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("savedAddresses");
      if (saved) setAddresses(JSON.parse(saved));

      const savedSelected = await AsyncStorage.getItem("selectedAddress");
      if (savedSelected) setSelectedAddress(JSON.parse(savedSelected));
    })();
  }, []);

  const saveToStorage = async (data: Address[]) => {
    await AsyncStorage.setItem("savedAddresses", JSON.stringify(data));
  };

  const addAddress = async (address: Address) => {
    const updated = [...addresses, address];
    setAddresses(updated);
    await saveToStorage(updated);
  };

  const selectAddress = async (address: Address) => {
    setSelectedAddress(address);
    await AsyncStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  const deleteAddress = async (id: string) => {
    const updated = addresses.filter((item) => item.id !== id);
    setAddresses(updated);
    await saveToStorage(updated);
  };

  // 🔥 UPDATE EXISTING ADDRESS
  const updateAddress = async (updatedAddress: Address) => {
    const updatedList = addresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr
    );

    setAddresses(updatedList);
    await AsyncStorage.setItem("savedAddresses", JSON.stringify(updatedList));

    // also update selected address if same
    if (selectedAddress?.id === updatedAddress.id) {
      setSelectedAddress(updatedAddress);
      await AsyncStorage.setItem("selectedAddress", JSON.stringify(updatedAddress));
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        addAddress,
        selectAddress,
        deleteAddress,
        updateAddress, // 🔥 make sure it's here
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) throw new Error("useAddress must be used inside AddressProvider");
  return context;
};
