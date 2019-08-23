<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-100 justify-content-center mx-auto text-center">
            <h2 class="title">{{ $t('pricing.title') }}</h2>
            <h5 class="description">{{ $t('pricing.desc') }}</h5>
          </div>
        </div>
        <div class="md-layout">
          <div v-for="(item, key) in pricings" :key="key" class="md-layout-item md-size-33 md-small-size-100" :class="item.class">
            <pricing-card :card-bg="item.bg">
              <template slot="cardContent">
                <h6 class="card-category text-gray">{{ item.title }}</h6>
                <h1 v-if="item.title !== 'CUSTOM'" class="card-title">
                  <small>$</small>{{ item.price }}
                </h1>
                <h1 v-else class="card-title">
                  <small>$</small>{{ customPrice || 0 }}
                  <small>/ {{ price }}</small>
                </h1>
                <ul>
                  <template v-if="item.title === 'CUSTOM'">
                    <li class="custom">
                      <md-field
                        slot="inputs"
                        class="white"
                        :class="[
                          { 'md-valid': !errors.has('customPrice') && touched },
                          { 'md-error': errors.has('customPrice') }
                        ]"
                      >
                        <label>Custom Price...</label>
                        <md-input
                          v-model="customPrice"
                          v-validate="modelValidations.customPrice"
                          type="tel"
                          md-counter="false"
                          maxlength="4"
                          data-vv-name="customPrice"
                          required
                          @keypress="isNumber"
                        />
                        <slide-y-down-transition>
                          <md-icon v-show="errors.has('customPrice')" class="error">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon v-show="!errors.has('customPrice') && touched" class="success">done</md-icon>
                        </slide-y-down-transition>
                      </md-field>
                    </li>
                    <li><b>97%</b> {{ $t('pricing.deliveryRate') }}</li>
                    <li><b>{{ smsCount(customPrice, false) | Comma }}</b> / {{ $t('pricing.send') }}</li>
                  </template>
                  <template v-else>
                    <li><b>${{ price }}</b> {{ $t('pricing.persms') }}</li>
                    <li><b>97%</b> {{ $t('pricing.deliveryRate') }}</li>
                    <li><b>{{ smsCount(item.price, true) | Comma }}</b> / {{ $t('pricing.send') }}</li>
                  </template>
                </ul>

                <md-button v-if="item.title !== 'FREE'" href="javascript:void(0)" class="md-round" :class="item.btn" @click="purchase(item)">
                  Get Started
                </md-button>
              </template>
            </pricing-card>
          </div>
        </div>
      </div>
    </parallax>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SlideYDownTransition } from 'vue2-transitions';
import { PricingCard } from '@/components';
import Mixins from '@/plugins/basicMixins';
import Swal from 'sweetalert2';

export default {
  components: {
    PricingCard,
    SlideYDownTransition
  },
  filters: {
    zero(price) {
      return price || 0;
    }
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    image: require('@/assets/img/examples/city.jpg'),
    price: 0.02,
    customPrice: null,
    pricings: [
      {
        class: 'mr-auto',
        bg: 'success',
        btn: 'md-white',
        title: 'GREEN',
        price: 100
      },
      {
        class: 'mr-auto',
        bg: 'behance',
        btn: 'md-white',
        title: 'BLUE',
        price: 1000
      },
      {
        class: 'mr-auto',
        bg: 'black',
        btn: 'md-white',
        title: 'CUSTOM',
        price: 0
      }
    ],
    touched: false,
    modelValidations: {
      customPrice: {
        required: true,
        min: 2,
        max: 4,
        numeric: true
      }
    }
  }),
  computed: {
    ...mapState('auth', {
      isLogin: state => state.payload,
      userId: state => state.payload.userId
    })
  },
  watch: {
    customPrice() {
      this.touched = true;
    }
  },
  methods: {
    ...mapActions({
      purchaseCreate: 'purchase/create'
    }),
    isNumber(evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    smsCount(count, is) {
      return is ? (count ? count / this.price : 10) : count / this.price;
    },
    async purchase(item) {
      this.$nuxt.$loading.start();
      if (!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      const valid = await this.$validator.validateAll();
      const { title, bg, price } = item;
      if (!valid && title === 'CUSTOM') {
        this.$nuxt.$loading.finish();
        Swal.fire({
          title: `Error`,
          text: this.errors.items[0].msg,
          type: 'error',
          confirmButtonClass: 'md-button',
          buttonsStyling: false
        });
        return;
      }
      try {
        const total = title === 'CUSTOM' ? `${this.customPrice}.00` : `${price}.00`;
        const params = {
          items: [{
            name: title,
            sku: bg,
            price: total,
            currency: 'USD',
            quantity: 1
          }],
          total: total,
          userId: this.userId
        };
        const { redirectUrl } = await this.purchaseCreate(params);
        window.location.href = redirectUrl;
      } catch (error) {
        Swal.fire({
          title: `Error: ${error.status}`,
          text: error.message,
          type: 'error',
          confirmButtonClass: 'md-button',
          buttonsStyling: false
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .wrapper {
//   .page-header {
//     height: auto;
//     padding: 100px 0;
//   }
// }
.white {
  &.md-field {
    margin: 0;
  }
  .md-input {
    text-align: center;
    -webkit-text-fill-color: #fff !important;
  }
  &.md-field .success.md-icon,
  &.md-field .error.md-icon {
    top: 16px;
  }
}
.md-card {
  .md-card-content {
    min-height: 367px !important;
  }
}
</style>

