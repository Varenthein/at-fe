<template>
  <form class="form form--short" @submit.prevent="submitForm">

    <!-- page heading -->
    <h2
      class="sub-title"
      v-text="'Sign up'" />

    <!-- alert error -->
    <alert
      v-if="errorMessage.length"
      type="error"
      :content="errorMessage" />

    <!-- alert success -->
    <alert
      v-if="successMessage.length"
      type="success"
      :content="successMessage" />

    <!-- spinner -->
    <spinner
      v-if="loading" />

    <!-- login -->
    <input-field
      type="text"
      name="login"
      id="login"
      label="Login"
      v-model="login" />

    <!-- password -->
    <input-field
      type="password"
      name="password"
      id="password"
      label="Password"
      v-model="password" />

    <!-- password repeat -->
    <input-field
      type="password"
      name="password-repeat"
      id="password-repeat"
      label="Repeat password"
      v-model="passwordRepeat" />

    <div class="flex">

      <!-- sing up btn -->
      <button-item
        id="register-btn"
        variant="primary"
        text="Sign up" />

      <!-- log in btn -->
      <router-link to="/login">
        <button-item
          id="login-btn"
          variant="default"
          text="Log in" />
      </router-link>

    </div>

  </form>
</template>

<script>
import InputField from '@/components/UI/Input'
import ButtonItem from '@/components/UI/Button'
import Alert from '@/components/UI/Alert'
import Spinner from '@/components/UI/Spinner'

import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data: () => ({
    login: '',
    password: '',
    passwordRepeat: '',
    errorMessage: '',
    successMessage: '',
    loading: false
  }),
  methods: {

    ...mapActions({
      register: 'register'
    }),

    async submitForm () {
      this.successMessage = ''
      this.errorMessage = ''
      this.loading = true

      if (!this.login.length || !this.password.length || !this.passwordRepeat.length) this.errorMessage = 'You can\'t leave fields empty'
      else if (this.password !== this.passwordRepeat) this.errorMessage = 'The passwords don\'t match'
      else {
        try {
          await this.register({ login: this.login, password: this.password })
          this.successMessage = 'You have been successfully registered!'
        } catch (err) {
          this.errorMessage = err.message
        }
      }

      this.loading = false
    }

  },
  components: { InputField, ButtonItem, Alert, Spinner }
}
</script>
