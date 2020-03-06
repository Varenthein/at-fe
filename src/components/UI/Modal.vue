<template>
  <section @click="$emit('cancel')" class="full-screen full-screen--centered full-screen--fog animated fadeIn">

    <div @click.stop="() => {}" class="modal">
      <div class="modal__header">
        <h1 class="modal__header__title">
          {{ title }}
        </h1>
      </div>
      <div class="modal__body">
        <div class="modal__body__content">
          <slot></slot>
        </div>
      </div>
      <div class="modal__footer">
        <div class="animated fadeIn flex flex--hor--end">
          <a class="btn btn--inline" @click.stop="$emit('confirm')"><span class="btn__icon icon-accept" /> {{ confirmBtnMsg }}</a>
          <a class="btn btn--glass btn--inline" @click.stop="$emit('cancel')"><span class="btn__icon icon-close" /> {{ $ml.get('cancel') }}</a>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'Modal',
    title: String,
    confirmBtnMsg: String,
  },
}
</script>

<style lang="scss">
.modal {
  background: rgba(53,53,53,0.9);
  border-radius: 4px;
  z-index: 4;
  width: 100%;
  max-width: 30rem;
  margin: auto;
  font-size: 1rem;
  box-shadow: 0 0 30px rgba(0,0,0,0.2);
  line-height: 130%;

  &__header {
    margin: 1rem 1rem 0 1rem;
    color: #000;
    font-size: 1.2rem;
    border-bottom: 1px solid #fff;
    padding-bottom: 1rem;

    &__title {
      display: flex;
      align-items: center;

      &__icon {
        margin-right: 1rem;
        font-size: 2rem;
      }
    }

  }

  &__body {
    padding: 1.5rem 1rem 1rem 1rem;
    color: $baseTextColor;
    font-weight: lighter;
  }

  &__footer {
    margin-right: 1rem;
  }

  &--error {
    .modal__header {
      color: $errorBackColor;
      border-color: $errorBackColor;
    }
  }

  &--warning {
    .modal__header {
      color: $warningBackColor;
      border-color: $warningBackColor;
    }
  }

  &--info {
    .modal__header {
      color: $infoBackColor;
      border-color: $infoBackColor;
    }
  }

  &--isuccess {
    .modal__header {
      color: $successBackColor;
      border-color: $successBackColor;
    }
  }
}
</style>
