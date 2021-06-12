<template>
  <div
    class="text-white text-center font-bold p-5 mb-4"
    v-if="showAlert"
    :class="alertVariant"
  >
    {{ alertMsg }}
  </div>
  <VeeForm :validation-schema="schema" @submit="login">
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
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
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
      <ErrorMessage class="text-red-600" name="password" />
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
  import { useStore } from 'vuex';

  export default {
    name: 'LoginForm',
    setup() {
      const store = useStore();

      const schema = {
        email: 'email||required',
        password: 'required|min:3|max:32',
      };

      let inSubmission = ref(false);
      let showAlert = ref(false);
      let alertVariant = ref('bg-blue-500');
      let alertMsg = ref('Please wait! We are logging you in.');

      const login = async (values) => {
        inSubmission.value = true;
        showAlert.value = true;
        alertVariant.value = 'bg-blue-500';
        alertMsg.value = 'Please wait! We are logging you in.';

        try {
          await store.dispatch('login', values);
        } catch (error) {
          inSubmission.value = false;
          alertVariant.value = 'bg-red-500';
          alertMsg.value = 'Invalid login details';
          return;
        }
        alertVariant.value = 'bg-green-500';
        alertMsg.value = 'Success! You are now logged in.';
      };

      return {
        inSubmission,
        showAlert,
        alertVariant,
        alertMsg,
        login,
        schema,
      };
    },
  };
</script>
