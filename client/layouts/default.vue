<template>
  <div id="vue-material-kit-pro" :class="{ 'nav-open': NavbarStore.showNavbar }">
    <client-only>
      <MainNavbar :navbar-transparent="true" :color-on-scroll="66" />
    </client-only>

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
