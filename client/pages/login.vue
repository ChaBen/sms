<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">로그인</h4>
              <!-- <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button> -->
              <p slot="description" class="description">Or Be Classical</p>
              <!-- <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>First Name...</label>
                <md-input v-model="firstname"></md-input>
              </md-field> -->
              <md-field slot="inputs" class="md-form-group">
                <md-icon>email</md-icon>
                <label>이메일...</label>
                <md-input v-model="email" type="email" />
              </md-field>
              <md-field slot="inputs" class="md-form-group">
                <md-icon>lock_outline</md-icon>
                <label>비밀번호...</label>
                <md-input v-model="password" type="password" @keydown.enter="login" />
              </md-field>
              <md-button slot="footer" type="submit" class="md-button md-round md-success" @click="login">
                로그인
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

export default {
  components: {
    LoginCard
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: 'login-page',
  data: () => ({
    image: require('@/assets/img/profile_city.jpg'),
    email: null,
    password: null
  }),
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login() {
      const credentials = { email: this.email, password: this.password };
      try {
        await this.authenticate({ ...credentials, strategy: 'local' });
        this.$router.push('/');
      } catch (error) {
        console.info('error', error);
      }
    }
  }
};
</script>

<style lang="css"></style>
