<template>
  <div id="vue-material-kit-pro">
    <no-ssr>
      <MainNavbar :navbarTransparent="true" :colorOnScroll="66" />
    </no-ssr>
    <Nuxt />
  </div>
</template>

<script>
import MainNavbar from '@/components/layout/MainNavbar';

export default {
  components: {
    MainNavbar
  },
  data: () => ({
    
  })
}
</script>