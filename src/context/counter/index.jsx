import React, { createContext, useContext, useReducer } from "react";

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        [action.payload]: state[action.payload] ? state[action.payload] + 1 : 1,
      };
    case "DECREMENT":
      return {
        ...state,
        [action.payload]: state[action.payload] ? state[action.payload] - 1 : 0,
      };
    default:
      return state;
  }
};

const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
