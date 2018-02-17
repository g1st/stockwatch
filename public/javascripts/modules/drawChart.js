import Highcharts from 'highcharts/highstock';
import getStockData from './getStockData';

var usdtoeur = [1, 2, 3, 4, 5, 6, 5, 4, 3, 9]; // dummy data for now
var chart; // globally available

// Highcharts.setOptions({
//   /**
//    * (c) 2010-2017 Torstein Honsi
//    *
//    * License: www.highcharts.com/license
//    *
//    * Grid-light theme for Highcharts JS
//    * @author Torstein Honsi
//    */
//   colors: [
//     '#7cb5ec',
//     '#f7a35c',
//     '#90ee7e',
//     '#7798BF',
//     '#aaeeee',
//     '#ff0066',
//     '#eeaaee',
//     '#55BF3B',
//     '#DF5353',
//     '#7798BF',
//     '#aaeeee'
//   ],
//   chart: {
//     backgroundColor: null,
//     style: {
//       fontFamily: 'Dosis, sans-serif'
//     }
//   },
//   title: {
//     style: {
//       fontSize: '16px',
//       fontWeight: 'bold',
//       textTransform: 'uppercase'
//     }
//   },
//   tooltip: {
//     borderWidth: 0,
//     backgroundColor: 'rgba(219,219,216,0.8)',
//     shadow: false
//   },
//   legend: {
//     itemStyle: {
//       fontWeight: 'bold',
//       fontSize: '13px'
//     }
//   },
//   xAxis: {
//     gridLineWidth: 1,
//     labels: {
//       style: {
//         fontSize: '12px'
//       }
//     }
//   },
//   yAxis: {
//     minorTickInterval: 'auto',
//     title: {
//       style: {
//         textTransform: 'uppercase'
//       }
//     },
//     labels: {
//       style: {
//         fontSize: '12px'
//       }
//     }
//   },
//   plotOptions: {
//     candlestick: {
//       lineColor: '#404048'
//     }
//   },

//   // General
//   background2: '#F0F0EA'
// });

function drawChart(data) {
  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 4
    },
    title: {
      text: 'Stock watch'
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
