<template>
  <md-table v-model="tableData">
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="#">{{ item.id }}</md-table-cell>
      <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Country">{{
        item.country
      }}</md-table-cell>
      <md-table-cell md-label="City">{{ item.city }}</md-table-cell>
      <md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>
      <md-table-cell md-label="Actions" :class="getAlignClasses(item)">
        <md-button
          class="md-just-icon"
          :class="getClass(item.icon1, item.id)"
        ><md-icon>{{ item.icon1 }}</md-icon></md-button>
        <md-button
          class="md-just-icon"
          :class="getClass(item.icon2, item.id)"
        ><md-icon>{{ item.icon2 }}</md-icon></md-button>
        <md-button
          class="md-just-icon"
          :class="getClass(item.icon3, item.id)"
        ><md-icon>{{ item.icon3 }}</md-icon></md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  data: () => ({
    tableData: [
      {
        id: 1,
        name: 'Dakota Rice',
        salary: '$36.738',
        country: 'Niger',
        city: 'Oud-Turnhout',
        icon1: 'person',
        icon2: 'edit',
        icon3: 'close'
      },
      {
        id: 2,
        name: 'Minerva Hooper',
        salary: '$23,789',
        country: 'Curaçao',
        city: 'Sinaai-Waas',
        icon1: 'person',
        icon2: 'edit',
        icon3: 'close'
      },
      {
        id: 3,
        name: 'Sage Rodriguez',
        salary: '$56,142',
        country: 'Netherlands',
        city: 'Baileux',
        icon1: 'person',
        icon2: 'edit',
        icon3: 'close'
      },
      {
        id: 4,
        name: 'Philip Chaney',
        salary: '$38,735',
        country: 'Korea, South',
        city: 'Overland Park',
        icon1: 'person',
        icon2: 'edit',
        icon3: 'close'
      },
      {
        id: 5,
        name: 'Doris Greene',
        salary: '$63,542',
        country: 'Malawi',
        city: 'Feldkirchen in Kärnten',
        icon1: 'person',
        icon2: 'edit',
        icon3: 'close'
      }
    ]
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
