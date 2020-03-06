<template>
  <form class="form form--short" @submit.prevent="submitForm">

    <!-- page heading -->
    <h2
      class="sub-title"
      v-text="'Log in'" />

    <!-- alert error -->
    <alert
      v-if="errorMessage.length"
      type="error"
      :content="errorMessage" />

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

    <div class="flex">

      <!-- log in btn -->
      <button-item
        id="login-btn"
        variant="primary"
        text="Log in" />

      <!-- log in btn -->
      <router-link to="/register">
        <button-item
          id="register-btn"
          text="Sign up" />
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
  name: 'Login',
  data: () => ({
    login: '',
    password: '',
    passwordRepeat: '',
    errorMessage: '',
    loading: false
  }),
  methods: {

    ...mapActions({
      signIn: 'login'
    }),

    async submitForm () {
      this.successMessage = ''
      this.errorMessage = ''
      this.loading = true

      if (!this.login.length || !this.password.length) this.errorMessage = 'You can\'t leave fields empty'
      else {
        try {
          await this.signIn({ login: this.login, password: this.password })
          this.$router.push('/')
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
