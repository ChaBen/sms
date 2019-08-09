<template>
  <div class="wrapper">
    <parallax class="page-header header-filter section section-pricing-1 section-image" parallax-active="false" :style="headerStyle">
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
          <div class="md-layout-item md-size-50 md-small-size-100 md-large-size-25">
            <pricing-card card-plain>
              <template slot="cardContent">
                <h6 class="card-category text-gray">Freelancer</h6>
                <div class="icon">
                  <i class="material-icons">weekend</i>
                </div>
                <h3 class="card-title">Free</h3>
                <p class="card-description">
                  This is good if your company size is between 2 and 10 Persons.
                </p>
                <md-button href="javascript:void(0)" class="md-white md-round">
                  Choose Plan
                </md-button>
              </template>
            </pricing-card>
          </div>
          <div class="md-layout-item md-size-50 md-small-size-100 md-large-size-25">
            <pricing-card>
              <template slot="cardContent">
                <h6 class="card-category text-gray">Small Company</h6>
                <div class="icon icon-rose">
                  <i class="material-icons">people</i>
                </div>
                <h3 class="card-title">$29</h3>
                <p class="card-description">
                  This is good if your company size is between 2 and 10 Persons.
                </p>
                <md-button href="javascript:void(0)" class="md-rose md-round">
                  Choose Plan
                </md-button>
              </template>
            </pricing-card>
          </div>
          <div class="md-layout-item md-size-50 md-small-size-100 md-large-size-25">
            <pricing-card card-plain>
              <template slot="cardContent">
                <h6 class="card-category text-gray">Medium Company</h6>
                <div class="icon">
                  <i class="material-icons">business</i>
                </div>
                <h3 class="card-title">$69</h3>
                <p class="card-description">
                  This is good if your company size is between 11 and 99
                  Persons.
                </p>
                <md-button href="javascript:void(0)" class="md-white md-round">
                  Choose Plan
                </md-button>
              </template>
            </pricing-card>
          </div>
          <div class="md-layout-item md-size-50 md-small-size-100 md-large-size-25">
            <pricing-card card-plain>
              <template slot="cardContent">
                <h6 class="card-category text-gray">Enterprise</h6>
                <div class="icon">
                  <i class="material-icons">account_balance</i>
                </div>
                <h3 class="card-title">$159</h3>
                <p class="card-description">
                  This is good if your company size is 99+ persons.
                </p>
                <md-button href="javascript:void(0)" class="md-white md-round">
                  Choose Plan
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
import { PricingCard } from '@/components';
import Mixins from '@/plugins/basicMixins';

export default {
  components: {
    PricingCard
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    image: require('@/assets/img/bg11.jpg')
  })
}
</script>
