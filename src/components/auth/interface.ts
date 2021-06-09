import firebase from "firebase/app";
// The field schema shape
export default interface IFieldSchema {
  as: string;
  name?: string;
  label: string; // user friendly string
  type?: string;
  [k: string]: any;
  options?: string[];
}

// The form schema shape
export default interface IFormSchema {
  fields: IFieldSchema[]; // fields
  validation: any;
  values: { [k: string]: any };
}

// The auth signUp fields
export default interface authValues {
  email: string;
  password: string;
  password2?: string;
  name?: string;
  surname?: string;
  dni?: string;
  workplace?: string;
}

export default interface IFirebaseDoc {
  doc: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
}
