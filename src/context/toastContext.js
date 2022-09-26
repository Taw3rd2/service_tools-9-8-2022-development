import React, { createContext, useReducer } from "react";

export const ToastContext = createContext();

export const ToastContextProvider = (props) => {
  const notifications = [];

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, action.payload];
      case "DELETE_NOTIFICATION":
        return state.filter(
          (notification) => notification.id !== action.payload
        );
      default:
        return state;
    }
  }, notifications);

  //   dispatch({ type: "ADD_NOTIFICATION", payload: { id, type, title, message } });
  //   dispatch({ type: "DELETE_NOTIFICATION", payload: { id } });

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ToastContext.Provider>
  );
};
