import { defineComponent, ref } from "vue";
import { user } from "@/components/auth/comStore";
import useFirestore from "../index";
export default defineComponent({
  setup() {
    const uid = ref(user.value!.uid);

    const { data, loading, deleteDoc, updateDoc } = useFirestore({
      queryType: "doc",
      type: "watch",
      path: "attendanceUsers/$uid",
      variables: {
        uid,
      },
    });

    return { data, loading, deleteDoc, updateDoc };
  },
});
