<template>
  <fog @cancel="$emit('cancel')">
    <form class="form title-form form--short" @submit.prevent="handleSubmit">

      <!-- heading -->
      <h2
        class="sub-title"
        v-text="label" />

      <!-- error alert -->
      <alert
        v-if="errorMessage.length"
        type="error"
        :content="errorMessage" />

      <!-- title -->
      <input-field
        name="title"
        type="text"
        label="Title"
        v-model="form.title"/>

      <!-- author -->
      <input-field
        name="author"
        type="text"
        label="Author"
        v-model="form.author"/>

      <!-- year -->
      <input-field
        name="year"
        type="number"
        label="Year"
        v-model="form.year"/>

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
import InputField from '@/components/UI/Input'

export default {
  name: 'TitleForm',
  props: {
    data: Object,
    label: String
  },
  data: () => ({
    form: {
      id: null,
      title: '',
      author: '',
      year: '2020'
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
      if (this.form.year) this.form.year = parseInt(this.form.year)
      this.$emit('submit', this.form)
    }

  },
  created () {
    if (this.data) this.form = JSON.parse(JSON.stringify(this.data))
    if (this.data && this.data.year) this.data.year = this.data.year.toString()
  },
  components: { Alert, ButtonItem, InputField, Fog }
}
</script>
