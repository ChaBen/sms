<template>
  <md-table v-model="tasks">
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell style="width: 10%" :md-label="$t('sms.status')">
        <template v-if="item.status === 1">
          <md-progress-spinner :md-diameter="30" :md-stroke="2" md-mode="indeterminate" />
        </template>
        <template v-else-if="item.status === 2">
          <div class="done">
            <i class="fal fa-check" />
          </div>
        </template>
      </md-table-cell>
      <md-table-cell style="width: 50%;" :md-label="$t('sms.message')">{{ item.text }}</md-table-cell>
      <md-table-cell :md-label="$t('sms.to')" md-numeric>{{ item.count | Comma }}</md-table-cell>
      <!-- <md-table-cell :md-label="$t('sms.ok')">{{ item.ok | Comma }}</md-table-cell> -->
      <!-- <md-table-cell :md-label="$t('sms.fail')">{{ item.fail | Comma }}</md-table-cell> -->
      <!-- <md-table-cell :md-label="$t('sms.percent')">
        <div class="md-layout percent">
          <div class="md-layout-item">
            <md-progress-bar md-mode="determinate" :md-value="item.percent" />
          </div>
          <div class="md-layout-item">{{ item.percent }}%</div>
        </div>
      </md-table-cell> -->
      <md-table-cell :md-label="$t('sms.date')" md-numeric>{{ item.createdAt | filterDate }}</md-table-cell>
      <md-table-cell :md-label="$t('sms.action')">
        <md-button class="md-just-icon md-rose md-round" @click="$emit('delete', item._id)"><i class="fal fa-times" /></md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Moment from 'moment';
import 'moment/locale/ko';

export default {
  filters: {
    filterDate(date) {
      return Moment(date).startOf('minute').fromNow();
    }
  },
  props: {
    tasks: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
  }),
  methods: {
    getClass(item, id) {
      let classes = '';
      switch (item) {
        case 'person': {
          classes = 'md-info';
          break;
        }
        case 'edit': {
          classes = 'md-success';
          break;
        }
        case 'close': {
          classes = 'md-danger';
          break;
        }
      }
      switch (id) {
        case 1:
        case 5: {
          break;
        }
        case 2:
        case 4: {
          classes = `${classes} md-round`;
          break;
        }
        case 3: {
          classes = `${classes} md-simple`;
          break;
        }
      }
      return classes;
    },
    getAlignClasses: ({ id }) => ({
      'text-right': id
    })
  }
}
</script>

<style lang="scss" scoped>
.md-table {
  flex-flow: column;
  position: relative;
}
.done {
  .fal {
    font-size: 1.24rem;
    color: #4caf50;
  }
}
.percent {
  align-items: center;
  justify-content: center;
  .md-layout-item {
    &:first-child {
      width: 100px;
      margin-right: 5px;
    }
    padding: 0;
    .md-progress-bar {
      margin: 0;
    }
  }
}
</style>
