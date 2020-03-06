<template>
    <div :class="'alert alert--' + type">
      <p class="alert__content" v-html="content" />
    </div>
</template>

<script>
export default {
  name: 'inputField',
  props: {
    type: String,
    content: [String]
  },
  created () {
    setTimeout(() => {
      this.$emit('dissmiss')
    }, 3000)
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.alert {
  background: #fff;
  color: #000;
  border-left: 4px solid #111;
  padding: 0.9rem 0.8rem;
  margin: 1rem 0 1.5rem 0;
  display: flex;
  font-size: 1rem;
  opacity: 1;
  font-weight: lighter;
  box-shadow: 0 20px 40px 0 rgba(76,104,239,.15);
  max-width: 30rem;
  border-radius: 4px;

  &--error {
    background: $alert-error-back;
    color: $alert-error-text;
    border-color: $alert-error-border;
  }

  &--warning {
    background: $alert-warning-back;
    color: $alert-warning-text;
    border-color: $alert-warning-border;
  }

  &--info {
    background: $alert-info-back;
    color: $alert-info-text;
    border-color: $alert-info-border;
  }

  &--success {
    background: $alert-success-back;
    color: $alert-success-text;
    border-color: $alert-success-border;
  }

  &__content {
    margin: 0;
  }
}
</style>
