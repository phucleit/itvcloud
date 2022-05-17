import React from "react";
import axios from "axios";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  const userLogin = {
    username: login,
    password: password
  };

  axios.post('http://103.57.222.114:10000/api/user/login', userLogin)
  .then(res => {  
    if (res.status === 200) {
      setTimeout(() => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_info', JSON.stringify(res.data.hoten));
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS' })

        history.push('/app/dashboard')
      }, 500);
    }
  }).catch((error) => {
    if (error.response.status === 401) {
      alert('Username hoặc password không đúng. Vui lòng nhập lại!');
      history.push('/');
    }
  });
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  localStorage.removeItem("user_info");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
