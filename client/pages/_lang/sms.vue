<template>
  <div class="wrapper">
    <!-- Contact Us 1 -->
    <div class="page-header section section-contactus-1 section-image" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-40 md-small-size-100">
            <pricing-card>
              <template v-if="user" slot="cardContent">
                <ul>
                  <li>
                    <h6 class="card-category text-success">{{ $t('sms.total') }}</h6>
                    <h1 class="card-title">{{ user.sendCount | Comma }}</h1>
                  </li>
                  <li>
                    <h6 class="card-category text-success">{{ $t('sms.send') }}</h6>
                    <h1 class="card-title">{{ user.sendAllCount | Comma }}</h1>
                  </li>
                  <li>
                    <h6 class="card-category text-success">{{ $t('sms.account') }}</h6>
                    <h1 class="card-title"><small>$</small>{{ user.chargeAll | Comma }}</h1>
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
                <md-field
                  :class="[
                    { 'md-valid': !errors.has('phones') && touched.phones },
                    { 'md-error': errors.has('phones') }
                  ]"
                >
                  <label>{{ $t('sms.phone') }}</label>
                  <md-textarea
                    v-model="phones"
                    v-validate="modelValidations.phones"
                    data-vv-name="phones"
                  />
                  <span class="md-count">{{ phoneLen | Comma }}</span>
                  <slide-y-down-transition>
                    <md-icon v-show="errors.has('phones')" class="error">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon v-show="!errors.has('phones') && touched.phones" class="success">done</md-icon>
                  </slide-y-down-transition>
                </md-field>

                <md-field
                  :class="[
                    { 'md-valid': !errors.has('message') && touched.message },
                    { 'md-error': errors.has('message') }
                  ]"
                >
                  <label>{{ $t('sms.textarea') }}</label>
                  <md-textarea
                    v-model="message"
                    v-validate="modelValidations.message"
                    data-vv-name="message"
                    maxlength="100"
                  />
                  <slide-y-down-transition>
                    <md-icon v-show="errors.has('message')" class="error">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon v-show="!errors.has('message') && touched.message" class="success">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </md-card-content>
              <md-card-actions class="md-layout justify-content-center">
                <md-button class="md-primary" @click="playSendSms"><i class="fas fa-play" />{{ $t('sms.btn') }}</md-button>
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
            :tab-name="['Tasks', 'Dashboard']"
            :tab-icon="['list', 'dashboard']"
            pills-align="center"
            plain
            nav-pills-icons
            color-button="primary"
          >
            <template slot="tab-pane-1">
              <Tasks :tasks="sendTasks" @refresh="getSendResponse" />
              <div class="pagination-box">
                <pagination
                  v-model="pagination.currentPage"
                  no-arrows
                  class="pagination-no-border pagination-success"
                  :per-page="pagination.perPage"
                  :total="total"
                />
              </div>
            </template>
            <template slot="tab-pane-2">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br><br>
              Dramatically maintain clicks-and-mortar solutions without
              functional solutions.
            </template>
          </tabs>
        </div>
      </div>
    </div>
    <Footer />
    <!-- end Contact Us 1 -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { SlideYDownTransition } from 'vue2-transitions';
import { PricingCard, Tabs, Pagination } from '@/components';
import { Tasks } from '@/components/sms';
import Footer from '@/components/layout/InnerFooter';
import Mixins from '@/plugins/basicMixins';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

export default {
  components: {
    PricingCard,
    Tabs,
    Tasks,
    SlideYDownTransition,
    Pagination,
    Footer
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    sendTasks: [],
    phones: '',
    // phones: '01084891209\n01074646521',
    message: '',
    image: require('@/assets/img/bg5.jpg'),
    modelValidations: {
      phones: {
        required: true
      },
      message: {
        required: true,
        max: 100
      }
    },
    touched: {
      phones: false,
      message: false
    },
    pagination: {
      perPage: 5,
      currentPage: 1
    }
  }),
  computed: {
    ...mapState('auth', {
      user: state => state.user,
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
  watch: {
    phones() {
      this.touched.phones = true;
    },
    message() {
      this.touched.message = true;
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
      const valid = await this.$validator.validateAll();
      const sendCount = this.getUser[0].sendCount;
      if (!valid) {
        this.swalAlert('Error', this.errors.items[0].msg, 'error');
        return;
      } else if (to.length > 100000) {
        this.swalAlert('Error', '한번에 100,000개만이하로 해주세요.', 'error');
        return;
      } else if (to.length > sendCount) {
        this.swalAlert('Error', '남아있는 SMS건수가 부족합니다.', 'error');
        return;
      }
      this.$nuxt.$loading.start();
      try {
        await this.sendCreate({
          to,
          text: this.message,
          userId: this.userId,
          status: 1
        });
        await this.authenticate();
        await this.getSendResponse();
        this.swalAlert('성공', '', 'success');
        this.smsReset();
        this.$nuxt.$loading.finish();
      } catch (error) {
        this.$nuxt.$loading.finish();
        this.swalAlert(`Error: ${error.status}`, error.message, 'error');
      }
    },
    smsReset() {
      this.phones = '';
      this.message = '';
      this.touched.phones = false;
      this.touched.message = false;
      this.$validator.reset();
    },
    async getSendResponse(id) {
      try {
        await this.authenticate();
        const { userId } = this;
        const query = id !== undefined ? { userId, _id: id } : { userId };
        const sends = await this.actSendFind({ query });
        if (id === undefined) {
          this.sendTasks = sends.reverse();
        } else {
          const key = this.sendTasks.findIndex(item => item.id === sends[0].id);
          this.$set(this.sendTasks, key, sends[0]);
        }
      } catch (error) {
        this.swalAlert('Error', error.message, 'error');
      }
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
.md-field.md-has-textarea:not(.md-autogrow)>.md-icon {
  right: 15px;
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
