import React, { createContext, useContext, useEffect, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      let newAddedData = [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          size: action.size,
          quantity: action.qty,
        },
      ];

      return newAddedData;

    case "REMOVE":
      let newData = [...state];

      newData.splice(action.index, 1);

      return newData;

    case "UPDATE":
      let newArr = [...state];

      newArr = newArr.map((food) => {
        if (food.id === action.id) {
          return {
            ...food,
            quantity: parseInt(food.quantity) + parseInt(action.qty),
            price: food.price + action.price,
          };
        }

        return food;
      });

      return newArr;

    case "DROP":
      let dropArr = [];

      return dropArr;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("cartItems"));

  const [state, dispatch] = useReducer(reducer, initialState || []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state));
  }, [state]);

  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
