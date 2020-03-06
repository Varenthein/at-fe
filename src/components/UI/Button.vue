<template>
  <button
    @click="$emit('click')"
    :class="`btn btn--${variant}`"
    v-text="text" />
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.btn {
  color: $base-button-color;
  box-shadow: 0 10px 40px 0 rgba(76,104,239,.35), 0 0px 20px 0 rgba(76,104,239,.05);
  border-radius: 0.3rem;
  padding: 1rem 1.5rem;
  border: none;
  font-family: inherit;
  text-transform: uppercase;
  font-weight: 700;
  min-width: 6rem;
  text-align: center;
  margin: 2rem auto;
  display: table;
  cursor: pointer;
  transition: .2s;

  &:hover {
    box-shadow: 0 20px 40px 0 rgba(76,104,239,.35);
  }

  &--default {
    background: $button-default-back;
    color: $button-default-color;
    border: 2px solid $button-default-color;
  }

  &--primary {
    background: $button-primary-back;
    color: $button-primary-color;
  }

  &--error {
    background: $button-error-back;
    color: $button-error-color;
  }

  &--warning {
    background: $button-warning-back;
    color: $button-warning-color;
  }

  &--warning {
    background: $button-success-back;
    color: $button-success-color;
  }

  &--small {
      padding: 0.5rem 1rem;
      font-size: 0.6rem;
      margin: 0 0.5rem;
  }
}
</style>
