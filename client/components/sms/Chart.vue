<template>
  <canvas id="planet-chart" />
</template>

<script>
import Chart from 'chart.js';
import Moment from 'moment';

export default {
  data: () => ({
    planetChartData: {
      type: 'bar',
      data: {
        labels: ['19.09.23', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus'],
        datasets: [
          { // one line graph
            label: '성공',
            data: [5, 0, 1, 2, 67, 62, 27],
            backgroundColor: [
              'rgba(0, 230, 118, .8)',
              'rgba(0, 230, 118, .8)',
              'rgba(0, 230, 118, .8)',
              'rgba(0, 230, 118, .8)',
              'rgba(0, 230, 118, .8)',
              'rgba(0, 230, 118, .8)',
              'rgba(0, 230, 118, .8)'
            ],
            borderColor: [
              '#4caf50',
              '#4caf50',
              '#4caf50',
              '#4caf50',
              '#4caf50',
              '#4caf50',
              '#4caf50'
            ],
            borderWidth: 0
          },
          { // another line graph
            label: '실패',
            data: [1, 2, 1, 0, 0, 4, 0],
            backgroundColor: [
              'rgba(233, 30, 99, .8)',
              'rgba(233, 30, 99, .8)',
              'rgba(233, 30, 99, .8)',
              'rgba(233, 30, 99, .8)',
              'rgba(233, 30, 99, .8)',
              'rgba(233, 30, 99, .8)',
              'rgba(233, 30, 99, .8)'
            ],
            borderColor: [
              '#e91e63',
              '#e91e63',
              '#e91e63',
              '#e91e63',
              '#e91e63',
              '#e91e63',
              '#e91e63'
            ],
            borderWidth: 0
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '최근 일주일',
          fontSize: 30,
          padding: 25
        },
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }]
        }
      }
    }
  }),
  mounted() {
    const week = [];
    for (let index = 1; index <= 7; index++) {
      const day = Moment().subtract(index, 'd').format('YY.M.D');
      week.unshift(day);
    }
    console.log(week);
    this.createChart('planet-chart', this.planetChartData);
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  }
}
</script>
