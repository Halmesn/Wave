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
  export default {
    name: 'LoginForm',
    methods: {
      login(values) {
        this.showAlert = true;
        this.inSubmission = true;
        this.alertVariant = 'bg-blue-500';
        this.alertMsg = 'Please wait! We are logging you in.';

        this.alertVariant = 'bg-green-500';
        this.alertMsg = 'Success! You are now logged in.';
      },
    },
    data() {
      return {
        schema: {
          email: 'email||required',
          password: 'required|min:3|max:32',
        },
        inSubmission: false,
        showAlert: false,
        alertVariant: 'bg-blue-500',
        alertMsg: 'Please wait! We are logging you in.',
      };
    },
  };
</script>
