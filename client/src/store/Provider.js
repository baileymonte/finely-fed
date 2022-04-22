import React, { useReducer } from 'react';
import { GlobalContext } from './Context';

const initialState = {
  categories: ["All", "travel", "living", "recipes", "health & wellness"],
  pages: {
    data: [],
    meta: {}
  },
  mediaURLs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update_pages":
      return {
        ...state,
        pages: action.data
      };
    
    case "get_instagram_images":
        return {
          ...state,
          mediaURLs: action.mediaURLs
        }

    default:
      throw new Error("Wrong action type got dispatched");
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider value={[state, dispatch]}>{children}</GlobalContext.Provider>;
};

export { Provider };
