import { ref, watch } from "@vue/composition-api";

export default (key) => {
  let init = localStorage.getItem(key);

  const variable = ref(init ? JSON.parse(init) : undefined);

  watch(
    () => variable.value,
    (to) => {
      localStorage.setItem(key, JSON.stringify(to));
    },
    { deep: true }
  );

  return variable;
};
