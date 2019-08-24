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
                  <small>/ {{ cusPrice }}</small>
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
                    <li><template v-if="local === 'kr'">약 </template><b>{{ priceFilte(customPrice) | Comma }}</b></li>
                    <li><b>{{ perPrice(customPrice) | Comma }}</b> / {{ $t('pricing.send') }}</li>
                  </template>
                  <template v-else>
                    <li>{{ $t('pricing.persms') }} <b>{{ per[item.rate][local] }}</b></li>
                    <li><template v-if="local === 'kr'">약 </template><b>{{ priceFilte(item.price) | Comma }}</b></li>
                    <li><b>{{ perPrice(item.price) | Comma }}</b> / {{ $t('pricing.send') }}</li>
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
    per: [{
      price: 0.016666,
      us: 0.016,
      kr: '20원'
    }, {
      price: 0.013333,
      us: 0.013,
      kr: '16원'
    }, {
      price: 0.011755,
      us: 0.011,
      kr: '14원'
    }],
    customPrice: null,
    pricings: [
      {
        class: 'mr-auto',
        bg: 'success',
        btn: 'md-white',
        title: 'GREEN',
        rate: 0,
        price: 100
      },
      {
        class: 'mr-auto',
        bg: 'behance',
        btn: 'md-white',
        title: 'BLUE',
        rate: 1,
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
    }),
    local() {
      const params = this.$route.params;
      return params.hasOwnProperty('lang') ? params.lang : 'us';
    },
    cusPrice() {
      const price = this.customPrice;
      if (price < 1000) {
        return this.per[0][this.local];
      } else if (price < 3000) {
        return this.per[1][this.local];
      } else if (price >= 3000) {
        return this.per[2][this.local];
      }
      return this.per[0][this.local];
    }
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
      return is !== undefined ? (count ? count / this.price : 10) : count / this.price;
    },
    priceFilte(price) {
      const lang = this.local;
      const krRate = 1200;
      const cnRate = 170;
      let rate = 1;
      if (lang === 'kr') {
        rate = krRate;
      }
      const money = lang === 'cn' ? (price * krRate) / cnRate : price * rate;

      return lang === 'kr' ? Math.floor(money) + '원' : Math.floor(money);
    },
    perPrice(price) {
      let per = 0;
      if (price < 1000) {
        per = price / this.per[0].price;
      } else if (price < 3000) {
        per = price / this.per[1].price
      } else if (price >= 3000) {
        per = price / this.per[2].price;
      }
      return Math.floor(per);
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

