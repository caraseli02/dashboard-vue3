import { ref } from "vue";

export const showSidebar = ref<boolean>(false);

export async function toggleSidebar(): Promise<void> {
  showSidebar.value = !showSidebar.value;
}
