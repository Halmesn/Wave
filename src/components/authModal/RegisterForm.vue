<template>
  <div
    class="text-white text-center font-bold p-5 mb-4"
    v-if="showAlert"
    :class="alertVariant"
  >
    {{ alertMsg }}
  </div>
  <VeeForm
    :validation-schema="schema"
    :initial-values="formData"
    @submit="register"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="
                  block
                  w-full
                  py-1.5
                  px-3
                  text-gray-800
                  border border-gray-300
                  transition
                  duration-500
                  focus:outline-none focus:border-black
                  rounded
                "
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="
                  block
                  w-full
                  py-1.5
                  px-3
                  text-gray-800
                  border border-gray-300
                  transition
                  duration-500
                  focus:outline-none focus:border-black
                  rounded
                "
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="
                  block
                  w-full
                  py-1.5
                  px-3
                  text-gray-800
                  border border-gray-300
                  transition
                  duration-500
                  focus:outline-none focus:border-black
                  rounded
                "
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          v-bind="field"
          type="password"
          class="
                  block
                  w-full
                  py-1.5
                  px-3
                  text-gray-800
                  border border-gray-300
                  transition
                  duration-500
                  focus:outline-none focus:border-black
                  rounded
                "
          placeholder="Password"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirmPassword"
        type="password"
        class="
                  block
                  w-full
                  py-1.5
                  px-3
                  text-gray-800
                  border border-gray-300
                  transition
                  duration-500
                  focus:outline-none focus:border-black
                  rounded
                "
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        as="select"
        name="country"
        class="
                  block
                  w-full
                  py-1.5
                  px-3
                  text-gray-800
                  border border-gray-300
                  transition
                  duration-500
                  focus:outline-none focus:border-black
                  rounded
                "
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      :disabled="inSubmission"
      class="
                block
                w-full
                bg-purple-600
                text-white
                py-1.5
                px-3
                rounded
                transition
                hover:bg-purple-700
              "
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
  import { ref } from 'vue';

  export default {
    name: 'RegisterForm',
    setup() {
      const schema = {
        name: 'required|min:3|max:32|alphaSpaces',
        email: 'email|min:3|max:32|required',
        age: 'required|minValue:18|maxValue:120',
        password: 'required|min:3|max:32',
        confirmPassword: 'passwordMismatch:@password',
        country: 'required',
        tos: 'tos',
      };

      const formData = {
        country: 'USA',
      };

      let inSubmission = ref(false);
      let showAlert = ref(false);
      let alertVariant = ref('bg-blue-500');
      let alertMsg = ref('Please wait! Your account is being created.');

      const register = (values) => {
        inSubmission.value = true;
        showAlert.value = true;
        alertVariant.value = 'bg-blue-500';
        alertMsg.value = 'Please wait! Your account is being created.';

        alertVariant.value = 'bg-green-500';
        alertMsg.value = 'Success! Your account has been created.';
      };

      return {
        inSubmission,
        showAlert,
        alertVariant,
        alertMsg,
        formData,
        schema,
        register,
      };
    },
  };
</script>
