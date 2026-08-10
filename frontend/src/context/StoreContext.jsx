import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <StoreContext.Provider
      value={{
        cartCount,
        setCartCount,
        wishlistCount,
        setWishlistCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};