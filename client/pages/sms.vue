<template>
  <div class="wrapper">
    <!-- Contact Us 1 -->
    <parallax class="page-header header-filter section section-contactus-1 section-image" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-40 md-small-size-100">
            <pricing-card>
              <template slot="cardContent">
                <ul>
                  <li>
                    <h6 class="card-category text-success">SMS건수</h6>
                    <h1 class="card-title"><animated-number :value="user.sendCount"/></animated-number></h1>
                  </li>
                  <li>
                    <h6 class="card-category text-success">sms보낸건수</h6>
                    <h1 class="card-title">{{ user.sendAllCount | Comma }}</h1>
                  </li>
                  <li>
                    <h6 class="card-category text-success">총 충전금액</h6>
                    <h1 class="card-title"><small>$</small>{{ user.chargeAll | Comma }}</h1>
                  </li>
                </ul>
              </template>
            </pricing-card>
          </div>
          <div class="md-layout-item md-size-40 md-small-size-100 ml-auto">
            <md-card class="md-card-contact">
              <md-card-header class="md-card-header-primary text-center">
                <h4 class="card-title">Messages Content</h4>
              </md-card-header>
              <md-card-content>
                <md-field>
                  <label>Send Phones</label>
                  <md-textarea v-model="phones" md-autogrow />
                  <span class="md-count">{{ phoneLen | Comma }}</span>
                </md-field>

                <md-field>
                  <label>Your Message</label>
                  <md-textarea v-model="message" md-autogrow maxlength="100" />
                </md-field>
              </md-card-content>
              <md-card-actions class="md-layout justify-content-between">
                <div class="md-layout-item">
                  <md-progress-spinner v-if="loading" :md-diameter="30" :md-stroke="3" md-mode="indeterminate" />
                </div>
                <div class="md-layout-item">
                  <md-button v-if="!isPlaySend" class="md-primary" @click="playSendSms"><i class="fas fa-play" />Send</md-button>
                  <md-button v-else class="md-primary" @click="stopSendSms"><i class="fas fa-stop" />Stop</md-button>
                </div>
                <div class="md-layout-item" />
              </md-card-actions>
            </md-card>
          </div>
        </div>
      </div>
    </parallax>
    <!-- end Contact Us 1 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { PricingCard, AnimatedNumber } from '@/components';
import Mixins from '@/plugins/basicMixins';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

export default {
  components: {
    PricingCard,
    AnimatedNumber
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    loading: false,
    isPlaySend: false,
    phones: '01084891209\n01074646521',
    message: 'test message',
    image: require('@/assets/img/examples/city.jpg')
  }),
  computed: {
    ...mapState('auth', {
      accessToken: state => state.payload.accessToken,
      userId: state => state.payload.userId
    }),
    phoneLen() {
      return this.phones ? this.phones.split(/\r*\n/).length : 0;
    }
  },
  async asyncData({ store }) {
    const { accessToken } = store.state.auth;
    const { userId } = store.state.auth.payload;
    const { data } = await store.dispatch('users/find', { accessToken, query: { _id: userId }});
    return { user: data[0] }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('send', {
      sendCreate: 'create'
    }),
    async playSendSms() {
      // this.loading = true;
      // this.isPlaySend = true;
      const to = _.compact(this.phones.split(/\r*\n/).map(item => {
        return item === '' ? false : (item.substr(0, 3) === '010' ? `82${item.substr(1)}`.trim() : `82${item}`.trim());
      }));
      try {
        await this.authenticate();
        const res = await this.sendCreate({
          to,
          text: this.message,
          userId: this.userId
        });
        console.log('res', res);
      } catch (error) {
        Swal.fire({
          title: `Error: ${error.status}`,
          text: error.message,
          type: 'error',
          confirmButtonClass: 'md-button',
          buttonsStyling: false
        })
      }
    },
    stopSendSms() {

    }
  }
};
</script>

<style lang="scss" scoped>
.fas {
  margin-right: 5px;
}
.card-title {
  margin-top: 0;
}
.justify-content-between {
  justify-content: space-between !important;
}
</style>
