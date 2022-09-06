import { doc, getFirestore } from "firebase/firestore"
import { deleteDocument } from "../../../firebase/firestore.utils"

export const deletePartsQuote = (
    customer,
    partsQuote,
    closeDeleteModals,
) => {
    const db = getFirestore()

    deleteDocument(
        doc(
            db,
            "customers",
            customer.id,
            "partsQuotes",
            partsQuote.id
        )
    ).then(() => {
        console.log("Quote Deleted")
        closeDeleteModals()
    })
}