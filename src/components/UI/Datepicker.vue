<template>
  <div>
    <div class="date-picker">

      <!-- purchase date -->
      <datepicker
        ref="datepicker"
        id="id"
        class="date-picker__input"
        :name="name"
        :value="newValue"
        format="yyyy-MM-dd"
        @selected="pickDate" />

      <!-- label -->
      <span :class="{ 'input-field__label': true, 'input-field__label--active': newValue }" v-text="label" />

    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { dateToStr } from '@/utils'

export default {
  name: 'datePicker',
  props: {
    value: [String, Number],
    type: String,
    label: String,
    name: String,
    id: String
  },
  data: () => {
    return {
      newValue: null
    }
  },
  methods: {
    pickDate (date) {
      this.$emit('input', dateToStr(date))
    }
  },
  created () {
    this.newValue = this.value
  },
  components: { Datepicker }
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.date-picker {
  display: block;
  position: relative;
  transition: .2s;
  width: 100%;
  max-width: 20rem;
  border-bottom: 1px solid #c4dbf4;
  margin: 1rem 0;

  &:hover {
    margin-left: -0.2rem;
  }

  &__input input {
    background: none;
    border: none;
    outline: none;
    padding: 0.7rem 0.7rem 0 0.7rem;
    color: $base-font-color;
    font-weight: lighter;
    font-family: inherit;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 0.5rem 0;
    opacity: 0.8;
    width: 100%;
    max-width: 20rem;
    transition: .2s;
    font-size: 1rem;

    &:focus {
      opacity: 1;
      background: none;
    }

    &[type="number"] {
      max-width: 10rem;
    }

    &[type="time"] {
      max-width: 10rem;
    }
  }

  &__label {
    position: absolute;
    top: 1.2rem;
    left: 0.7rem;
    opacity: 0.6;
    font-weight: lighter;
    transition: .1s;

    &.input-field__label--active {
      font-size: 0.8rem;
      top: -0.2rem;
      left: 0.7rem;
    }

  }

}
</style>
