<template>
  <div id="rents" class="rents page">

    <div class="flex flex-align--center">

      <!-- heading -->
      <h2
        class="sub-title flex-grow--1 margin-right--1"
        v-text="'Rents history'" />

      <!-- return btn -->
      <button-item
        class="btn--small flex-grow--0"
        @click="$router.go(-1)"
        name="return-button"
        text="< Return"
        id="return-button" />

    </div>

    <!-- spinner -->
    <spinner
      v-if="loading" />

    <!-- alert -->
    <alert
      v-if="!rents.length && !errorMessage && !loading"
      type="info"
      content="No rents..." />

    <!-- error alert -->
    <alert
      v-if="errorMessage.length"
      type="error"
      :content="errorMessage" />

    <!-- rent add form -->
    <rent-form
      v-if="addFormVisible"
      @submit="addRent"
      @cancel="addFormVisible = false"
      :label="'Add copy'" />

    <!-- rent edit form -->
    <rent-form
      v-if="editFormVisible"
      type="edit"
      :data="rentToEdit"
      @submit="editRent"
      @cancel="editFormVisible = false"
      :label="'Edit copy'" />

    <!-- rents list -->
    <rents-list
      v-if="rents.length"
      :rents="rents"
      @remove="removeRent"
      @edit="rentToEdit = $event; editFormVisible = true" />

    <!-- add rent btn -->
    <button-item
      @click="addFormVisible = true"
      name="add-rent-button"
      text="Rent this copy"
      id="add-rent-button" />

  </div>
</template>

<script>
import AuthMixin from '@/mixins/authMixin'
import Alert from '@/components/UI/Alert'
import RentsList from '@/components/RentsList'
import Spinner from '@/components/UI/Spinner'
import ButtonItem from '@/components/UI/Button'
import RentForm from '@/components/RentForm'

import { mapActions } from 'vuex'

export default {
  name: 'Rents',
  mixins: [AuthMixin],
  data: () => ({
    loading: false,
    errorMessage: '',
    rentToEdit: null,
    editFormVisible: false,
    addFormVisible: false
  }),
  computed: {
    rents () { return this.$store.state.rents }
  },
  methods: {
    ...mapActions(['fetchRents', 'addRentRequest', 'removeRentRequest', 'updateRentRequest']),

    async removeRent (id) {
      this.loading = true
      this.errorMessage = ''
      try {
        await this.removeRentRequest(id)
      } catch (err) {
        this.errorMessage = err.message
      }
      this.loading = false
    },

    async addRent (form) {
      this.addFormVisible = false
      this.loading = true
      this.errorMessage = ''
      try {
        await this.addRentRequest({ ...form, itemId: this.$route.params.itemId })
      } catch (err) {
        this.errorMessage = err.message
      }
      this.loading = false
    },

    async editRent (form) {
      this.editFormVisible = false
      this.loading = true
      this.errorMessage = ''
      try {
        await this.updateRentRequest({ ...form })
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
      if (!this.$route.params.itemId) throw new Error('No item selected')
      else await this.fetchRents(this.$route.params.itemId)
    } catch (err) {
      this.errorMessage = err.message
    }
    this.loading = false
  },
  components: { Alert, RentsList, Spinner, RentForm, ButtonItem }
}
</script>
