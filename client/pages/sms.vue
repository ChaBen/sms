<template>
  <div class="wrapper">
    <!-- Contact Us 1 -->
    <parallax class="page-header header-filter section section-contactus-1 section-image" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-40 md-small-size-100">
            <h2 class="title">Get in Touch</h2>
            <h5 class="description">
              You need more information? Check what other persons are saying
              about our product. They are very happy with their purchase.
            </h5>
            <info-areas info-horizontal icon-color="primary" icon="pin_drop">
              <h4 slot="title" class="info-title">Find us at the office</h4>
              <div slot="content" class="description">
                <p>
                  Bld Mihail Kogalniceanu, nr. 8, <br>
                  7652 Bucharest, <br>
                  Romania
                </p>
              </div>
            </info-areas>
            <info-areas info-horizontal icon-color="primary" icon="phone">
              <h4 slot="title" class="info-title">Give us a ring</h4>
              <div slot="content" class="description">
                <p>
                  Michael Jordan <br>
                  +40 762 321 762 <br>
                  Mon - Fri, 8:00-22:00
                </p>
              </div>
            </info-areas>
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
import { InfoAreas } from '@/components';
import Mixins from '@/plugins/basicMixins';
import * as _ from 'lodash'

export default {
  components: {
    InfoAreas
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    loading: false,
    isPlaySend: false,
    phones: '',
    message: '',
    image: require('@/assets/img/examples/city.jpg')
  }),
  computed: {
    ...mapState('auth', {
      userId: state => state.payload.userId
    }),
    phoneLen() {
      return this.phones ? this.phones.split(/\r*\n/).length : 0;
    }
  },
  methods: {
    ...mapActions('send', {
      sendCreate: 'create'
    }),
    async playSendSms() {
      // this.loading = true;
      // this.isPlaySend = true;
      const to = _.compact(this.phones.split(/\r*\n/).map(item => {
        return item === '' ? false : `82${item}`.trim();
      }));
      const res = await this.sendCreate({
        to,
        text: this.message,
        userId: this.userId
      });
      console.log('res', res);
    },
    stopSendSms() {

    }
  }
};
</script>

<style lang="scss">
.fas {
  margin-right: 5px;
}
.justify-content-between {
  justify-content: space-between !important;
}
</style>
