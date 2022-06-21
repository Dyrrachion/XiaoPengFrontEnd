<template>
  <el-container style="height: 100vh" >

    <!-- 顶栏 -->
    <div style="background-color: skyblue" >
    <el-header style="height: 10%">
          <p align="center" style="font-size: 20px" >用户信息</p>
    </el-header>
    </div>
    <!-- 第一列栅格布局 -->
    <el-row  style="height: 45%">
      <el-col :span="12" class="col1" style="height: 100%">

        <div class="test2" style="width:100%;height:100%;">
          <div id="myChart" style="width:100%;height:80%;float:left;"></div>
        </div>

      </el-col>

      <el-col :span="12" class="col2" style="height: 100%">

        <div class="test2" style="width:100%;height:100%;">
          <div id="myChart3" style="width:100%;height:80%;float:left;"></div>
        </div>

      </el-col>
    </el-row >

    <!-- 第二列布局 -->
    <el-row style="height: 45%">
      <el-col :span="24" class="col3" style="height: 100%">

        <div class="test2" style="width:100%;height:100%;">
          <div id="myChart2" style="width:100%;height:80%;float:left;"></div>
        </div>

      </el-col>
    </el-row>

    <!-- 底栏 -->
    <el-footer style="height: 5%"></el-footer>
  </el-container>
</template>

<script>

export default {
  name: 'tes2t',
  data() {
    return {
      myChart: '',
      opinionData2: [
        {value: 1, name: '车型了解度', itemStyle: 'red'},
        {value: 45, name: '沟通能力', itemStyle: '#1FC48D'},
        {value: 3, name: '营销技能', itemStyle: '#6DC8EC'},
        {value: 3, name: '其他', itemStyle: '#3F8FFF'}
      ],

      myChart3: '',
      opinion3: ['文档学习', '自我学习','人机对战','其他'],
      opinionData3: [
        {value: 12, name: '文档学习', itemStyle: 'red'},
        {value: 37, name: '自我学习', itemStyle: '#1ab394'},
        {value: 49, name: '人机对战', itemStyle: 'blue'},
        {value: 2, name: '其他', itemStyle: 'gren'},
      ],

      myChart2: '',


    };
  },

  mounted: function () {
    this.drawLine()
    this.drawLine2()
    this.drawLine1()
  },

  methods: {
    drawLine() {
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      this.myChart.setOption({
        title: {
          text: '技能掌握情况', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        grid: {containLabel: true},
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        // color: ['#1FC48D', '#F5A60A', '#6DC8EC', '#3F8FFF'],
        color: ['red', '#1FC48D', '#6DC8EC', '#3F8FFF'],
        // backgroundColor: '#ffffff',
        legend: {
          orient: 'vertical',
          icon: 'circle',
          align: 'left',
          x: 'right',
          y: 'bottom',
          data: ['车型了解度', '沟通能力', '营销技能', '其他']
        },
        series: [
          {
            name: '技能掌握情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['40%', '50%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function (params) {
                // 自定义颜色
                var colorList = ['red', '#1FC48D', '#6DC8EC', '#3F8FFF']
                return colorList[params.dataIndex]
              }
            },
            data: this.opinionData2
          }
        ]
      })
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      this.myChart2.setOption({
        title: {
          text: '近5次智能训练成绩', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        tooltip: {
          trigger: 'axis' // axis   item   none三个值
        },
        xAxis: {
          type: 'category', // 还有其他的type，可以去官网喵两眼哦
          data: ['近一次', '近两次', '近三次', '近四次', '近五次'], // x轴数据
          name: '' // x轴名称
          // x轴名称样式
          // nameTextStyle: {
          //   fontWeight: 600,
          //   fontSize: 18
          // }
        },
        yAxis: {
          type: 'value',
          name: '综合评分' // y轴名称
          // y轴名称样式
          // nameTextStyle: {
          //   fontWeight: 600,
          //   fontSize: 18
          // }
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'top',
          data: ['综合评分']
        },
        series: [
          {
            name: '综合评分',
            data: [60, 75, 72, 80, 91],
            type: 'line'
          }
        ]
      })

    },
    drawLine2() {
      // console.log("开始画饼图")
      // 基于准备好的dom，初始化echarts实例
      this.myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      this.myChart3.setOption({
        title: {
          text: '成绩分析', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',

          bottom: 'bottom',
          data: this.opinion3
        },
        series: [
          {
            name: '成绩分析',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: this.opinionData3,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function (params) {
                // 自定义颜色
                var colorList = ['red', '#1ab394','blue','green']
                return colorList[params.dataIndex]
              }
            }
          }
        ]
      })

    },
  }
}
</script>


<style type="text/css" >
html,
body{
  padding: 0px;
  margin: 0px;
}
.el-header {
  color:black;
  margin: 0px;
}
.el-footer {
  background-color:royalblue;
  color: black;
  text-align: center;
}
.el-main {
  background-color: white;
}
.el-col {
  height: 2000px;
}
.col1 {
  background-color: white;
}
.col2 {
  background-color: white;
}
.col3 {
  background-color:white;
}
</style>
