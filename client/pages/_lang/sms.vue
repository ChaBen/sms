<template>
  <div class="wrapper">
    <!-- Contact Us 1 -->
    <div class="page-header section section-contactus-1 section-image" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-40 md-small-size-100">
            <pricing-card>
              <template slot="cardContent">
                <ul>
                  <li>
                    <h6 class="card-category text-success">{{ $t('sms.total') }}</h6>
                    <h1 class="card-title">{{ getUser[0].sendCount | Comma }}</h1>
                  </li>
                  <li>
                    <h6 class="card-category text-success">{{ $t('sms.send') }}</h6>
                    <h1 class="card-title">{{ getUser[0].sendAllCount | Comma }}</h1>
                  </li>
                  <li>
                    <h6 class="card-category text-success">{{ $t('sms.account') }}</h6>
                    <h1 class="card-title"><small>$</small>{{ getUser[0].chargeAll | Comma }}</h1>
                  </li>
                </ul>
              </template>
            </pricing-card>
          </div>
          <div class="md-layout-item md-size-40 md-small-size-100 ml-auto">
            <md-card class="md-card-contact">
              <md-card-header class="md-card-header-primary text-center">
                <h4 class="card-title">{{ $t('sms.title') }}</h4>
              </md-card-header>
              <md-card-content>
                <md-field>
                  <label>{{ $t('sms.phone') }}</label>
                  <md-textarea v-model="phones" />
                  <span class="md-count">{{ phoneLen | Comma }}</span>
                </md-field>

                <md-field>
                  <label>{{ $t('sms.textarea') }}</label>
                  <md-textarea v-model="message" maxlength="100" />
                </md-field>
              </md-card-content>
              <md-card-actions class="md-layout justify-content-between">
                <div class="md-layout-item">
                  <md-progress-spinner v-if="loading" :md-diameter="30" :md-stroke="3" md-mode="indeterminate" />
                </div>
                <div class="md-layout-item">
                  <md-button v-if="!isPlaySend" class="md-primary" @click="playSendSms"><i class="fas fa-play" />{{ $t('sms.btn') }}</md-button>
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
          <Tasks :tasks="sendTasks" @refresh="getSendResponse" />
          <!-- <div class="pagination-box">
            <pagination
              v-model="pagination.currentPage"
              no-arrows
              class="pagination-no-border pagination-success"
              :per-page="pagination.perPage"
              :total="total"
            />
          </div> -->
          <!-- <tabs
            :tab-active="1"
            :tab-name="['Tasks', 'Dashboard', 'History']"
            :tab-icon="['list', 'dashboard', 'schedule']"
            pills-align="center"
            plain
            nav-pills-icons
            color-button="primary"
          >
            <template slot="tab-pane-1">
              <Tasks :tasks="sendTasks" @refresh="getSendResponse" />
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
          </tabs> -->
        </div>
      </div>
    </div>
    <Footer />
    <!-- end Contact Us 1 -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { PricingCard } from '@/components';
import { Tasks } from '@/components/sms';
import Footer from '@/components/layout/InnerFooter';
import Mixins from '@/plugins/basicMixins';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

export default {
  components: {
    PricingCard,
    // Tabs,
    Tasks,
    // History,
    // Pagination,
    Footer
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    loading: false,
    isPlaySend: false,
    sendTasks: [],
    file: null,
    // phones: '01084891209',
    phones: '01084891209\n01074646521',
    message: `안녕하세요~`,
    image: require('@/assets/img/bg5.jpg'),
    pagination: {
      perPage: 5,
      currentPage: 1
    }
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
    },
    total() {
      return this.sendTasks.length;
    }
  },
  async fetch({ store }) {
    const userId = store.state.auth.payload.userId;
    if (userId) {
      await store.dispatch('users/find', { query: { _id: userId }});
      await store.dispatch('send/find', { query: { userId }});
    }
  },
  async created() {
    await this.getSendResponse();
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate',
      userFindAction: 'users/find',
      actSendFind: 'send/find',
      sendCreate: 'send/create',
      sendAfterOrUpdate: 'send/addOrUpdate'
    }),
    async playSendSms() {
      const to = _.compact(this.phones.split(/\r*\n/).map(item => {
        const phone = item.replace(/-/gi, '');
        return phone === '' ? false : (phone.substr(0, 3) === '010' ? `82${phone.substr(1)}`.trim() : `82${phone}`.trim());
      }));
      const sendCount = this.getUser[0].sendCount;
      if (to.length > sendCount) {
        this.swalAlert('Error', '남아있는 SMS건수가 부족합니다.', 'error');
        return;
      }
      this.$nuxt.$loading.start();
      try {
        await this.sendCreate({
          to,
          text: this.message,
          status: 1,
          userId: this.userId
        });
        await this.userFindAction({ query: { _id: this.userId }});
        await this.getSendResponse();
        this.phones = null;
        this.$nuxt.$loading.finish();
      } catch (error) {
        this.$nuxt.$loading.finish();
        Swal.fire({
          title: `Error: ${error.status}`,
          text: error.message,
          type: 'error',
          confirmButtonClass: 'md-button',
          buttonsStyling: false
        })
      }
    },
    async getSendResponse(id) {
      try {
        const { userId } = this;
        const query = id !== undefined ? { userId, _id: id } : { userId };
        const sends = await this.actSendFind({ query });
        if (id === undefined) {
          this.sendTasks = sends.reverse();
        } else {
          const key = this.sendTasks.findIndex(item => item.id === sends[0].id);
          this.sendTasks[key] = sends.reverse();
        }
      } catch (error) {
        Swal.fire({
          title: `Error`,
          text: error.message,
          type: 'error',
          confirmButtonClass: 'md-button',
          buttonsStyling: false
        })
      }
      // this.$nuxt.$loading.finish();
    },
    swalAlert(title, msg, type) {
      Swal.fire({
        title,
        text: msg,
        type,
        confirmButtonClass: 'md-button',
        buttonsStyling: false
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper .page-header {
  height: 700px;
}
@media (max-width: 960px) {
  .wrapper {
    overflow: hidden;
    .page-header {
      height: auto;
    }
  }
  .container {
    padding: 30px 0 50px 0;
  }
}
.section {
  padding: 30px 0;
  min-height: 500px;
}
.md-textarea {
  padding: 0 !important;
  resize: none !important;
}
.fas {
  margin-right: 5px;
}
.section-contactus-1 .md-card-contact .md-card-header .card-title {
  margin-top: .625rem;
}
.card-title {
  margin-top: 0;
}
.pagination-box {
  display: block;
  justify-content: center;
  align-items: center;
}
.justify-content-between {
  justify-content: space-between !important;
}
</style>
