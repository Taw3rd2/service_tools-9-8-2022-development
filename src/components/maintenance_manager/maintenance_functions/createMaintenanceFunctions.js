import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  createUnNamedDocument,
  updateDocument,
} from "../../../firebase/firestore.utils";
import {
  getFormattedDate,
  getFormattedYear,
} from "../../../utilities/dateUtils";

export const getListOfMaintenance = async (custId) => {
  const db = getFirestore();
  const maintQuery = query(
    collection(db, "maintenance"),
    where("customerId", "==", custId)
  );

  const maintSnapshot = await getDocs(maintQuery);

  return maintSnapshot.docs.map((maint) => ({ ...maint.data(), id: maint.id }));
};

export const getExpirationDates = (saleDate, numberOfVisits) => {
  return new Date(
    saleDate.setFullYear(saleDate.getFullYear() + numberOfVisits)
  );
};

export const buildArray = (equipment, maintenanceValues, selectedEquipment) => {
  const arrayOfUnits = [];
  return new Promise((resolve, reject) => {
    let i = maintenanceValues.numberOfYears;
    while (i > 0) {
      let j = maintenanceValues.numberOfVisits;
      const iteratedExpirationDate = new Date(maintenanceValues.saleDate);
      iteratedExpirationDate.setFullYear(
        iteratedExpirationDate.getFullYear() + i
      );
      const mNumberYearExtension = getFormattedYear(iteratedExpirationDate);
      while (j > 0) {
        const iterator = j;
        Object.keys(selectedEquipment).forEach((item) => {
          let unitValues = {
            completedDate: equipment[item].completedDate
              ? equipment[item].completedDate
              : null,
            equipment: equipment[item].equipmentName,
            equipmentName: equipment[item].equipmentName,
            equipmentBrand: equipment[item].equipmentBrand,
            equipmentModel: equipment[item].equipmentModel,
            equipmentSerial: equipment[item].equipmentSerial,
            expirationDate: iteratedExpirationDate,
            id: `${equipment[item].equipmentSerial}${maintenanceValues.mNumber}${mNumberYearExtension}`,
            mNumber:
              maintenanceValues.numberOfYears > 1 &&
              maintenanceValues.numberOfVisits <= 1
                ? `${maintenanceValues.mNumber}-${mNumberYearExtension}`
                : maintenanceValues.numberOfYears > 1 &&
                  maintenanceValues.numberOfVisits > 1
                ? `${maintenanceValues.mNumber}-${mNumberYearExtension}-${iterator}`
                : maintenanceValues.numberOfYears <= 1 &&
                  maintenanceValues.numberOfVisits > 1
                ? `${maintenanceValues.mNumber}-${iterator}`
                : maintenanceValues.mNumber,
          };
          arrayOfUnits.push(unitValues);
        });
        j--;
      }
      i--;
    }
    resolve(arrayOfUnits);
  });
};

export const updateEquipmentMaintenanceDate = (
  customer,
  equipment,
  maintenanceValues,
  selectedEquipment
) => {
  const db = getFirestore();
  const finalExpirationDate = new Date(maintenanceValues.saleDate);
  finalExpirationDate.setFullYear(
    finalExpirationDate.getFullYear() + maintenanceValues.numberOfYears
  );
  const firstUpdate = {
    equipmentContract: getFormattedDate(finalExpirationDate),
  };
  return new Promise((resolve, reject) => {
    Object.keys(selectedEquipment).forEach((item) => {
      updateDocument(
        doc(
          db,
          "customers",
          customer.id,
          "Equipment",
          `${equipment[item].equipmentName}`
        ),
        firstUpdate
      )
        .then(() => {
          console.log("Android part set");
          resolve();
        })
        .catch((error) => {
          reject();
          console.log("firebase error", error);
        });
    });
  });
};

export const updateExistingMaintenanceEquipment = async (
  id,
  activateFailureNotification,
  activateSuccessNotification,
  closeModal,
  customer,
  equipment,
  maintenanceValues,
  selectedEquipment
) => {
  const arrayOfUnits = await buildArray(
    equipment,
    maintenanceValues,
    selectedEquipment
  );

  await updateEquipmentMaintenanceDate(
    customer,
    equipment,
    maintenanceValues,
    selectedEquipment
  );
  const db = getFirestore();
  const maintenanceReference = doc(db, "maintenance", id);
  await updateDoc(maintenanceReference, {
    equipment: arrayUnion(arrayOfUnits[0]),
  })
    .then(() => {
      activateSuccessNotification();
      closeModal();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log("firebase error", error);
    });
};

export const buildNewMaintenance = async (
  activateFailureNotification,
  activateSuccessNotification,
  closeModal,
  customer,
  equipment,
  maintenanceValues,
  selectedEquipment
) => {
  const arrayOfUnits = await buildArray(
    equipment,
    maintenanceValues,
    selectedEquipment
  );

  await updateEquipmentMaintenanceDate(
    customer,
    equipment,
    maintenanceValues,
    selectedEquipment
  );
  const maintenanceObject = {
    customerAddress: `${customer.street} ${customer.city},${customer.state} ${customer.zip}`,
    customerId: `${customer.id}`,
    customerName: `${customer.lastname} ${customer.firstname}`,
    customerPhone: `${customer.phone}`,
    equipment: arrayOfUnits,
    mNumber: `${maintenanceValues.mNumber}`,
    numberOfVisits: maintenanceValues.numberOfVisits,
    numberOfYears: maintenanceValues.numberOfYears,
    saleDate: maintenanceValues.saleDate,
    salePrice: maintenanceValues.salePrice,
  };
  const db = getFirestore();
  await createUnNamedDocument(collection(db, "maintenance"), maintenanceObject)
    .then(() => {
      activateSuccessNotification();
      closeModal();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log("firebase error", error);
    });
};

export const addMaintenance = async (
  activateSuccessNotification,
  activateFailureNotification,
  closeModal,
  customer,
  equipment,
  maintenanceValues,
  selectedEquipment
) => {
  await getListOfMaintenance(customer.id)
    .then((data) => {
      if (data.length > 0) {
        console.log("We have an existing M customer");
        updateExistingMaintenanceEquipment(
          data[0].id,
          activateFailureNotification,
          activateSuccessNotification,
          closeModal,
          customer,
          equipment,
          maintenanceValues,
          selectedEquipment
        );
        return;
      }
      console.log("There is no existing contract for this customer");
      buildNewMaintenance(
        activateFailureNotification,
        activateSuccessNotification,
        closeModal,
        customer,
        equipment,
        maintenanceValues,
        selectedEquipment
      );
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};
