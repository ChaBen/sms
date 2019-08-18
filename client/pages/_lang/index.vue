<template>
  <div class="wrapper index-page">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-100 ml-auto text-right">
            <h1 class="title">{{ $t('index.title') }}</h1>
            <h4>{{ $t('index.desc') }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="main main-raised">
      <!-- Features 1 -->
      <div class="section section-features-1">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-small-size-100 mx-auto text-center"
            >
              <h2 class="title">{{ $t('index.title1') }}</h2>
              <h5 class="description">{{ $t('index.desc1') }}</h5>
            </div>
          </div>
          <div class="md-layout">
            <div v-for="(item, key) in $t('index.desc1Sec')" :key="key" class="md-layout-item md-size-33 md-small-size-100">
              <info-areas :icon-color="item.color" :icon="item.icon" text-center>
                <h4 slot="title" class="info-title">{{ item.title }}</h4>
                <p slot="content">{{ item.desc }}</p>
              </info-areas>
            </div>
          </div>
        </div>
      </div>
      <!-- end Features 1 -->

      <!-- Features 2 -->
      <div class="section section-features-4">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-medium-size-100 mx-auto text-center">
              <h2 class="title">{{ $t('index.sec1Title') }}</h2>
              <h5 class="description">{{ $t('index.sec1Desc') }}</h5>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-size-25 md-small-size-100 ml-auto">
              <info-areas v-for="(item, key) in $t('index.sec1')" :key="key" info-horizontal :icon-color="item.color" :icon="item.icon">
                <h4 slot="title" class="info-title">{{ item.title }}</h4>
                <div slot="content" class="description">
                  <p>{{ item.desc }}</p>
                </div>
              </info-areas>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <div class="phone-container">
                <img :src="iphone2">
              </div>
            </div>
            <div class="md-layout-item md-size-25 md-small-size-100 mr-auto">
              <info-areas v-for="(item, key) in $t('index.sec2')" :key="key" info-horizontal :icon-color="item.color" :icon="item.icon">
                <h4 slot="title" class="info-title">{{ item.title }}</h4>
                <div slot="content" class="description">
                  <p>{{ item.desc }}</p>
                </div>
              </info-areas>
            </div>
          </div>
        </div>
      </div>
      <!-- end Features 2 -->

      <!-- Features 3 -->

      <div class="section section-features-3">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-33 md-small-size-100">
              <div class="phone-container">
                <img :src="iphone">
              </div>
            </div>
            <div class="md-layout-item md-size-66 md-small-size-100">
              <!-- Some <br /> tags to push the text to align with the image, you can remove it if you have more text on the right side :-) -->
              <h2 class="title">{{ $t('index.secTitle') }}</h2>
              <info-areas v-for="(item, key) in $t('index.sec')" :key="key" info-horizontal icon-color="primary" :icon="item.icon">
                <h4 slot="title" class="info-title">{{ item.title }}</h4>
                <div slot="content" class="description">
                  <p>{{ item.desc }}</p>
                </div>
              </info-areas>
            </div>
          </div>
        </div>
      </div>
      <!-- end Features 3 -->

      <!-- Features 5 -->
      <Footer />
      <!-- end Features 5 -->
    </div>
  </div>
</template>

<script>
import { InfoAreas } from '@/components';
import Footer from '@/components/layout/InnerFooter';
import Mixins from '@/plugins/basicMixins';

export default {
  components: {
    InfoAreas,
    Footer
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    year: new Date().getFullYear(),
    iphone: require('@/assets/img/sections/iphone.png'),
    iphone2: require('@/assets/img/sections/iphone3.png'),
    image: require('@/assets/img/dg1.jpg')
  })
}
</script>

<style>
.index-page .page-header {
  height: 80vh;
}
</style>
