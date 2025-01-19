import React, { createContext, useReducer, useContext } from "react";

// Initial state object
const initialState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  isCraProductsExclusively: false,
  isUserTokenFlow: false,
  linkToken: "", // Don't set to null or error message will show up briefly when site loads
  userToken: null,
  accessToken: null,
  itemId: null,
  isError: false,
  backend: true,
  products: ["transactions"],
  linkTokenError: {
    error_type: "",
    error_code: "",
    error_message: "",
  },
};

// Action type
const SET_STATE = "SET_STATE";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.state };
    default:
      return state;
  }
};

// Create context
const Context = createContext(initialState);

// Provider component
export const QuickstartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

// Custom hook to use context
export const useQuickstartContext = () => {
  return useContext(Context);
};

export default Context;
