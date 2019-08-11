<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-100 justify-content-center mx-auto text-center">
            <h2 class="title">Pick the best plan for you</h2>
            <h5 class="description">
              You have Free Unlimited Updates and Premium Support on each
              package.
            </h5>
          </div>
        </div>
        <div class="md-layout">
          <div v-for="(item, key) in pricings" :key="key" class="md-layout-item md-size-33 md-small-size-100" :class="item.class">
            <pricing-card :card-bg="item.bg">
              <template slot="cardContent">
                <h6 class="card-category text-gray">{{ item.title }}</h6>
                <h1 class="card-title">
                  <small>$</small>{{ item.price }}
                  <small>/mo</small>
                </h1>
                <ul>
                  <li><b>{{ item.price }}</b> Project</li>
                  <li><b>{{ item.plus }}</b> Team Members</li>
                  <li><b>{{ item.count }}</b> Personal Contacts</li>
                </ul>

                <md-button href="javascript:void(0)" class="md-round" :class="item.btn" @click="purchase">
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
import { PricingCard } from '@/components';
import Mixins from '@/plugins/basicMixins';
import Swal from 'sweetalert2';

const price = 0.02;

export default {
  components: {
    PricingCard
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    image: require('@/assets/img/examples/city.jpg'),
    pricings: [
      {
        class: 'ml-auto',
        bg: '',
        btn: 'md-primary',
        title: 'Free',
        price: 0,
        plus: 0,
        count: 3
      },
      {
        class: 'mr-auto',
        bg: 'rose',
        btn: 'md-white',
        title: 'Pink',
        price: 10,
        plus: 0,
        count: 10 / price
      },
      {
        class: 'mr-auto',
        bg: 'primary',
        btn: 'md-white',
        title: 'Purple',
        price: 50,
        count: 50 / price
      },
      {
        class: 'mr-auto',
        bg: 'black',
        btn: 'md-white',
        title: 'Purple',
        price: 50,
        count: 100 / price
      }
    ]
  }),
  computed: {
    ...mapState('auth', {
      isLogin: state => state.payload,
      userId: state => state.payload.userId
    })
  },
  methods: {
    ...mapActions('purchase', {
      purchaseCreate: 'create'
    }),
    async purchase() {
      if (!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      try {
        const { redirectUrl } = await this.purchaseCreate({ userId: this.userId });
        window.location.href = redirectUrl;
      } catch (error) {
        Swal.fire({
          title: `Error: ${error.status}`,
          text: error.message,
          type: 'error',
          confirmButtonClass: 'md-button',
          buttonsStyling: false
        })
      }
    }
  }
}
</script>
