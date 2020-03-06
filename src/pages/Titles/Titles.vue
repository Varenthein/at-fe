<template>
  <div id="titles" class="titles page">

    <!-- heading -->
    <h2
      class="sub-title"
      v-text="'Titles catalog'" />

    <!-- spinner -->
    <spinner
      v-if="loading" />

    <!-- alert -->
    <alert
      v-if="!titles.length && !errorMessage"
      type="info"
      content="No titles" />

    <!-- error alert -->
    <alert
      v-if="errorMessage.length"
      type="error"
      :content="errorMessage" />

    <!-- title add form -->
    <title-form
      v-if="addFormVisible"
      @submit="addTitle"
      @cancel="addFormVisible = false"
      :label="'Add title'" />

    <!-- title edit form -->
    <title-form
      v-if="editFormVisible"
      :data="itemToEdit"
      @submit="editTitle"
      @cancel="editFormVisible = false"
      :label="'Edit title'" />

    <!-- titles list -->
    <titles-list
      v-if="titles.length"
      :titles="titles"
      @remove="removeTitle"
      @edit="itemToEdit = $event; editFormVisible = true" />

    <!-- add title btn -->
    <button-item
      @click="addFormVisible = true"
      name="add-title-button"
      text="Add new"
      id="add-title-button" />

  </div>
</template>

<script>
import AuthMixin from '@/mixins/authMixin'
import Alert from '@/components/UI/Alert'
import TitlesList from '@/components/TitlesList'
import Spinner from '@/components/UI/Spinner'
import ButtonItem from '@/components/UI/Button'
import TitleForm from '@/components/TitleForm'

import { mapActions } from 'vuex'

export default {
  name: 'Titles',
  mixins: [AuthMixin],
  data: () => ({
    loading: false,
    errorMessage: '',
    itemToEdit: null,
    editFormVisible: false,
    addFormVisible: false
  }),
  computed: {
    titles () { return this.$store.state.titles }
  },
  methods: {
    ...mapActions(['fetchTitles', 'addTitleRequest', 'removeTitleRequest', 'updateTitleRequest']),

    async removeTitle (id) {
      this.loading = true
      this.errorMessage = ''
      try {
        await this.removeTitleRequest(id)
      } catch (err) {
        this.errorMessage = err.message
      }
      this.loading = false
    },

    async addTitle (form) {
      this.addFormVisible = false
      this.loading = true
      this.errorMessage = ''
      try {
        await this.addTitleRequest({ title: form.title, author: form.author, year: form.year })
      } catch (err) {
        this.errorMessage = err.message
      }
      this.loading = false
    },

    async editTitle (form) {
      this.editFormVisible = false
      this.loading = true
      this.errorMessage = ''
      try {
        await this.updateTitleRequest({ ...form })
      } catch (err) {
        this.errorMessage = err.message
      }
      this.loading = false
    }

  },
  async created () {
    this.loading = true
    this.errorMessage = ''
    try {
      await this.fetchTitles()
    } catch (err) {
      this.errorMessage = err.message
    }
    this.loading = false
  },
  components: { Alert, TitlesList, Spinner, ButtonItem, TitleForm }
}
</script>
