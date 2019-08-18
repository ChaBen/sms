<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-80 md-small-size-100 mx-auto text-center">
            <md-card class="md-card md-card-signup">
              <md-card-content>
                <h2 class="card-title text-center">{{ $t('signup.title') }}</h2>
                <div class="md-layout">
                  <div class="md-layout-item md-size-50 md-small-size-100 ml-auto">
                    <template v-for="item in $t('signup.sec')">
                      <info-areas
                        :key="item.title"
                        text-left
                        info-horizontal
                        :icon-color="item.color"
                        :icon="item.icon"
                      >
                        <h4 slot="title" class="info-title">{{ item.title }}</h4>
                        <div slot="content" class="description">
                          <p>{{ item.desc }}</p>
                        </div>
                      </info-areas>
                    </template>
                  </div>
                  <div class="md-layout-item md-size-40 md-medium-size-50 md-small-size-100 mr-auto">
                    <div class="social-line text-center">
                      <h4 class="mt-3">빠른 가입 이용해보세요.</h4>
                    </div>
                    <form>
                      <md-field class="md-form-group">
                        <md-icon>email</md-icon>
                        <label>{{ $t('signup.email') }}</label>
                        <md-input v-model="email" type="email" />
                      </md-field>
                      <md-field class="md-form-group">
                        <md-icon>lock_outline</md-icon>
                        <label>{{ $t('signup.password') }}</label>
                        <md-input v-model="password" type="password" />
                      </md-field>
                      <md-field class="md-form-group">
                        <md-icon>lock_outline</md-icon>
                        <label>{{ $t('signup.passwordConf') }}</label>
                        <md-input v-model="confirmPassword" type="password" />
                      </md-field>
                      <!-- <md-checkbox v-model="boolean">I agree to the<a>terms and conditions</a>.</md-checkbox> -->
                      <div class="button-container justify-content-center">
                        <md-button class="md-info md-round mt-3" @click="signup">{{ $t('signup.title') }}</md-button>
                      </div>
                    </form>
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </parallax>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { InfoAreas } from '@/components';
import Mixins from '@/plugins/basicMixins';

export default {
  components: {
    InfoAreas
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: 'signup-page',
  data: () => ({
    boolean: null,
    image: require('@/assets/img/bg7.jpg'),
    email: '',
    password: '',
    confirmPassword: ''
  }),
  methods: {
    ...mapActions('users', ['create']),
    ...mapActions('auth', ['authenticate']),
    async signup() {
      const { email, password } = this;
      const credentials = { email, password, sendCount: 3, sendAllCount: 0, chargeAll: 0, level: 1 };
      await this.create(credentials);
      await this.authenticate({ ...credentials, strategy: 'local' });
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss"></style>
