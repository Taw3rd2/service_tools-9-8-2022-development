import { deleteField, doc, getFirestore } from "firebase/firestore"
import { updateDocument } from "../../firebase/firestore.utils"
import { getFormattedDate } from "../../utilities/dateUtils"

export const addWarranty = (
    customer,
    selectedEquipment,
    warrantyValues,
    equipment,
    closeBasicModal
) => {
    const db = getFirestore()
    if(selectedEquipment === undefined || selectedEquipment.length === 0) {
        alert("No Equipment Selected..")
    } else {
        Object.keys(selectedEquipment).forEach((item) => {
            const newWarr = {
                key: equipment[item].equipmentName,
                equipmentWarranty: getFormattedDate(warrantyValues.partsExpirationDate),
                laborWarranty: getFormattedDate(warrantyValues.laborExpirationDate),
                warranty: {
                    key: equipment[item].equipmentName,
                    jobNumber: warrantyValues.jobNumber,
                    startDate: warrantyValues.startDate,
                    partsExpirationDate: warrantyValues.partsExpirationDate,
                    laborExpirationDate: warrantyValues.laborExpirationDate,
                    equipment: equipment[item].equipmentName,
                    equipmentName: equipment[item].equipmentName,
                    equipmentBrand: equipment[item].equipmentBrand,
                    equipmentModel: equipment[item].equipmentModel,
                    equipmentSerial: equipment[item].equipmentSerial,
                }
            }
            updateDocument(
                doc(
                    db,
                    "customers",
                    customer.id,
                    "Equipment",
                    equipment[item].equipmentName
                ),
                newWarr
            ).then(() => {
                closeBasicModal()
            }).catch((error) => {
                console.log("Firebase Error: ", error)
            })
        })
    }
}

export const updateWarranty = (
    customer,
    warrantyValues,
    closeModal
) => {
    const db = getFirestore()
    console.log("updatedWarranty: ", warrantyValues)
    updateDocument(
        doc(
            db,
            "customers",
            customer.id,
            "Equipment",
            warrantyValues.key
        ),
        warrantyValues
    ).then(() => {
        closeModal()
    }).catch((error) => {console.log("Firebase error: ", error)})
}

export const deleteWarranty = (
    customer,
    selectedWarranty,
    closeDetails,
    closeDelete
) => {
    console.log("selectedWarranty", selectedWarranty)
    const db = getFirestore()

    updateDocument(
        doc(
            db,
            "customers",
            customer.id,
            "Equipment",
            selectedWarranty.equipmentName
        ),
        { equipmentWarranty: "", laborWarranty: "", warranty: deleteField() }
    ).then(() => {
        console.log("Removed String Representations, and Objects")
        closeDelete()
        closeDetails()
    })
}