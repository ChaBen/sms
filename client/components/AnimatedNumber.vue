<template>
  <span>{{ animatedNumber }}</span>
</template>
<script>
import TWEEN from '@tweenjs/tween.js'

export default {
  props: {
    value: {
      default: 0
    },
    duration: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      animatedNumber: 0
    }
  },
  watch: {
    number(newValue, oldValue) {
      this.initAnimation(newValue, oldValue)
    }
  },
  mounted() {
    this.initAnimation(this.value, 0)
  },
  methods: {
    initAnimation(newValue, oldValue) {
      const vm = this

      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.In)
        .to({ tweeningNumber: newValue }, this.duration)
        .onUpdate(function(object) {
          vm.animatedNumber = object.tweeningNumber.toFixed(0)
        })
        .start()

      animate()
    }
  }
}
</script>
