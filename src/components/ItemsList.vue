<template>
  <ul class="items-list list">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      :id="`item-${item.id}`"
      class="items-list__item list__item">

      <!-- index -->
      <div
        class="items-list__item__index list__item__col"
        v-text="`${index + 1}.`" />

      <!-- purchasedDate -->
      <div
        class="items-list__item__purchase-date list__item__col list__item__col--primary"
        v-text="item.purchaseDate" />

      <!-- status -->
      <div
        :class="`items-list__item__status list__item__col ${item.status === 'RENTED' ? 'items-list__item__status--rented': 'items-list__item__status--available'}`"
        v-text="statuses[item.status]" />

      <div class="items-list__item__actions list__item__actions">

        <!-- show rent btn -->
        <router-link :to="`/rents/${item.id}`">
          <button-item
            class="show-rents-btn btn--small"
            text="Show history"
            variant="primary" />
        </router-link>

        <!-- edit btn -->
        <button-item
          @click="$emit('edit', item)"
          class="edit-btn btn--small"
          text="Edit"
          variant="warning" />

        <!-- remove btn -->
        <button-item
          @click="$emit('remove', item.id)"
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
  name: 'ItemsList',
  data: () => ({
    statuses: {
      AVAILABLE: 'Available',
      RENTED: 'Rented'
    }
  }),
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: { ButtonItem }
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.items-list__item__status {
  &--rented {
    color: $item-status-color-rented;
  }
  &--available {
    color: $item-status-color-available;
  }
}
</style>
