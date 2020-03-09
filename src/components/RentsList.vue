<template>
  <ul class="rents-list list">
    <li
      v-for="rent in rents"
      :key="rent.id"
      :id="`rent-${rent.id}`"
      class="rents-list__rent list__item">

      <!-- customer name -->
      <div
        class="rents-list__rent__customer-name list__item__col list__item__col--primary"
        v-text="rent.customerName" />

      <!-- rent date -->
      <div
        class="rents-list__rent__rent-date list__item__col"
        v-text="rent.rentDate" />

      <!-- expiration date date -->
      <div
        class="rents-list__rent__rent-date list__item__col"
        v-text="`(expiration: ${rent.expirationDate})`" />

      <div class="rents-list__rent__actions list__item__actions">

        <!-- edit btn -->
        <button-item
          @click="$emit('edit', rent)"
          class="edit-btn btn--small"
          text="Edit"
          variant="warning" />

        <!-- remove btn -->
        <button-item
          @click="$emit('remove', rent.id)"
          class="remove-btn btn--small"
          text="Remove"
          variant="error" />

      </div>

    </li>
  </ul>
</template>

<script>
import ButtonItem from '@/components/UI/Button'

export default {
  name: 'RentsList',
  props: {
    rents: {
      type: Array,
      required: true
    }
  },
  components: { ButtonItem }
}
</script>
