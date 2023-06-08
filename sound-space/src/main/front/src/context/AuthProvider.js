import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// import { createContext, useState } from "react";
// const AuthContext = createContext({});

// const AuthProvider = ({ children }) => {
//   const [userInfo, setUserInfo] = useState({});

//   const updateUserInfo = (username, password) => {
//     setUserInfo({ username, password });
//   };

//   return (
//     <AuthContext.Provider value={{ userInfo, updateUserInfo }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
