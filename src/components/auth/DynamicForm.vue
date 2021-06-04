<template>
  <section>
    <Form @submit="onSubmit" class="glass">
      <div
        v-for="{ as, name, label, type, ...attrs } in schema.fields"
        :key="name"
      >
        <label
          :for="name"
          class="flex text-sm font-medium leading-5 text-secondary my-2"
          >{{ label }}
        </label>
        <Field
          class="btn_auth"
          :type="type"
          :as="as"
          :id="name"
          :name="name"
          v-bind="attrs"
        />
        <ErrorMessage :name="name" />
      </div>
      <div v-if="schema.fields.length > 2" class="relative">
        <label
          for="grid-state"
          class="block mb-2 uppercase tracking-wide text-secondary text-xs mt-4"
        >
          Centro de Trabajo </label
        ><Field
          class="
            block
            appearance-none
            w-full
            bg-primary
            border border-gray-200
            text-secondary
            py-3
            px-4
            pr-8
            rounded
            leading-tight
            focus:outline-none
            focus:bg-secondary
            focus:border-gray-500
          "
          name="workplace"
          as="select"
          >>
          <option value="Palma">Palma de Mallorca</option>
          <option value="Sevilla">Sevilla</option>
          <option value="Valencia">Valencia</option>
          <option value="Malaga">Malaga</option>
          <option value="Tenerife">Tenerife</option>
          <option value="Ibiza">Ibiza</option>
        </Field>
        <div
          class="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            flex
            items-center
            mt-4
            px-2
            text-secondary
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="fill-current h-8 w-8 mt-2"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            ></path>
          </svg>
        </div>
      </div>
      <button
        :disabled="!acceptTerms"
        type="submit"
        class="mt-6"
        :class="
          acceptTerms
            ? 'btn-form uppercase'
            : 'text-primary text-xs capitalize ml-2'
        "
      >
        {{
          acceptTerms
            ? "Activar"
            : "acepto los Términos y condiciones para continuar"
        }}
      </button>
    </Form>
    <teleport to="#messages">
      <Messager />
    </teleport>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { signup, login, email, password } from ".";
import IFormSchema from "@/components/auth/interface";
import authValues from "@/components/auth/interface";
import Messager from "@/components/Messager.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DynamicForm",
  setup() {
    const route = useRoute();
    const onSubmit = (values: authValues) => {
      // login(values.email, values.password);
      if (route.name === "Login") {
        login(values.email, values.password);
      }
      if (route.name === "Register") {
        if (values.password !== values.password2) {
          throw Error("failed");
        }
        signup(values);
      }
    };
    return { login, email, password, onSubmit };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    Messager,
  },
  props: {
    schema: {
      type: Object as PropType<IFormSchema>,
      required: true,
    },
    acceptTerms: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
  },
});
</script>

<style scoped></style>
