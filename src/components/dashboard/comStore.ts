import { ref, reactive, inject } from "vue";
import { user } from "@/components/auth/comStore";

interface MonthLimits {
  end: number;
  start: number;
  year: string;
}

interface AttendList {
  data: Attend[];
}

interface UserData {
  value: any;
  author: string;
  dni: string;
  eatHour: boolean;
  email: string;
  name: string;
  surname: string;
  workplace: never[];
}

interface Attend {
  activeSession: boolean;
  author: string;
  closedAt: unknown;
  createdAt: unknown;
  curentTime: number;
  data: attendData;
  delete_flag: string;
  id: string;
  updatedAt: unknown;
}

interface attendData {
  adminChange: unknown;
  email: string;
  enterTime: string;
  gpsData: any;
  gpsLoc: unknown;
  gpsLocLeave: unknown;
  leaveTime: string;
  temperature: string;
  uid: string;
  msg?: string;
}
interface UsersList {
  data: UserData[];
}

export const days = ref([
  "dom",
  "lun",
  "mar",
  "mié",
  "jue",
  "vie",
  "sáb",
  "dom",
]);
export const showMonthAttends = ref(true);
export const filtredAttendsDay = ref<number | null>(null);
export const uid = ref<string | null>(user.value!.uid);
export const selectedMes = ref<number>(new Date().getMonth() + 1);
export const selectedWorkplace = ref<string | string[]>("");
// Set inicial time object
export const time: MonthLimits = reactive({ year: "", start: 0, end: 0 });
export const setTimeLimits = (value: any) => {
  // GET CURRENT Date
  const getDate = new Date();
  //GET CURRENT Year
  time["year"] = getDate.getFullYear().toString();
  // Create date variab that return time in milliseconds
  const setDate = (addMonth = false): number => {
    let month = null;
    if (addMonth && value !== 12) value++;
    if (value > 0 && value < 10) {
      month = `0${value}`;
    } else {
      month = `${value}`;
    }
    const resultInMiliseconds = new Date(
      `${time["year"]}-${month}-01T00:00:00.000+01:00`
    ).getTime();
    if (addMonth && value === 12) {
      return resultInMiliseconds + 2.678e9;
    }
    return resultInMiliseconds;
  };
  // Set month time start and end in milliseconds
  time["start"] = setDate();
  time["end"] = setDate(true) - 1;
};

export const attendList: AttendList = reactive({
  data: [],
});
export const userAttendList: AttendList = reactive({
  data: [],
});
export const usersList: UsersList = reactive({
  data: [],
});
// export const userData: UserData = reactive(userData);

// Calculate total worked time for day
export const timeConvert = (
  enterTime: any,
  leaveTime: any,
  userData: any
): string => {
  let hours = leaveTime.slice(11, 13) - enterTime.slice(11, 13);
  const minutes = leaveTime.slice(14, 16) - enterTime.slice(14, 16);

  const dateForCheck = new Date(String(enterTime).slice(0, 16));

  const isWeekends = dateForCheck.getDay() === 0 || dateForCheck.getDay() === 6;

  const isCurentMonth = dateForCheck.getMonth() === new Date().getMonth();

  if (userData.value.eatHour && hours > 9 && !isWeekends) {
    hours -= 1;
  }

  return `${hours} h ${minutes} m`;
};
