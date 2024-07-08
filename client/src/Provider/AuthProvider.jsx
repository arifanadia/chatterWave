import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const updateUserProfile = (name,) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        }
        )
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            // if (currentUser) {
            //     const userInfo = { email: currentUser.email }
            //     await axiosPublic.post('/users/login', userInfo)
            //         .then(res => {
            //             if (res.data.token) {
            //                 localStorage.setItem('access-token', res.data.token)
            //             }
            //         })
            //     // await saveUser(currentUser)
            // }
            // else {
            //     localStorage.removeItem('access-token')
            // }
            setLoading(false)
        })

        return () => {
            return unSubscribe();
        }
    }, [axiosPublic])



    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        login,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;