<template>
  <Footer />
</template>

<script>
import Footer from './InnerFooter';

export default {
  components: {
    Footer
  },
  data: () => ({
    year: new Date().getFullYear()
  })
}
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  width: 100%;
  background: transparent;
  bottom: 0;
  color: #fff;
  z-index: 1;

  .copyright a{
    color: #fff;
  }
}
</style>
