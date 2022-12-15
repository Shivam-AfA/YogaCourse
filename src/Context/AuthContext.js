import React, { useState, useEffect } from "react";
import { auth } from "../firebase.mjs";
export const AuthContext = React.createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    let signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    let login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    let logout  = () => {
        console.log("logout called");
        return auth.signOut();
    }

    //useEffect --> only component did mount (empty array passed)
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })

        return () => unsub();
    }, [])

    const store = {
        user,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={store}>
            {/* This means that if loading is false then show the
            children (or components) enclosed in the AuthProvider
            tag in App.js*/}
            {!loading && children}

        </AuthContext.Provider>
    )

}