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
    getDocs, 
    getFirestore, 
    onSnapshot, 
    query, 
    setDoc, 
    updateDoc
} from "firebase/firestore";
import { getStorage } from 'firebase/storage'


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

//Authorization
export const auth = getAuth(app)
export const googleAuth = getAuth(app)
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

//edit part
const projectStorage = getStorage(app)
export { projectStorage }
const firestore = getFirestore(app)
export { firestore }

//change a field in all documents in a given collection
export const changeFieldInAllDocuments = async (col, field) => {
    let count = 0
    const db = getFirestore();
    const q = query(collection(db, `${col}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        count += 1
      updateDoc(doc.ref, {
        [field]: [],
      })
        .then(() => {
          console.log(`${field} updated successfully`);
          console.log(`number of docs updated: `, count)
        })
        .catch((error) => {
          count += 1  
          console.log(`number of docs failed: `, count)
          console.error("Error updating the docs", error);
        });
    });
  };

  export const checkForMaint = async (docId) => {
    const db = getFirestore()
    const q = query(collection(db, "customers", docId, "Maintenance"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docu) => {
        console.log("maintenance found: ", docu.id)
        //delete all maintnenance
        deleteDoc(doc(db, "customers", docId, "Maintenance", docu.id)).then(() => {
            console.log("deleted")
        })
    })
  }
  

  export const deleteMaintenance = async () => {
    const db = getFirestore()
    const q = query(collection(db, "customers"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        checkForMaint(doc.id)
    })
  }


//   export const deleteQueryBatch = async (db, q, resolve) => {
//     const snapshot = await getDocs(q)

//     const batchSize = await getCountFromServer(q)
//     console.log("Batch Size: ", batchSize.data().count)

//     if(batchSize.data().count === 0) {
//         resolve()
//         return
//     }

//     //delete all documents in a batch
//     const batch = writeBatch(db)
//     snapshot.forEach((doc) => {
//         batch.delete(doc.ref)
//     })
//     await batch.commit()

//     //recurse on the next preccess tick to avoid blowing the stack
//     // process.nextTick(() => {
//     //     deleteQueryBatch(db, q, resolve)
//     // })
//   }

//   export const deleteCollection = async (collectionPath) => {
//     const db = getFirestore()
//     const collectionRef = collection(db, collectionPath)
//     const q = query(collectionRef, orderBy(`__name__`), limit(500))

//     return new Promise((resolve, reject) => {
//         deleteQueryBatch(db, q, resolve).catch(reject)
//     })
//   }
  
