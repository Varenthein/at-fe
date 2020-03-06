<template>
  <div ref="fog-container" class="full-screen full-screen--fog fog animated fadeIn">

    <div ref="fog-content" class="fog__content">
      <slot></slot>
    </div>

    <a
      @click="$emit('cancel')"
      v-text="'X'"
      class="link icon-close fog__icon-close" />

  </div>
</template>

<script>
export default {
  name: 'Fog',
  props: {
    title: String,
    confirmBtnMsg: String
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.fog {
  transition: .8s;
  display: flex;

  &__icon-close {
    position: absolute;
    top: 4rem;
    right: 4rem;
    font-size: 2rem;
    color: $fog-icon-color;
    cursor: pointer;
  }

  .container {
    width: 100%;
    padding: 20px;
    max-width: 800px;
    padding: 5rem;
    position: relative;
  }

  &__content {
    margin: auto auto;
  }

}
</style>
