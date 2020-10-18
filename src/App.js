import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import ChatComponent from './ChatComponent';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';



function App() {

  const user = useSelector(selectedUser);
  const dispatch = useDispatch();


  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(`The user in App is ${authUser.displayName}`)
        // the user is logged in 
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        )

      }
      else {
        dispatch(logout());

      }
    })

  }, [dispatch])


  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          {/* Siderbar */}
          {/* Chat component */}
          <ChatComponent />
        </>
      ) : (<Login />)}
    </div>
  );
}

export default App;
