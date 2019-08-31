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
                  <div class="md-layout-item md-size-50 info-area ml-auto">
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
                      <h4 class="mt-3">{{ $t('signup.title1') }}</h4>
                    </div>
                    <form>
                      <md-field
                        class="md-form-group"
                        :class="[
                          { 'md-valid': !errors.has('email') && touched.email },
                          { 'md-error': errors.has('email') }
                        ]"
                      >
                        <md-icon>email</md-icon>
                        <label>{{ $t('signup.email') }}</label>
                        <md-input v-model="email" v-validate="modelValidations.email" type="email" data-vv-name="email" required />
                        <slide-y-down-transition>
                          <md-icon v-show="errors.has('email')" class="error">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon v-show="!errors.has('email') && touched.email" class="success">done</md-icon>
                        </slide-y-down-transition>
                      </md-field>
                      <md-field
                        :md-toggle-password="false"
                        class="md-form-group"
                        :class="[
                          { 'md-valid': !errors.has('password') && touched.password },
                          { 'md-error': errors.has('password') }
                        ]"
                      >
                        <md-icon>lock_outline</md-icon>
                        <label>{{ $t('signup.password') }}</label>
                        <md-input ref="password" v-model="password" v-validate="modelValidations.password" type="password" data-vv-name="password" required />
                        <slide-y-down-transition>
                          <md-icon v-show="errors.has('password')" class="error">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon v-show="!errors.has('password') && touched.password" class="success">done</md-icon>
                        </slide-y-down-transition>
                      </md-field>
                      <md-field
                        :md-toggle-password="false"
                        class="md-form-group"
                        :class="[
                          { 'md-valid': !errors.has('confirmPassword') && touched.confirmPass },
                          { 'md-error': errors.has('confirmPassword') }
                        ]"
                      >
                        <md-icon>lock_outline</md-icon>
                        <label>{{ $t('signup.passwordConf') }}</label>
                        <md-input v-model="confirmPassword" v-validate="modelValidations.confirmPassword" type="password" data-vv-as="password" data-vv-name="confirmPassword" required />
                        <slide-y-down-transition>
                          <md-icon v-show="errors.has('confirmPassword')" class="error">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon v-show="!errors.has('confirmPassword') && touched.confirmPass" class="success">done</md-icon>
                        </slide-y-down-transition>
                      </md-field>
                      <!-- <md-checkbox v-model="boolean">I agree to the<a>terms and conditions</a>.</md-checkbox> -->
                      <div class="button-container justify-content-center">
                        <md-button type="submit" class="md-success md-round mt-3" @click.prevent="signup">{{ $t('signup.title') }}</md-button>
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
import { SlideYDownTransition } from 'vue2-transitions';
import Swal from 'sweetalert2';

export default {
  middleware: 'noAuth',
  components: {
    InfoAreas,
    SlideYDownTransition
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: 'signup-page',
  data: () => ({
    image: require('@/assets/img/register.jpg'),
    email: null,
    password: null,
    confirmPassword: null,
    touched: {
      email: false,
      password: false,
      confirmPass: false
    },
    modelValidations: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        min: 5
      },
      confirmPassword: {
        required: true,
        min: 5,
        confirmed: 'password'
      }
    }
  }),
  watch: {
    email() {
      this.touched.email = true;
    },
    password() {
      this.touched.password = true;
    },
    confirmPassword() {
      this.touched.confirmPass = true;
    }
  },
  methods: {
    ...mapActions('users', ['create']),
    ...mapActions('auth', ['authenticate']),
    async signup() {
      const valid = await this.$validator.validateAll();
      this.$nuxt.$loading.start();
      if (!valid) {
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
        const { email, password } = this;
        const credentials = { email, password };
        await this.create(credentials);
        await this.authenticate({ ...credentials, strategy: 'local' });
        this.$router.push(this.$i18n.path(''));
      } catch (error) {
        this.$nuxt.$loading.finish();
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
};
</script>

<style lang="scss" scoped>
@media all and (max-width: 960px) {
  .info-area {
    display: none;
  }
}
.button-container {
  margin-top: 40px;
}
.md-field .success.md-icon,
.md-field .error.md-icon {
  top: 16px;
}
</style>
