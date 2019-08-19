<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">{{ $t('login.title') }}</h4>
              <p slot="description" class="description">
                <nuxt-link to="/signup">{{ $t('login.signup') }}</nuxt-link>
              </p>
              <md-field slot="inputs" class="md-form-group">
                <md-icon>email</md-icon>
                <label>{{ $t('login.email') }}</label>
                <md-input v-model="email" type="email" />
              </md-field>
              <md-field slot="inputs" class="md-form-group">
                <md-icon>lock_outline</md-icon>
                <label>{{ $t('login.password') }}</label>
                <md-input v-model="password" type="password" @keydown.enter="login" />
              </md-field>
              <md-button slot="footer" type="submit" class="md-button md-round md-success" @click="login">
                {{ $t('login.title') }}
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { LoginCard } from '@/components';
import Mixins from '@/plugins/basicMixins';
import Swal from 'sweetalert2';

export default {
  middleware: 'noAuth',
  components: {
    LoginCard
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: 'login-page',
  data: () => ({
    image: require('@/assets/img/profile_city.jpg'),
    email: 'ckqlss@gmail.com',
    password: 'admin520'
  }),
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate'
    }),
    async login() {
      const credentials = { email: this.email, password: this.password };
      try {
        await this.authenticate({ ...credentials, strategy: 'local' });
        this.$router.push('/');
      } catch (error) {
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
