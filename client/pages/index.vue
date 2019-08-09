<template>
  <div class="wrapper index-page">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-100 ml-auto text-right"
          >
            <h1 class="title">간편한 SMS 보내기</h1>
            <h4>
              오늘날 전 세계 모바일 사용자는 그 어느 때보 다 중요합니다. 모바일 마케팅을 통해 타겟 고객을 끌어 들이지 않는다면, 고객과 연락하고, 정보를 얻고, 비즈니스를 수행 할 수있는 훌륭한 마케팅 도구를 놓치고있는 것입니다.
            </h4>
            <br>
            <md-button
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              class="md-success md-lg"
              target="_blank"
            >
              <i class="fas fa-ticket-alt" />
              <span>Invest Now</span>
            </md-button>
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
              <h2 class="title">대량 SMS 메시지 란 무엇 입니까?</h2>
              <h5 class="description">대량 SMS는 한 번의 클릭으로 전화 번호로 한 번에 수백, 심지어 수백 개의 SMS 메시지를 보낼 수있는 기술입니다. 대량 SMS를 보낼 때 하나의 발신 또는 전달 된 SMS 메시지의 비용이 상당히 저렴 해집니다. SMS 송신자로 수신자의 휴대 전화 문자 인 발신자 이름을 설정할 수도 있습니다. 간편한 SMS 보내기는 고품질 일괄 SMS 메시지 서비스에서부터 모든 것을 제공합니다</h5>
            </div>
          </div>
          <div class="md-layout">
            <div v-for="(item, key) in section1" :key="key" class="md-layout-item md-size-33 md-small-size-100">
              <info-areas :icon-color="item.color" :icon="item.icon" text-center>
                <h4 slot="title" class="info-title">{{ item.title }}</h4>
                <p slot="content">{{ item.description }}</p>
              </info-areas>
            </div>
          </div>
        </div>
      </div>
      <!-- end Features 1 -->

      <!-- Features 3 -->
      <div class="section section-features-3">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 md-small-size-100">
              <div class="phone-container">
                <img :src="iphone">
              </div>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <!-- Some <br /> tags to push the text to align with the image, you can remove it if you have more text on the right side :-) -->
              <h2 class="title">Your life will be much easier</h2>
              <info-areas v-for="(item, key) in section1" :key="key" info-horizontal icon-color="primary" :icon="item.icon">
                <h4 slot="title" class="info-title">{{ item.title }}</h4>
                <div slot="content" class="description">
                  <p>{{ item.description }}</p>
                </div>
              </info-areas>
            </div>
          </div>
        </div>
      </div>
      <!-- end Features 3 -->

      <!-- Features 4 -->
      <div class="section section-features-4">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-medium-size-100 mx-auto text-center"
            >
              <h2 class="title">Your life will be much easier</h2>
              <h5 class="description">
                This is the paragraph where you can write more details about your
                product. Keep you user engaged by providing meaningful
                information.
              </h5>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-size-25 md-small-size-100 ml-auto">
              <info-areas info-horizontal icon-color="info" icon="code">
                <h4 slot="title" class="info-title">For Developers</h4>
                <div slot="content" class="description">
                  <p>
                    The moment you use Material Kit, you know you’ve never felt
                    anything like it. With a single use, this powerfull UI Kit
                    lets you do more than ever before.
                  </p>
                </div>
              </info-areas>
              <info-areas info-horizontal icon-color="danger" icon="format_paint">
                <h4 slot="title" class="info-title">For Designers</h4>
                <div slot="content" class="description">
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </info-areas>
            </div>
            <div class="md-layout-item md-size-25 md-small-size-100">
              <div class="phone-container">
                <img :src="iphone2">
              </div>
            </div>
            <div class="md-layout-item md-size-25 md-small-size-100 mr-auto">
              <info-areas info-horizontal icon-color="primary" icon="dashboard">
                <h4 slot="title" class="info-title">Bootstrap Grid</h4>
                <div slot="content" class="description">
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </info-areas>
              <info-areas
                info-horizontal
                icon-color="success"
                icon="view_carousel"
              >
                <h4 slot="title" class="info-title">Example Pages Included</h4>
                <div slot="content" class="description">
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </info-areas>
            </div>
          </div>
        </div>
      </div>
      <!-- end Features 4 -->

      <!-- Features 5 -->
      <div class="section section-features-5">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-small-size-100 mx-auto text-center"
            >
              <h2 class="title">Your life will be much easier</h2>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-33 md-small-size-100">
              <info-areas text-center icon="code">
                <h4 slot="title" class="info-title">For Developers</h4>
                <div slot="content" class="description">
                  <p>
                    The moment you use Material Kit, you know you’ve never felt
                    anything like it. With a single use, this powerfull UI Kit
                    lets you do more than ever before.
                  </p>
                </div>
              </info-areas>
            </div>
            <div class="md-layout-item md-size-33 md-small-size-100">
              <info-areas text-center icon="format_paint">
                <h4 slot="title" class="info-title">For Designers</h4>
                <div slot="content" class="description">
                  <p>
                    The moment you use Material Kit, you know you’ve never felt
                    anything like it. With a single use, this powerfull UI Kit
                    lets you do more than ever before.
                  </p>
                </div>
              </info-areas>
            </div>
            <div class="md-layout-item md-size-33 md-small-size-100">
              <info-areas text-center icon="dashboard">
                <h4 slot="title" class="info-title">Bootstrap Grid</h4>
                <div slot="content" class="description">
                  <p>
                    The moment you use Material Kit, you know you’ve never felt
                    anything like it. With a single use, this powerfull UI Kit
                    lets you do more than ever before.
                  </p>
                </div>
              </info-areas>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-size-33 md-small-size-100">
              <info-areas text-center icon="view_carousel">
                <h4 slot="title" class="info-title">Example Pages Included</h4>
                <div slot="content" class="description">
                  <p>
                    The moment you use Material Kit, you know you’ve never felt
                    anything like it. With a single use, this powerfull UI Kit
                    lets you do more than ever before.
                  </p>
                </div>
              </info-areas>
            </div>
            <div class="md-layout-item md-size-33 md-small-size-100">
              <info-areas text-center icon="access_time">
                <h4 slot="title" class="info-title">Save Time</h4>
                <div slot="content" class="description">
                  <p>
                    The moment you use Material Kit, you know you’ve never felt
                    anything like it. With a single use, this powerfull UI Kit
                    lets you do more than ever before.
                  </p>
                </div>
              </info-areas>
            </div>
            <div class="md-layout-item md-size-33 md-small-size-100">
              <info-areas text-center icon="attach_money">
                <h4 slot="title" class="info-title">Save Money</h4>
                <div slot="content" class="description">
                  <p>
                    The moment you use Material Kit, you know you’ve never felt
                    anything like it. With a single use, this powerfull UI Kit
                    lets you do more than ever before.
                  </p>
                </div>
              </info-areas>
            </div>
          </div>
        </div>
      </div>
      <!-- end Features 5 -->
    </div>
  </div>
