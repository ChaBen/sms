<template>
  <div class="wrapper pull-page">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">{{ $t('login.title') }}</h4>
              <p slot="description" class="description">
                <nuxt-link :to="$i18n.path('signup')">{{ $t('login.signup') }}</nuxt-link>
              </p>
              <md-field slot="inputs" class="md-form-group">
                <md-icon>email</md-icon>
                <label>{{ $t('login.email') }}</label>
                <md-input v-model="email" type="email" autofocus />
              </md-field>
              <md-field slot="inputs" class="md-form-group" :md-toggle-password="false">
                <md-icon>lock_outline</md-icon>
                <label>{{ $t('login.password') }}</label>
                <md-input v-model="password" type="password" @keydown.enter="login" />
              </md-field>
              <md-button slot="footer" type="submit" class="md-button md-round md-success" @click.prevent="login">
                {{ $t('login.title') }}
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { LoginCard } from '@/components';
import Mixins from '@/plugins/basicMixins';
import Swal from 'sweetalert2';
import Footer from '@/components/layout/PageFooter';

export default {
  middleware: 'noAuth',
  components: {
    LoginCard,
    Footer
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: 'login-page',
  data: () => ({
    image: require('@/assets/img/login.jpg'),
    // email: 'ckqlss@gmail.com',
    email: null,
    // password: 'admin520',
    password: null
  }),
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate'
    }),
    async login() {
      const credentials = { email: this.email, password: this.password };
      try {
        this.$nuxt.$loading.start();
        await this.authenticate({ ...credentials, strategy: 'local' });
        this.$router.push(this.$i18n.path(''));
      } catch (error) {
        this.$nuxt.$loading.finish();
        Swal.fire({
          title: `Error: ${error.code}`,
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

<style lang="css"></style>
