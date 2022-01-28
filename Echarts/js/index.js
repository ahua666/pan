/* 
立即执行函数妙用：
为了防止变量污染，减少命名冲突，我们可以采取立即执行函数的写法。

多个立即执行函数里面哪怕命名相同变量不会有冲突。
因为里面的变量都是局部变量。
*/

// 柱状图模块1
(function () {
  // 1、实例化对象
  var myChart = echarts.init(document.querySelector('.bar1 .chart'));

  // 2、制定配置项和数据
  var option = {
    color: ['#457B9D', '#8D99AE'],
    title: {
      // text: '贞观四年长安降水量和蒸发量',
      subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      // 修改图例组件文字的颜色
      textStyle: {
        color: '#8D99AE'
      },
      right: '40%',
      data: ['降水量', '蒸发量']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['line', 'bar']
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      },
      // 修改工具箱组件的图标样式
      iconStyle: {
        color: '#B5838D'
      }
    },
    calculable: true,
    grid: {
      left: '8%',
      right: '5%',
      bottom: '10%',
      // containLabel: true
    },
    xAxis: [{
      // 修改刻度标签相关样式 颜色、大小、是否加粗等
      axisLabel: {
        color: 'rgba(255,255,255,0.6)'
      },
      // 去除刻度线
      axisTick: {
        show: false
      },
      // X轴样式不显示 去除轴线
      axisLine: {
        show: false
      },
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
      axisLabel: {
        color: 'rgba(255,255,255,0.6)'
      },
      axisLine: {
        show: false
      },
      type: 'value',
      // Y轴分割线样式
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
          width: 1
        }
      }
    }],
    series: [{
        name: '降水量',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        markPoint: {
          data: [{
              name: '年最高',
              value: 182.2,
              xAxis: 7,
              yAxis: 183
            },
            {
              name: '年最低',
              value: 2.3,
              xAxis: 11,
              yAxis: 3
            }
          ]
        },
        markLine: {
          data: [{
            type: 'average',
            name: '平均值'
          }]
        }
      },
      {
        name: '蒸发量',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        markPoint: {
          data: [{
              type: 'max',
              name: '最大值'
            },
            {
              type: 'min',
              name: '最小值'
            }
          ]
        },
        markLine: {
          data: [{
            type: 'average',
            name: '平均值'
          }]
        }
      }
    ]
  };

  // 3、把配置项设置给 echarts实例对象 
  myChart.setOption(option);

  // 4、让图标跟随品目自动的去适应
  // 监听屏幕的变化，并调用函数缩放
  window.addEventListener('resize', function () {
    myChart.resize();
  });
})();


