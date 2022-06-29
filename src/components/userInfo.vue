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
          text: '品牌了解度分析', // 主标题
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
          data: ['P5', 'P7', 'G3', '小鹏']
        },
        series: [
          {
            name: '品牌了解度分析',
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
            data: this.getskillinfo()
          }
        ]
      })
    },
    //获取品牌分析
    getskillinfo(){

      //test case
      return [
        {value: 20, name: 'P5', itemStyle: 'red'},
        {value: 25, name: 'P7', itemStyle: '#1FC48D'},
        {value: 22, name: 'G3', itemStyle: '#6DC8EC'},
        {value: 33, name: '小鹏', itemStyle: '#3F8FFF'}
      ]
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
            data: this.getlastfivescore(),
            type: 'line'
          }
        ]
      })

    },
    //返回用户最近五次的成绩
    getlastfivescore(){

      return [60,70,80,90,100]
    },

    //右边饼图
    drawLine2() {
      // console.log("开始画饼图")
      // 基于准备好的dom，初始化echarts实例
      this.myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      let dataMax = [
        { name: '综合得分', max: '100' },
        { name: '清晰性', max: '100' },
        { name: '逻辑性', max: '100' },
        { name: '准确性', max: '100' },
        { name: '完整性', max: '100' },
      ]
      let option = {
        //配置维度的最大值
        title:{
          text:"智能训练成绩分析"
        },
        radar: {
          name: {
            show: true,
            color: 'red',
          },
          //   雷达图的指示器，用来指定雷达图中的多个变量（维度）
          indicator: dataMax,
          shape: 'circle', //对雷达图形设置成一个圆形,可选 circle:圆形,polygon:多角形(默认)
        },
        series: [
          {
            type: 'radar',
            label: {
              show: true, //显示数值
            },
            areaStyle: {}, //每个雷达图形成一个阴影的面积
            data: [
              {
                name: '智能训练成绩分析',
                value: this.getscoreanalyse()
              },
            ],
          },
        ],
      }
      // 绘制图表
      this.myChart3.setOption(option)
    },
    //获取成绩分析
    getscoreanalyse(){


      //test case
      return [
        70,80,90,85,74
      ]
    }
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
