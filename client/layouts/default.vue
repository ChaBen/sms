<template>
  <div id="vue-material-kit-pro" :class="{ 'nav-open': NavbarStore.showNavbar }">
    <no-ssr>
      <MainNavbar :navbar-transparent="true" :color-on-scroll="66" />
    </no-ssr>

    <Nuxt />
  </div>
</template>

<script>
import MainNavbar from '@/components/layout/MainNavbar';

export default {
  components: {
    MainNavbar
  }
}
</script>
