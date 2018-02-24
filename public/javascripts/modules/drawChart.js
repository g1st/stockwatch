import Highcharts from 'highcharts/highstock';
import getStockData from './getStockData';

let chart; // globally available

function drawChart(data) {
  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 4
    },
    title: {
      text: 'WATCHSTOCKS'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%e. %b',
        week: '%e. %b',
        month: "%b '%y",
        year: '%Y'
      }
    },
    yAxis: {
      labels: {
        formatter: function() {
          return this.value + '%';
        }
      }
    },
    plotOptions: {
      series: {
        compare: 'percent'
      }
    },
    tooltip: {
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y}</b> ({point.change}%)<br/>'
    },
    series: data
  });
}

export default drawChart;
