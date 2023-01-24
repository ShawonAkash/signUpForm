<template>
  <div class="container mx-auto">
    <form class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-lg font-medium mb-2">Sign Up</h1>
      <label class="block text-gray-700 mb-2">Name:</label>
      <input
        v-model="name"
        class="border p-2 rounded-lg w-full"
        :class="{ 'border-red-500': errors.name }"
      />
      <p class="text-red-500" v-if="errors.name">Please enter a name</p>
      <label class="block text-gray-700 mb-2">Email:</label>
      <input
        v-model="email"
        class="border p-2 rounded-lg w-full"
        :class="{ 'border-red-500': errors.email }"
      />
      <p class="text-red-500" v-if="errors.email">Please enter a valid email</p>
      <label class="block text-gray-700 mb-2">Password:</label>
      <input
        v-model="password"
        type="password"
        class="border p-2 rounded-lg w-full"
        :class="{ 'border-red-500': errors.password }"
      />
      <p class="text-red-500" v-if="errors.password">Please enter a password</p>
      <label class="block text-gray-700 mb-2">Confirm Password:</label>
      <input
        v-model="confirmPassword"
        type="password"
        class="border p-2 rounded-lg w-full"
        :class="{ 'border-red-500': errors.confirmPassword }"
      />
      <p class="text-red-500" v-if="errors.confirmPassword">
        Passwords do not match
      </p>
      <label>Interests:</label>
      <TagList v-model="selectedTags" :tags="availableTags" :max-tags="3" />
      <p class="text-red-500" v-if="errors.interests">
        Please select at least one interest
      </p>
      <div class="text-center mt-4">
        <button
          @click.prevent="submitForm"
          class="bg-blue-500 p-2 rounded-lg text-white"
        >
          Submit
        </button>
      </div>
    </form>
    <table class="mt-6 w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Interests</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="form in forms" :key="form.id">
          <td class="px-4 py-2">{{ form.name }}</td>
          <td class="px-4 py-2">{{ form.email }}</td>
          <td>{{ selectedTags.join(', ') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent, ref, computed } from 'vue'
import TagList from './TagList.vue'

export default defineComponent({
  components: {
    TagList
  },
  setup() {
    const forms = ref([])
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const selectedTags = ref([])
    const availableTags = ref(['Work', 'Education', 'Hobby', 'Freelance', 'Business'])
    const errors = ref({
      name: false,
      email: false,
      password: false,
      confirmPassword: false
    })

    function validateEmail(email) {
      // regex for email validation
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }

    async function submitForm() {
      // validate form inputs
      errors.value.name = !name.value
      errors.value.email = !validateEmail(email.value)
      errors.value.password = !password.value
      errors.value.confirmPassword = password.value !== confirmPassword.value
      if (
        errors.value.name ||
        errors.value.email ||
        errors.value.password ||
        errors.value.confirmPassword
      ) {
        return
      }
      // send form data to json file
      try {
        const formData = {
          name: name.value,
          email: email.value,
          interests: selectedTags.value
        }
        console.log(formData)
        await axios.post('/db.json', formData)
        forms.value.push(formData)
        name.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        selectedTags.value = []
      } catch (error) {
        console.log(error)
      }
    }
    return {
      forms,
      name,
      email,
      password,
      confirmPassword,
      selectedTags,
      availableTags,
      errors,
      submitForm
    }
  }
})
</script>