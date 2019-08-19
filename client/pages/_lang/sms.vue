<template>
  <div class="wrapper">
    <!-- Contact Us 1 -->
    <div class="page-header header-filter section section-contactus-1 section-image" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-40 md-small-size-100">
            <pricing-card>
              <template slot="cardContent">
                <ul>
                  <li>
                    <h6 class="card-category text-success">SMS남은건수</h6>
                    <h1 class="card-title">{{ getUser[0].sendCount | Comma }}</h1>
                  </li>
                  <li>
                    <h6 class="card-category text-success">sms보낸건수</h6>
                    <h1 class="card-title">{{ getUser[0].sendAllCount | Comma }}</h1>
                  </li>
                  <li>
                    <h6 class="card-category text-success">총 충전금액</h6>
                    <h1 class="card-title"><small>$</small>{{ getUser[0].chargeAll | Comma }}</h1>
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
                  <md-textarea v-model="phones" />
                  <span class="md-count">{{ phoneLen | Comma }}</span>
                </md-field>

                <md-field>
                  <label>Your Message</label>
                  <md-textarea v-model="message" maxlength="100" />
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
    </div>
    <div class="main main-raised">
      <!-- Features 1 -->
      <div class="section section-features-1">
        <div class="container">
          <tabs
            :tab-active="1"
            :tab-name="['Tasks', 'Dashboard', 'History']"
            :tab-icon="['list', 'dashboard', 'schedule']"
            pills-align="center"
            plain
            nav-pills-icons
            color-button="primary"
          >
            <!-- here you can add your content for tab-content -->
            <template slot="tab-pane-1">
              <Tasks />
            </template>
            <template slot="tab-pane-2">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br><br>
              Dramatically maintain clicks-and-mortar solutions without
              functional solutions.
            </template>
            <template slot="tab-pane-3">
              <History />
            </template>
          </tabs>
        </div>
      </div>
    </div>
    <!-- end Contact Us 1 -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { PricingCard, Tabs } from '@/components';
import { Tasks, History } from '@/components/sms'
import Mixins from '@/plugins/basicMixins';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

export default {
  components: {
    PricingCard,
    Tabs,
    Tasks,
    History
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
      userId: state => state.payload.userId
    }),
    ...mapGetters({
      userFind: 'users/find',
      sendFind: 'send/find'
    }),
    getUser() {
      return this.userFind({ query: { _id: this.userId }}).data;
    },
    getSend() {
      return this.sendFind({ query: { userId: this.userId }}).data;
    },
    phoneLen() {
      return this.phones ? this.phones.split(/\r*\n/).length : 0;
    }
  },
  async fetch({ store }) {
    const userId = store.state.auth.payload.userId;
    if (userId) {
      await store.dispatch('users/find', { query: { _id: userId }});
      await store.dispatch('send/find', { query: { userId }});
    }
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate',
      userFindAction: 'users/find',
      sendCreate: 'send/create',
      sendAfterOrUpdate: 'send/addOrUpdate'
    }),
    async playSendSms() {
      // this.loading = true;
      // this.isPlaySend = true;
      const to = _.compact(this.phones.split(/\r*\n/).map(item => {
        return item === '' ? false : (item.substr(0, 3) === '010' ? `82${item.substr(1)}`.trim() : `82${item}`.trim());
      }));
      try {
        const sendRes = await this.sendCreate({
          to,
          text: this.message,
          userId: this.userId
        });
        await this.userFindAction({ query: { _id: this.userId }});
        console.log('done', sendRes);
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
.wrapper .page-header {
  min-height: 700px;
}
.section {
  padding: 30px 0;
}
.md-textarea {
  padding: 0 !important;
  resize: none !important;
}
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
