import { createContext, useContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_NOTIF":
      return action.payload;
    case "REMOVE_NOTIF":
      if (state && action.payload.id === state.id) {
        return null;
      } else {
        return state;
      }
    default:
      return state;
  }
};
const NotificationContext = createContext();

let nextNotificationId = 0;
export const createNotification = (message) => {
  const notifId = nextNotificationId;
  nextNotificationId += 1;
  return {
    type: "CREATE_NOTIF",
    payload: { id: notifId, message },
  };
};

const removeNotification = (id) => {
  return {
    type: "REMOVE_NOTIF",
    payload: { id },
  };
};

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null);
  const dispatchThunk = (action) => {
    dispatch(action);
    if (action.type == "CREATE_NOTIF") {
      setTimeout(() => {
        dispatch(removeNotification(action.payload.id));
      }, 5000);
    }
  };

  return (
    <NotificationContext.Provider value={[state, dispatchThunk]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationMessage = () => {
  const [state] = useContext(NotificationContext);
  return state?.message;
};

export const useNotificationDispatch = () => {
  const [_state, dispatch] = useContext(NotificationContext);
  return dispatch;
};

export default NotificationContext;
