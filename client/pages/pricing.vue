<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-100 justify-content-center mx-auto text-center"
          >
            <h2 class="title">Pick the best plan for you</h2>
            <h5 class="description">
              You have Free Unlimited Updates and Premium Support on each
              package.
            </h5>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-size-33 md-small-size-100 ml-auto">
            <pricing-card :card-bg="''">
              <template slot="cardContent">
                <h6 class="card-category text-gray">Free</h6>
                <h1 class="card-title">
                  <small>$</small>0
                  <small>/mo</small>
                </h1>
                <ul>
                  <li><b>1</b> Project</li>
                  <li><b>5</b> Team Members</li>
                  <li><b>55</b> Personal Contacts</li>
                  <li><b>5.000</b> Messages</li>
                </ul>

                <md-button
                  href="javascript:void(0)"
                  class="md-primary md-round"
                >
                  Get Started
                </md-button>
              </template>
            </pricing-card>
          </div>
          <div class="md-layout-item md-size-33 md-small-size-100 mr-auto">
            <pricing-card card-bg="rose">
              <template slot="cardContent">
                <h6 class="card-category">3,000회수</h6>
                <h1 class="card-title">
                  <small>₩</small>50,000
                  <small>원</small>
                </h1>
                <ul>
                  <li><b>500</b> 회수추가</li>
                  <li><b>100</b> Team Members</li>
                  <li><b>550</b> Personal Contacts</li>
                  <li><b>5,000</b> 부가세</li>
                </ul>

                <md-button @click="purchase" class="md-white md-round">
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
import { PricingCard } from "@/components";
import Mixins from "@/plugins/basicMixins";

export default {
  components: {
    PricingCard
  },
  mixins: [Mixins.HeaderImage],
  computed: {
    ...mapState('auth', {
      userId: state => state.payload.userId
    })
  },
  data: () => ({
    image: require("@/assets/img/examples/city.jpg"),
    pricings: [
      {
        title: 'Free',
        price: 0,
        each: 0,
        plus: 0,
        count: 3,
      }
    ]
  }),
  methods: {
    ...mapActions('purchase', {
      purchaseCreate: 'create'
    }),
    async purchase() {
      const data = await this.purchaseCreate({ userId: this.userId });
      window.location.href = data.redirectUrl;
      console.log('data', data);
    }
  }
}
</script>