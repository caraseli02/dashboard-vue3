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

console.log(workplaceList);
