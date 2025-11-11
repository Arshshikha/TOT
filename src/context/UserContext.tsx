import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ImageSourcePropType } from "react-native";

// ✅ Define user data type
interface User {
  name: string;
  phone: string;
  profileImage: ImageSourcePropType;
   image?: string | any;
   
}

// ✅ Define context structure
interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  login: (userData: User) => void; // ✅ added login
  logout: () => void;
}

// ✅ Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: "Leena",
    phone: "+00 9874561230",
    profileImage: require("../../assets/images/profile.png"),
  });

  // ✅ Login function
  const login = (userData: User) => {
    setUser(userData);
  };

  // ✅ Logout function resets user data
  const logout = () => {
    setUser({
      name: "",
      phone: "",
      profileImage: require("../../assets/images/profile.png"),
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
