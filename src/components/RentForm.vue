<template>
  <fog @cancel="$emit('cancel')">
    <form class="form rent-form form--short form--uncut" @submit.prevent="handleSubmit">

      <!-- heading -->
      <h2
        class="sub-rent"
        v-text="label" />

      <!-- error alert -->
      <alert
        v-if="errorMessage.length"
        type="error"
        :content="errorMessage" />

      <!-- customer name -->
      <input-field
        name="customer-name"
        type="text"
        label="Customer name"
        v-model="form.customerName"/>

      <!-- rent date -->
      <datepicker
        id="rent-date"
        class="input"
        name="rent-date"
        label="Rent date"
        format="yyyy-MM-dd"
        v-model="form.rentDate" />

      <!-- expiration date-->
      <datepicker
        v-if="type === 'edit'"
        id="expiration-date"
        class="input"
        name="expiration-date"
        label="Expiration date"
        format="yyyy-MM-dd"
        v-model="form.expirationDate" />

      <!-- add button -->
      <button-rent
        name="submit-button"
        @click="handleSubmit"
        :text="label"
        variant="primary" />

    </form>
  </fog>
</template>

<script>
import Fog from '@/components/UI/Fog'
import Alert from '@/components/UI/Alert'
import ButtonRent from '@/components/UI/Button'
import InputField from '@/components/UI/Input'
import Datepicker from '@/components/UI/Datepicker'

import { addDays, dateToStr } from '@/utils'

export default {
  name: 'RentForm',
  props: {
    data: Object,
    label: String,
    type: {
      type: String,
      default: 'add'
    }
  },
  data: () => ({
    form: {
      id: null,
      customerName: '',
      rentDate: '',
      expirationDate: ''
    },
    errorMessage: ''
  }),
  methods: {

    async handleSubmit (e) {
      this.errorMessage = ''
      for (const param in this.form) {
        if (!this.form[param] && param !== 'id') {
          this.errorMessage = `"${param}" field shouldn't be empty...`
          return false
        }
      }

      this.$emit('submit', this.form)
    }

  },
  created () {
    if (this.data) this.form = JSON.parse(JSON.stringify(this.data))
    if (this.type === 'add') {
      this.form.rentDate = dateToStr(new Date())
      this.form.expirationDate = dateToStr(addDays(new Date(), 3))
    }
  },
  components: { Alert, ButtonRent, Fog, Datepicker, InputField }
}
</script>
