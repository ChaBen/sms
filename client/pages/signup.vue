<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-80 md-small-size-100 mx-auto text-center">
            <md-card class="md-card md-card-signup">
              <md-card-content>
                <h2 class="card-title text-center">회원가입</h2>
                <div class="md-layout">
                  <div class="md-layout-item md-size-50 md-small-size-100 ml-auto">
                    <template v-for="item in contentLeft">
                      <info-areas
                        :key="item.title"
                        text-left
                        info-horizontal
                        :icon-color="item.colorIcon"
                        :icon="item.icon"
                      >
                        <h4 slot="title" class="info-title">
                          {{ item.title }}
                        </h4>
                        <div slot="content" class="description">
                          <p>{{ item.description }}</p>
                        </div>
                      </info-areas>
                    </template>
                  </div>
                  <div class="md-layout-item md-size-40 md-medium-size-50 md-small-size-100 mr-auto">
                    <div class="social-line text-center">
                      <!-- <md-button class="md-just-icon md-round md-twitter">
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button class="md-just-icon md-round md-dribbble">
                        <i class="fab fa-dribbble"></i>
                      </md-button>
                      <md-button class="md-just-icon md-round md-facebook">
                        <i class="fab fa-facebook-f"></i>
                      </md-button> -->
                      <h4 class="mt-3">3초 가입</h4>
                    </div>
                    <form>
                      <md-field class="md-form-group">
                        <md-icon>email</md-icon>
                        <label>이메일...</label>
                        <md-input v-model="email" type="email" />
                      </md-field>
                      <md-field class="md-form-group">
                        <md-icon>lock_outline</md-icon>
                        <label>비밀번호...</label>
                        <md-input v-model="password" type="password" />
                      </md-field>
                      <md-checkbox v-model="boolean">I agree to the<a>terms and conditions</a>.</md-checkbox>
                      <div class="button-container justify-content-center">
                        <md-button class="md-info md-round mt-3" @click="signup">가입하기</md-button>
                      </div>
                    </form>
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
      <Footer />
    </parallax>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { InfoAreas } from '@/components';
import Mixins from '@/plugins/basicMixins';

import Footer from '@/components/layout/InnerFooter';

export default {
  components: {
    InfoAreas,
    Footer
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: 'signup-page',
  data: () => ({
    boolean: null,
    image: require('@/assets/img/bg7.jpg'),
    email: '',
    password: '',
    contentLeft: [
      {
        colorIcon: 'success',
        icon: 'alarm',
        title: '가입',
        description: '인증없이 이메일 비밀번호로 3초만에 가입'
      },

      {
        colorIcon: 'warning',
        icon: 'verified_user',
        title: '보안',
        description: '최신 보안기술 5,000G 방어강화 서버'
      },

      {
        colorIcon: 'danger',
        icon: 'error_outline',
        title: '주의',
        description: '불유효한 이메일로 가입시 아이디찾기 불가능'
      }
    ]
  }),
  methods: {
    ...mapActions('users', ['create']),
    ...mapActions('auth', ['authenticate']),
    async signup() {
      const { email, password } = this;
      const credentials = { email, password };
      await this.create(credentials);
      await this.authenticate({ ...credentials, strategy: 'local' });
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss"></style>