</template>

<script>
import { InfoAreas } from '@/components';
import Mixins from '@/plugins/basicMixins';

export default {
  components: {
    InfoAreas
  },
  mixins: [Mixins.HeaderImage],
  data: () => ({
    iphone: require('@/assets/img/sections/iphone.png'),
    iphone2: require('@/assets/img/sections/iphone2.png'),
    image: require('@/assets/img/dg1.jpg'),
    section1: [
      {
        title: '판매 증가',
        description: '고객에게 SMS 문자 메시지를 보내어 새로운 제품이나 서비스, 할인, 이벤트, 쿠폰, 알리미 등을 알려줌으로써 매출을 최대 50 %까지 끌어 올리십시오.',
        color: 'info',
        icon: 'chat'
      },
      {
        title: '비용 효율적인',
        description: '대량 SMS 메시지는 최대 98 %의 SMS 판촉 행사로 비즈니스를 성장시키는 가장 좋은 방법입니다. 가장 효과적인 SMS 게이트웨이를 선택하고 대량 SMS 문자 메시지를 문자 메시지 당 $ 0,003부터 보내십시오.',
        color: 'success',
        icon: 'verified_user'
      },
      {
        title: '성공 통계',
        description: '대량 문자 메시지를 보내고 강력한 온라인 DLR 도구로 SMS 마케팅 캠페인을 추적하십시오. 실시간으로 광범위한 SMS 배달 보고서를 기반으로합니다.',
        color: 'danger',
        icon: 'fingerprint'
      }
    ],
    section2: [
      {
        title: '국제 봉사',
        description: '우리의 대량 sms 적용 범위 목록을 확인, 우리는 188 개 이상의 국가와 1100 개 이상의 모바일 네트워크를 다룹니다.',
        icon: 'extension'
      },
      {
        title: '대량 SMS',
        description: '한 번의 클릭으로 한 번에 수백만 개의 SMS를 전화 번호로 보낼 수있는 기술이 있습니다.',
        icon: 'child_friendly'
      },
      {
        title: 'API',
        description: '맞춤화 된 Friendly Bulk SMS API를 사용하여 전 세계의 메시지를 즉시 전달하십시오.',
        icon: 'watch_later'
      },
      {
        title: '24/7 SUPPORT',
        description: '연락은 무료이며, 우리의 지원 담당자는 라이브 채팅, Skype, 이메일을 통해 24 시간 내내 이용하실 수 있습니다.',
        icon: 'extension'
      }
    ]
  })
}
</script>

<style>
.index-page .page-header {
  height: 80vh;
}
</style>