// 饼图模块
(function () {
  var myChart = echarts.init(document.querySelector('.pie .chart'));
  var option = {
    color: ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#B5838D', '#F4A261', '#F3FFBD', '#247BA0'],
    title: {
      // text: '南丁格尔玫瑰图',
      subtext: '纯属虚构',
      bottom: 'right'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['pie', 'funnel']
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        },
      },
      // 修改工具箱组件的颜色
      iconStyle: {
        // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
        color: '#8D99AE'
      }
    },
    series: [
      /* {
        name: '半径模式',
        type: 'pie',
        radius: [20, 110],
        center: ['25%', '50%'],
        roseType: 'radius',
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [{
            value: 10,
            name: 'rose1'
          },
          {
            value: 5,
            name: 'rose2'
          },
          {
            value: 15,
            name: 'rose3'
          },
          {
            value: 25,
            name: 'rose4'
          },
          {
            value: 20,
            name: 'rose5'
          },
          {
            value: 35,
            name: 'rose6'
          },
          {
            value: 30,
            name: 'rose7'
          },
          {
            value: 40,
            name: 'rose8'
          }
        ]
      }, */
      {
        name: '面积模式',
        type: 'pie',
        // 带有直角坐标系的比如折线图柱状图是 grid修改图形大小，而饼形图是通过 radius 修改大小
        // radius第一个值是内圆的半径，第二个值是外圆的半径
        radius: [10, 70],
        center: ['50%', '50%'],
        roseType: 'area',
        data: [{
            value: 10,
            name: 'rose1'
          },
          {
            value: 5,
            name: 'rose2'
          },
          {
            value: 15,
            name: 'rose3'
          },
          {
            value: 25,
            name: 'rose4'
          },
          {
            value: 20,
            name: 'rose5'
          },
          {
            value: 35,
            name: 'rose6'
          },
          {
            value: 30,
            name: 'rose7'
          },
          {
            value: 40,
            name: 'rose8'
          }
        ]
      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();


// 散点图模块
(function () {
  var myChart = echarts.init(document.querySelector('.scatter-plot .chart'));
  var data = [
    [
      [28604, 77, 17096869, 'Australia', 1990],
      [31163, 77.4, 27662440, 'Canada', 1990],
      [1516, 68, 1154605773, 'China', 1990],
      [13670, 74.7, 10582082, 'Cuba', 1990],
      [28599, 75, 4986705, 'Finland', 1990],
      [29476, 77.1, 56943299, 'France', 1990],
      [31476, 75.4, 78958237, 'Germany', 1990],
      [28666, 78.1, 254830, 'Iceland', 1990],
      [1777, 57.7, 870601776, 'India', 1990],
      [29550, 79.1, 122249285, 'Japan', 1990],
      [2076, 67.9, 20194354, 'North Korea', 1990],
      [12087, 72, 42972254, 'South Korea', 1990],
      [24021, 75.4, 3397534, 'New Zealand', 1990],
      [43296, 76.8, 4240375, 'Norway', 1990],
      [10088, 70.8, 38195258, 'Poland', 1990],
      [19349, 69.6, 147568552, 'Russia', 1990],
      [10670, 67.3, 53994605, 'Turkey', 1990],
      [26424, 75.7, 57110117, 'United Kingdom', 1990],
      [37062, 75.4, 252847810, 'United States', 1990]
    ],
    [
      [44056, 81.8, 23968973, 'Australia', 2015],
      [43294, 81.7, 35939927, 'Canada', 2015],
      [13334, 76.9, 1376048943, 'China', 2015],
      [21291, 78.5, 11389562, 'Cuba', 2015],
      [38923, 80.8, 5503457, 'Finland', 2015],
      [37599, 81.9, 64395345, 'France', 2015],
      [44053, 81.1, 80688545, 'Germany', 2015],
      [42182, 82.8, 329425, 'Iceland', 2015],
      [5903, 66.8, 1311050527, 'India', 2015],
      [36162, 83.5, 126573481, 'Japan', 2015],
      [1390, 71.4, 25155317, 'North Korea', 2015],
      [34644, 80.7, 50293439, 'South Korea', 2015],
      [34186, 80.6, 4528526, 'New Zealand', 2015],
      [64304, 81.6, 5210967, 'Norway', 2015],
      [24787, 77.3, 38611794, 'Poland', 2015],
      [23038, 73.13, 143456918, 'Russia', 2015],
      [19360, 76.5, 78665830, 'Turkey', 2015],
      [38225, 81.4, 64715810, 'United Kingdom', 2015],
      [53354, 79.1, 321773631, 'United States', 2015]
    ]
  ];

  option = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 1,
    //     color: '#006494'
    //   },
    //   {
    //     offset: 0,
    //     color: '#0A2463'
    //   }
    // ]),
    title: {
      // text: '1990 与 2015 年各国家人均寿命与 GDP'
    },
    legend: {
      right: 10,
      data: ['1990', '2015'],
      textStyle: {
        color: '#8BBEB2'
      }
    },
    grid: {
      left: '8%',
      right: '5%',
      bottom: '10%'
    },
    xAxis: {
      // 去除刻度线
      axisTick: {
        show: false
      },
      // 去除轴线
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#5EB1BF'
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      boundaryGap: false //去除轴内间距
    },
    yAxis: {
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#CDEDF6'
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      scale: true,
      boundaryGap: false
    },
    series: [{
      name: '1990',
      data: data[0],
      type: 'scatter',
      /* 
      使用echarts插件，用了别人写好的一个例子的时候发现这个鼠标移上去有提示的地方是这样写的，
      symbolSize: function (data) {
        return Math.sqrt(data[2]) / 8e2;
      }
      这里面的 8e2是什么意思呢，console.log发现
      1e1=10    2e1=20
      1e2=100    2e2=200
      1e3=1000    2e3=2000
      所以 8e2就是 800的意思啦
      */
      symbolSize: function (data) {
        return Math.sqrt(data[2]) / 8e2;
      },
      emphasis: {
        label: {
          show: true,
          formatter: function (param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(120, 36, 50, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
          offset: 0,
          color: 'rgb(251, 118, 123)'
        }, {
          offset: 1,
          color: 'rgb(204, 46, 72)'
        }])
      }
    }, {
      name: '2015',
      data: data[1],
      type: 'scatter',
      symbolSize: function (data) {
        return Math.sqrt(data[2]) / 8e2;
      },
      emphasis: {
        label: {
          show: true,
          formatter: function (param) {
            return param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(25, 100, 150, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
          offset: 0,
          color: 'rgb(129, 227, 238)'
        }, {
          offset: 1,
          color: 'rgb(25, 183, 207)'
        }])
      }
    }]
  };

  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();


// 折线图模块
(function () {
  var myChart = echarts.init(document.querySelector('.line .chart'));
  var option = {
    title: {
      // text: '日升汤谷扶桑图'
    },
    color: ['#E63946', '#457B9D', '#FFB4A2', '#70C1B3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      //如果 series对象有 name值，则 legend可以不写 data
      textStyle: {
        color: '#457B9D'
      }
    },
    grid: {
      left: '10%',
      right: '4%',
      bottom: '10%',
      // containLabel: true
    },
    xAxis: [{
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#A8DADC'
      },
      type: 'category',
      boundaryGap: false,
      data: ['梁甫', '幽州', '秋暝', '毕构', '吴中', '子美', '扶桑']
    }],
    yAxis: [{
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      type: 'value',
      axisLabel: {
        color: '#8D99AE'
      }
    }],
    series: [{
        name: '少陵野老',
        type: 'line',
        stack: '总量', //注释掉总量这个后折线不会重叠显示
        areaStyle: {},
        data: [120, 132, 101, 134, 90, 230, 210],
        // 折线修饰为圆滑 不要直来直去
        smooth: true
      },
      {
        name: '青莲居士',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [150, 232, 201, 154, 190, 330, 410],
        smooth: true
      },
      {
        name: '知行合一',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [320, 332, 301, 334, 390, 330, 320],
        smooth: true
      },
      {
        name: '仙宗十友',
        type: 'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {},
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        smooth: true
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();


// 柱形图模块2 (再用前面的变量名也不会起冲突，立即执行函数的好处)
(function () {
  // 不能用 jQuery，需用原生 JS获取 DOM元素
  var myChart = echarts.init(document.querySelector('.bar2 .chart')),
    postColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];

  var option = {
    // 图标位置
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%",
      // containLabel: true
    },
    // 不显示 X轴的相关信息
    xAxis: {
      show: false
    },

    // 图形左右两侧有两组对象，所以 Y轴应该是有两组对象，与 series中的两组对象对应
    yAxis: [{
        type: "category",
        data: ["HTML5", "CSS3", "JAVASCRIPT", "VUE", "NODE"],
        inverse: true,
        // 不显示y轴的线
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: "#fff"
        }
      },
      {
        show: true,
        data: [702, 350, 610, 793, 664],
        inverse: true,
        // 不显示y轴的线
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#fff"
          }
        }
      }
    ],

    // 设置两组柱子，第一组是条状，第二组框状框到第一组柱子上面，加圆角，这样显得好看
    series: [
      // 修改第一组柱子相关样式（条状）
      {
        name: '条状',
        type: 'bar',
        data: [70, 34, 60, 78, 69],
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,
        itemStyle: {
          normal: {
            // 柱子设为圆角
            barBorderRadius: 20,
            // 修改柱子的颜色 为了设置每个柱子为不同颜色，可先存储多种颜色的数组，再用函数调用
            color: function (params) {
              // params传入的是当前柱子的对象，dataIndex是当前柱子的索引号
              return postColor[params.dataIndex];
            }
          }
        },
        // 设置第一组柱子内百分比显示数据 图形上的文本标签
        label: {
          normal: { //此 normal可加可不加
            show: true,
            // 图形内显示
            position: "inside",
            // 文字的显示格式  {c}会自动解析所在柱子里的 data数据
            formatter: "{c}%"
          }
        },
        /*
        设置两组柱子层叠效果，给 series第一个对象里面的添加 yAxisIndex: 0,
        给 series第二个对象里面的添加 yAxisIndex: 1。同样有 X轴的 xAxisIndex
        yAxisIndex 相当于 html中的 z-index
        */
        yAxisIndex: 0
      },
      // 第二组柱子
      {
        name: '框状',
        type: 'bar',
        data: [100, 100, 100, 100, 100],
        barCategoryGap: 50,
        barWidth: 15,
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 3,
          barBorderRadius: 15
        },
        yAxisIndex: 1
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  });
})();


// 最后一个模块可以用来试验各种图，之前做了一个雷达图，现在换掉
/* (function () {
  var myChart = echarts.init(document.querySelector('.map .chart'));
  var option = {
    title: {
      // text: '孤帆远影碧空尽,唯见长江天际流',
      textStyle: {
        color: '#555'
      }
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '0.1%'
    },
    backgroundColor: new echarts.graphic.RadialGradient(0.62, 0.45, 1, [{
      offset: 0,
      color: '#fe9e80'
    }, {
      offset: 1,
      color: '#9bc9f1'
    }], false),
    xAxis: [{
      boundaryGap: false,
      data: new Array(15),
      splitLine: {
        show: false
      }
    }],
    yAxis: [{
      min: 0,
      max: 10,
      type: 'value',
      splitLine: {
        show: false
      }

    }],
    series: [{
      //mountain background
      type: 'line',
      areaStyle: {
        normal: {
          color: '#2a9c91',
          opacity: 0.4
        }
      },
      data: [5, 5, 5, 6.1, 6.2, 6.3, 6.4, 6, 4, 4, 4, 4, 4, 4, 4],
      symbolSize: 0,
      lineStyle: {
        normal: {
          width: 0
        }
      }
    }, {
      //mountain behind
      type: 'line',
      areaStyle: {
        normal: {
          color: '#2a9c91',
          opacity: 0.8
        }
      },
      data: [4, 4, 4, 4, 4, 4, 4, 4, 3, 4.5, 5, 6, 6.5, 7, 7.2],
      symbolSize: 0,
      lineStyle: {
        normal: {
          width: 0
        }
      }
    }, {
      //river behind
      type: 'line',
      areaStyle: {
        normal: {
          color: '#2dc3b5',
          opacity: 1
        }
      },
      data: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      symbolSize: 0,
      lineStyle: {
        normal: {
          width: 0
        }
      }
    }, {
      //mountain left
      type: 'line',
      areaStyle: {
        normal: {
          color: '#0f6960',
          opacity: 1
        }
      },
      data: [6.5, 6, 6, 6, 5.8, 5.2, 4.8, 4.2, 2, 0, 0, 0, 0, 0, 0],
      symbolSize: 0,
      lineStyle: {
        normal: {
          width: 0
        }
      }
    }, {
      //river middle
      type: 'line',
      areaStyle: {
        normal: {
          color: '#2dc3b5',
          opacity: 1
        }
      },
      data: [2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8],
      symbolSize: 0,
      lineStyle: {
        normal: {
          width: 0
        }
      }
    }, {
      //mountain right
      type: 'line',
      areaStyle: {
        normal: {
          color: '#0f6960',
          opacity: 1
        }
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4.8, 5, 5.5],
      symbolSize: 0,
      lineStyle: {
        normal: {
          width: 0
        }
      }
    }, {
      //river front
      type: 'line',
      areaStyle: {
        normal: {
          color: '#2dc3b5',
          opacity: 0.8
        }
      },
      data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      smooth: true,
      smoothMonotone: 'x',
      symbolSize: 0,
      lineStyle: {
        normal: {
          width: 0
        }
      },
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    }, {
      type: 'graph',
      data: [{
          symbolSize: 0,
          x: 0,
          y: 0
        }, {
          symbolSize: 0,
          x: 200,
          y: 100
        },
        //sun
        {
          symbolSize: 100,
          x: 130,
          y: 45
        },
        //sun shadow
        {
          symbolSize: [40, 10],
          symbolOffset: [0, 180],
          x: 130,
          y: 45,
          itemStyle: {
            normal: {
              opacity: 0.2
            }
          },
        }, {
          symbolSize: [100, 30],
          symbolOffset: [0, 200],
          x: 130,
          y: 45,
          itemStyle: {
            normal: {
              opacity: 0.25
            }
          },
        }, {
          symbolSize: [60, 20],
          symbolOffset: [0, 225],
          x: 130,
          y: 45,
          itemStyle: {
            normal: {
              opacity: 0.2
            }
          },
        }, {
          symbolSize: [20, 10],
          symbolOffset: [0, 245],
          x: 130,
          y: 45,
          itemStyle: {
            normal: {
              opacity: 0.2
            }
          },
        }
      ],
      itemStyle: {
        normal: {
          color: '#ff5722',
          shadowColor: '#ff5722',
          shadowBlur: 100
        }
      },
      silent: true,
      z: 3
    }, {
      //boat
      type: 'graph',
      data: [{
          symbolSize: 0,
          x: 0,
          y: 0
        }, {
          symbolSize: 0,
          x: 200,
          y: 100
        }, {
          symbolSize: [35, 40],
          symbolOffset: [20, 120],
          x: 130,
          y: 45,
          itemStyle: {
            normal: {
              color: '#333',
            }
          },
          symbol: 'path://M27.310007,2.749997l22.5,0c-2.485281,0 -4.5,14.326891 -4.5,32.000002c0,17.673113 2.014718,32 4.5,32l-22.5,0l0,0c-2.485281,0 -4.5,-14.326889 -4.5,-32c0,-17.673111 2.014718,-32.000002 4.5,-32.000002z M12.75,70.184998l47,0l-11,10l-30,-1l-6,-9z',
        }, {
          //boat shadow
          symbolSize: [30, 5],
          symbolOffset: [19, 142],
          x: 130,
          y: 45,
          itemStyle: {
            normal: {
              color: '#333',
              opacity: 0.1
            }
          },
          symbol: 'roundRect'
        }, {
          symbolSize: [18, 15],
          x: 130,
          y: 45,
          itemStyle: {
            normal: {
              color: '#333',
              opacity: 0.1
            }
          },
          symbolRotate: 2,
          symbolOffset: [20, 151],
          symbol: 'roundRect'
        },
        //wave
        {
          name: 'wave1',
          symbolSize: 0,
          x: 126,
          y: 86
        }, {
          name: 'wave2',
          symbolSize: 0,
          x: 130,
          y: 86
        }, {
          name: 'wave3',
          symbolSize: 0,
          x: 130,
          y: 93
        }, {
          name: 'wave4',
          symbolSize: 0,
          x: 134,
          y: 93
        }, {
          name: 'wave5',
          symbolSize: 0,
          x: 144,
          y: 90
        }, {
          name: 'wave6',
          symbolSize: 0,
          x: 148,
          y: 90
        }
      ],
      links: [{
        source: 'wave1',
        target: 'wave2'
      }, {
        source: 'wave3',
        target: 'wave4'
      }, {
        source: 'wave5',
        target: 'wave6'
      }],
      lineStyle: {
        normal: {
          width: 1,
          curveness: 0.45,
          color: '#0f6960'
        }
      },
      silent: true,
      symbolRotate: -2,
      z: 3
    }, {
      //birds
      type: 'graph',
      data: [
        //bg
        {
          symbolSize: 0,
          x: 0,
          y: 0,
        }, {
          symbolSize: 0,
          x: 200,
          y: 100,
        },
        //bird1
        {
          symbolSize: 0,
          x: 120,
          y: 50,
          name: 'first-bird-left'
        }, {
          symbolSize: 3,
          x: 125,
          y: 52,
          name: 'first-bird'
        }, {
          symbolSize: 0,
          x: 130,
          y: 50,
          name: 'first-bird-right'
        },
        //bird2
        {
          symbolSize: 0,
          x: 110,
          y: 43,
          name: 'second-bird-left'
        }, {
          symbolSize: 2,
          x: 115,
          y: 45,
          name: 'second-bird'
        }, {
          symbolSize: 0,
          x: 120,
          y: 43,
          name: 'second-bird-right'
        },
        //bird3
        {
          symbolSize: 0,
          x: 112,
          y: 52,
          name: 'third-bird-left'
        }, {
          symbolSize: 2,
          x: 115,
          y: 53,
          name: 'third-bird'
        }, {
          symbolSize: 0,
          x: 118,
          y: 52,
          name: 'third-bird-right'
        }
      ],
      links: [{
        source: 'first-bird-left',
        target: 'first-bird'
      }, {
        source: 'first-bird',
        target: 'first-bird-right'
      }, {
        source: 'second-bird-left',
        target: 'second-bird'
      }, {
        source: 'second-bird',
        target: 'second-bird-right'
      }, {
        source: 'third-bird-left',
        target: 'third-bird'
      }, {
        source: 'third-bird',
        target: 'third-bird-right'
      }, ],
      lineStyle: {
        normal: {
          width: 1,
          curveness: 0.3,
          color: '#333'
        }
      },
      itemStyle: {
        normal: {
          color: '#555'
        }
      },
      silent: true,
      z: 4
    }]
  };
  myChart.setOption(option);
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})(); */


// 雷达图模块
/* (function () {
  var myChart = echarts.init(document.querySelector('.radar .chart'));
  var option = {
    title: {
      // text: '行香子·过七里濑'
    },
    radar: [{
        indicator: [
          {
            text: '今古空名'
          },
          {
            text: '但远山长'
          },
          {
            text: '云山乱'
          },
          {
            text: '晓山青'
          },
          {
            text: '君臣一梦'
          }
        ],
        center: ['27%', '50%'],
        radius: 45,
        startAngle: 0,
        splitNumber: 4,
        shape: 'circle',
        name: {
          formatter: '【{value}】',
          textStyle: {
            color: '#72ACD1'
          }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(114, 172, 209, 0.2)',
              'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
              'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'
            ],
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 5
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        }
      },
      {
        indicator: [{
            text: '鱼翻藻鉴',
            max: 150
          },
          {
            text: '过沙溪急',
            max: 150
          },
          {
            text: '霜溪冷',
            max: 150
          },
          {
            text: '月溪明',
            max: 120
          },
          {
            text: '水天清',
            max: 108
          },
          {
            text: '鹭点烟汀',
            max: 72
          }
        ],
        center: ['75%', '50%'],
        radius: 40
      }
    ],
    series: [{
        name: '雷达图',
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [
          {
            value: [100, 8, 0.40, -80, 2000],
            name: '图一',
            symbol: 'rect',
            symbolSize: 5,
            lineStyle: {
              type: 'dashed'
            }
          },
          {
            value: [60, 5, 0.30, -100, 1500],
            name: '图二',
            areaStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }
        ]
      },
      {
        name: '诗情',
        type: 'radar',
        radarIndex: 1,
        data: [{
            value: [120, 118, 130, 100, 99, 70],
            name: '杜甫',
            label: {
              show: true,
              formatter: function (params) {
                return params.value;
              }
            }
          },
          {
            value: [90, 113, 140, 30, 70, 60],
            name: '李白',
            areaStyle: {
              opacity: 0.9,
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                  color: '#B8D3E4',
                  offset: 0
                },
                {
                  color: '#72ACD1',
                  offset: 1
                }
              ])
            }
          }
        ]
      }
    ]
  }

  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();
 */

// 使用雷达图的模块
// 点击 tab切换效果，但是现在遇到了点问题，先留在这
(function () {
  var poemData = [{
      poemStructure: '词·上阕', //指定词的上下阕
      radar: {
        indicator: [{
            text: '今古空名'
          },
          {
            text: '但远山长'
          },
          {
            text: '云山乱'
          },
          {
            text: '晓山青'
          },
          {
            text: '君臣一梦'
          }
        ],
        center: ['50%', '50%'],
        radius: 60,
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        name: {
          formatter: '【{value}】',
          textStyle: {
            color: '#72ACD1'
          }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(114, 172, 209, 0.2)',
              'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
              'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'
            ],
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 5
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        }
      },
      series: {
        name: '雷达图',
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [{
            value: [100, 8, 0.40, -80, 2000],
            name: '图一',
            symbol: 'rect',
            symbolSize: 5,
            lineStyle: {
              type: 'dashed'
            }
          },
          {
            value: [60, 5, 0.30, -100, 1500],
            name: '图二',
            areaStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }
        ]
      }
    },
    {
      poemStructure: '词·下阕',
      radar: {
        indicator: [{
            text: '鱼翻藻鉴',
            max: 150
          },
          {
            text: '过沙溪急',
            max: 150
          },
          {
            text: '霜溪冷',
            max: 150
          },
          {
            text: '月溪明',
            max: 120
          },
          {
            text: '水天清',
            max: 108
          },
          {
            text: '鹭点烟汀',
            max: 72
          }
        ],
        center: ['50%', '50%'],
        radius: 60
      },
      series: {
        name: '诗情',
        type: 'radar',
        radarIndex: 1,
        data: [{
            value: [120, 118, 130, 100, 99, 70],
            name: '杜甫',
            label: {
              show: true,
              formatter: function (params) {
                return params.value;
              }
            }
          },
          {
            value: [90, 113, 140, 30, 70, 60],
            name: '李白',
            areaStyle: {
              opacity: 0.9,
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                  color: '#B8D3E4',
                  offset: 0
                },
                {
                  color: '#72ACD1',
                  offset: 1
                }
              ])
            }
          }
        ]
      }
    }
  ];

  var myChart = echarts.init(document.querySelector('.radar .chart'));
  var option = {
    title: {
      // text: '行香子·过七里濑'
    },
    radar: poemData[0].radar,
    series: poemData[0].series
  }

  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })

  // 点击 tab切换效果
  $(".radar h2").on("click", "a", function () {
    // alert(1);
    // console.log($(this).index());
    // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
    console.log(poemData[$(this).index()]);
    var obj = poemData[$(this).index()];
    option.radar = obj.radar;
    option.series = obj.series;
    // 需要重新渲染
    myChart.setOption(option);
  });
})(); 