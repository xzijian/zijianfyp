import { createContext, useReducer } from "react";

interface IContextProps {
  state: any;
  dispatch: ({ type }: { type: string }) => void;
}

export const GroupsContext = createContext({} as IContextProps);

export const groupsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_GROUP":
      return {
        groups: action.payload,
      };
    case "CREATE_GROUP":
      return {
        groups: [action.payload, ...state.groups],
      };
    case "DELETE_GROUP":
      return state;
    case "SET_MESSAGES":
      return {
        messages: action.payload,
      };
    case "ADD_MESSAGE":
      return {
        messages: [action.payload, ...state.messages],
      };
    case "ADD_MEMBER":
      return {
        members: [action.payload, ...state.members],
      };
    default:
      return state;
  }
};

export const GroupsContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(groupsReducer, {
    groups: null,
    messages: null,
    members: null,
  });

  return (
    <GroupsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GroupsContext.Provider>
  );
};
