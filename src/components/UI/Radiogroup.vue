<template>
  <div class="radio-group">

    <!-- label -->
    <label
      v-text="label"
      v-if="label.length"
      class="radio-group__label label" />

    <!-- input -->
    <input
      type="hidden"
      :value="activeChoice"
      :name="name"
      :id="id">

    <!-- choices list -->
    <ul class="radio-group__choices">
      <li
        v-for="(choice, index) in choices"
        :key="index"
        @click="setChoice(choice.value)"
        :class="`radio-group__choices__choice${(activeChoice === choice.value) ? ' active' : ''}`">
          <span class="icon" />
          {{ choice.label }}
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'RadioGroup',
  data: () => ({
    activeChoice: ''
  }),
  props: {
    choices: {
      type: Array,
      required: true
    },
    label: String,
    name: String,
    id: String,
    default: String
  },
  methods: {
    setChoice (e) {
      this.activeChoice = e
      this.$emit('input', e)
    }
  },
  created () {
    if (this.default) this.activeChoice = this.default
    else {
      if (this.choices[0]) this.setChoice(this.choices[0].value)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.radio-group {
  &__choices {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    color: $radiogroup-base-color;

    &__choice {
      flex-basis: 100%;
      font-weight: lighter;
      font-size: 1rem;
      display: flex;
      margin: 0 1rem 1rem 0rem;
      transition: .2s;
      cursor: pointer;

      &:hover {
        transform: translateX(-0.2rem);
      }

      &.active {
        .icon::before {
          background: $radiogroup-icon-color;
        }
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1rem;
        height: 1rem;
        border: 2px solid $radiogroup-icon-color;
        border-radius: 50%;
        margin-right: 0.5rem;

        &::before {
          content: "";
          display: block;
          width: 0.25rem;
          height: 0.25rem;
          border-radius: 100%;
        }
      }
    }
  }

  &__label {
    margin-bottom: 1rem;
    display: block;
  }

}
</style>
