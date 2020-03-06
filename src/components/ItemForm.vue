<template>
  <fog @cancel="$emit('cancel')">
    <form class="form item-form form--short form--uncut" @submit.prevent="handleSubmit">

      <!-- heading -->
      <h2
        class="sub-item"
        v-text="label" />

      <!-- error alert -->
      <alert
        v-if="errorMessage.length"
        type="error"
        :content="errorMessage" />

      <!-- purchase date -->
      <datepicker
        id="purchase-date"
        class="input"
        name="purchase-date"
        label="Purchase date"
        format="yyyy-MM-dd"
        v-model="form.purchaseDate" />

      <!-- add button -->
      <button-item
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
import ButtonItem from '@/components/UI/Button'
import Datepicker from '@/components/UI/Datepicker'

export default {
  name: 'ItemForm',
  props: {
    data: Object,
    label: String
  },
  data: () => ({
    form: {
      id: null,
      purchaseDate: '2020-02-02',
      status: 'AVAILABLE'
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
  },
  components: { Alert, ButtonItem, Fog, Datepicker }
}
</script>
