<template>
  <div class="wrapper">
    <parallax class="page-header header-filter header-small" parallax-active="true" filter-color="rose" :style="headerStyle" />
    <div class="section">
      <div class="container">
        <div class="main main-raised">
          <div class="md-layout">
            <div class="md-layout-item md-size-100 md-small-size-100">
              <div class="success-icon">
                <md-icon class="md-size-5x">check_circle</md-icon>
              </div>
              <h2 class="title">구매해주셔서 감사합니다.</h2>
              <md-card class="md-card-plain">
                <md-card-content>
                  <h3 class="card-title">구매내역</h3>
                  {{ payment }}
                  <md-table v-model="payment" class="table-shopping">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="Name" class="td-name">
                        <a href="javascript:void(0)">{{ item.transactions[0].item_list.items[0].name }}</a>
                        <br>
                        <small>{{ item.transactions[0].item_list.items[0].sku }}</small>
                      </md-table-cell>
                      <md-table-cell md-label="SMS COUNT">
                        {{ item.transactions[0].item_list.items[0].price / 0.02 | Comma }}
                      </md-table-cell>
                      <md-table-cell md-label="BuyEmail">
                        {{ item.transactions[0].payee.email }}
                      </md-table-cell>
                      <md-table-cell md-label="Qty" class="td-number">
                        {{ item.transactions[0].item_list.items[0].quantity }}
                      </md-table-cell>
                      <md-table-cell md-label="Price" class="td-number">
                        <small>$</small>
                        {{ item.transactions[0].item_list.items[0].price }}
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                  <div class="table table-stats">
                    <div class="text-right">
                      <md-button class="md-success md-round" @click="$router.push('/my')">
                        Go My
                        <md-icon>keyboard_arrow_right</md-icon>
                      </md-button>
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from '@/plugins/basicMixins';

export default {
  mixins: [Mixins.HeaderImage],
  bodyClass: 'success-page',
  data: () => ({
    selectColor: 'rose',
    selectSize: 'small',
    image: require('@/assets/img/examples/bg-product.jpg')
  }),
  async asyncData({ store, query }) {
    const { paymentId, PayerID } = query;
    const { userId } = store.state.auth.payload;
    const { data } = await store.dispatch('paysuccess/find', { query: { payId: paymentId }});
    let payment;
    if (!data.length) {
      const res = await store.dispatch('paysuccess/create', { paymentId, PayerID, userId });
      payment = [...res];
    } else {
      payment = data;
    }
    return { payment };
  }
};
</script>

<style lang="scss">
.main-raised {
  margin: -60vh 0 0;
  padding: 40px;
  .title-row {
    margin-top: -8vh;
  }
  .success-icon {
    text-align: center;
    margin: 50px 0 30px;
    .md-icon {
      color: #4caf50;
    }
  }
  .title {
    text-align: center;
  }
  .table-stats {
    display: flex;
    align-items: center;
    text-align: right;
    flex-flow: row wrap;

    .td-price .td-total {
      display: inline-flex;
      font-weight: 500;
      font-size: 1.0625rem;
      margin-right: 50px;
    }

    .td-price {
      font-size: 26px;
      border-top: 1px solid #ddd;
    }

    .td-price,
    > div {
      flex: 0 0 100%;
      padding: 12px 8px;
    }
  }
}
</style>
