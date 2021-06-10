import { db } from "@/firebaseDatabase";
import { ref } from "vue";

export const userColection = db.collection("attendanceUsers");
export const workplaceList = ref<any | null>(null);
const docRef = db.collection("workplaceList");
const getWorkplaces = docRef
  .get()
  .then((querySnapshot) => {
    const list: string[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      list.push(doc.data()["Value"]);
    });
    workplaceList.value = list;
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

// async function getData() {
//   await db
//     .collection("workplaceList")
//     .get()
//     .then((querySnapshot) => {
//       const data = querySnapshot.docs.map((doc) => doc.data());
//       return data;

//       // do something with documents
//     });
// }
console.log(workplaceList);

// console.log(workplaceList.value);
