<template>
  <div id="app">
    <container>

      <!-- page heading -->
      <router-link to="/">
        <h1 class="title text--center">
          eBook
          <span class="active">.app</span>
        </h1>
      </router-link>

      <!-- page content -->
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>

    </container>
  </div>
</template>

<script>
import Container from '@/components/UI/Container'
import { FadeTransition } from 'vue2-transitions'

export default {
  components: { FadeTransition, Container }
}
</script>
