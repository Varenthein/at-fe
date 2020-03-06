<template>
  <div class="fog animated fadeIn">
    <div class="lds-ripple">
      <div :style="{ 'border': '4px solid ' + color }"></div>
      <div :style="{ 'border': '4px solid ' + color }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss">

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -1s;
}

@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

</style>
