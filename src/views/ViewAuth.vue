<script setup>
import { computed, ref, reactive, watch, onMounted } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';
import { useRouter } from 'vue-router';

const router = useRouter();

// pinia store
const storeAuth = useStoreAuth();

// register or login
const register = ref(false);

// credentials
const credentials = reactive({
  email: '',
  password: '',
});

const isAuthenticated = computed(() => !!storeAuth.user?.id);
console.log(isAuthenticated.value);

const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login';
});

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter and email and password');
  } else {
    if (register.value) {
      storeAuth.registerUser(credentials);
    } else {
      storeAuth.loginUser(credentials);
    }
  }
};

watch(register, () => {
  credentials.email = '';
  credentials.password = '';
});

onMounted(() => {
  if (isAuthenticated.value) router.replace('/');
});
</script>

<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click="register = true">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <div class="content">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="credentials.email"
                  class="input"
                  type="email"
                  placeholder="e.g. alexsmith@gmail.com"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="credentials.password"
                  class="input"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <button class="button is-primary">{{ formTitle }}</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
