<template>
  <ul class="titles-list list">
    <li
      v-for="ebook in titles"
      :key="ebook.id"
      :id="`title-${ebook.id}`"
      class="titles-list__item list__item">

      <!-- title -->
      <div
        class="titles-list__item__title list__item__col list__item__col--primary"
        v-text="ebook.title" />

      <!-- author -->
      <div
        class="titles-list__item__author list__item__col"
        v-text="`by ${ebook.author}`" />

      <!-- year -->
      <div
        class="titles-list__item__year list__item__col"
        v-text="`(${ebook.year})`" />

      <div class="titles-list__item__actions list__item__actions">

        <!-- show copies btn -->
        <router-link :to="`/items/${ebook.id}`">
          <button-item
            class="show-copies-btn btn--small"
            text="Show copies"
            variant="primary" />
        </router-link>

        <!-- edit btn -->
        <button-item
          @click="$emit('edit', ebook)"
          class="edit-btn btn--small"
          text="Edit"
          variant="warning" />

        <!-- remove btn -->
        <button-item
          @click="$emit('remove', ebook.id)"
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
  name: 'TitlesList',
  props: {
    titles: {
      type: Array,
      required: true
    }
  },
  components: { ButtonItem }
}
</script>
