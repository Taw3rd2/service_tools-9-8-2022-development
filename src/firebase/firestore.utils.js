import { useState, useEffect } from "react";

import { initializeApp } from "firebase/app"
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth"
import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    getFirestore, 
    onSnapshot, 
    setDoc, 
    updateDoc 
} from "firebase/firestore";


//configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};
const app = initializeApp(firebaseConfig)
const auth = getAuth()

export const googleAuth = getAuth(app)

//Authorization
export default app

export const logOut = async () => {
    try {
        await signOut(auth).then(() => {
            console.log("Signed Out");
        });
    } catch (error) {
        console.log("sign out error: ", error);
    }
}

export const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const useAuth = () => {
    const [ currentUser, setCurrentUser ] = useState()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsubscribe()
    }, [])
    return currentUser
}

//Firestore
export const createNamedDocument = async (documentReference, payload) => {
    await setDoc(documentReference, payload)
}
export const createUnNamedDocument = async (collectionReference, payload) => {
    await addDoc(collectionReference, payload)
}
export const updateDocument = async (documentReference, payload) => {
    await updateDoc(documentReference, payload)
}
export const deleteDocument = async (documentReference) => {
    await deleteDoc(documentReference)
}

//get

//sync
export const useSyncedCollection = (collection1) => {
    const db = getFirestore()

    const [syncedCollection, setSyncedCollection] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, collection1),
            (snapshot) => {
                setSyncedCollection(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                )
            },
            (error) => {
                console.log(error.message)
            }
        )
        return () => unsubscribe()
    }, [db, collection1])
    return syncedCollection
}

export const useSyncedNestedCollection = (collection1, id, collection2) => {
    const db = getFirestore()

    const [nestedCollection, setNestedCollection] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, collection1, id, collection2),
            (snapshot) => {
                setNestedCollection(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                )
            },
            (error) => {
                console.log(error.message)
            }
        )
        return () => unsubscribe()
    }, [db, collection1, id, collection2])
    return nestedCollection
}

export const useSyncedDocument = (collection, id) => {
    const db = getFirestore()

    const [document, setDocument] = useState({})

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, collection, id),
            (doc) => {
                setDocument({ ...doc.data(), id: doc.id })
            },
            (error) => {
                console.log(error.message)
            }
        )
        return () => unsubscribe()
    }, [db, collection, id])
    return document
}

export const useSyncedNestedDocument = (collection1, id1, collection2, id2) => {
    const db = getFirestore()

    const [document, setDocument] = useState({})

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, collection1, id1, collection2, id2),
            (doc) => {
                setDocument({ ...doc.data(), id: doc.id })
            },
            (error) => {
                console.log(error)
            }
        )
        return () => unsubscribe()
    }, [db, collection1, id1, collection2, id2])
    return document
}