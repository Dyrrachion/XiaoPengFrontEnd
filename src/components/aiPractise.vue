
<template>
  <div class="container"  >
    <div class="main" >
      <div class="box" style="height: 90vh">
        <div class="title" >
          <img src="" alt class="logo" />
          <span class="title-hn">智能情景训练</span>
        </div>
        <div id="content" class="content" style="height: 75%">
          <p>用户走进了展览大厅.....</p>
          <div style="padding: 20px;">
            <audio ref="audio" :src="audioSrc"></audio>
          </div>
          <div v-for="(item, index) in info" :key="index">
            <div class="info_l" v-if="item.type === 'rightinfo'">

              <div class="con_r con_text">
                <span class="con_l">
                 <div >
                  <el-button  type="primary" @click="handlePlay(index)" >播放录音</el-button>
                 </div>
                  {{item.content}}
                </span>

                <span class="circle circle_l">
                  <img src class="pic_l" />
                </span>
              </div>
              <div class="time_l">{{item.time}}</div>

            </div>

            <div class="info_r info_default" v-if="item.type === 'leftinfo'" style="width:100%;float:left " >

              <span class="circle circle_r">
              </span>

              <div class="con_r con_text"  style="float:left ">
               {{item.content}}
              </div>

              <div class="time_r" style="float: left">{{item.time}}</div>
           </div>
          </div>
          <p v-if="count===3" >训练已结束，正在评分中...</p>
          <el-button v-if="scorestate>0" type="text" @click="checkscore">评分已完成，点击查看评分</el-button>
        </div>



        <div class="setproblem" >


         <div>
           <button @click="sentMsg()" class="setproblems" style="float: right">
             <span style="vertical-align: 4px;">发 送</span>
           </button>
         </div>

        </div>
        <div style="font-size:14px"  >

          <i class="el-icon-mic" style="font-size: 25px"></i>
          <el-button type="primary" @click="handleStart">开始录音</el-button>
          <el-button type="warning" @click="handleStop">停止录音</el-button>
          <el-button type="error" @click="handleDestroy">删除录音</el-button>
          录音时长：{{ recorder && recorder.duration.toFixed(4) }}
        </div>


      </div>

    </div>
  </div>
</template>
<script>
import Recorder from 'js-audio-recorder'
import axios from "_axios@0.27.2@axios";

export default {
  name: "onlineCustomer",
  components: {},
  computed: {},
  data() {
    return {
      info: [
        {},
      ],
      timer: null,
      robotQuestion: [
        {id: 1, content: "robotQuestion", index: 1},
      ],
      robotAnswer: [
        {
          id: 1,
          content:
            "robotAnswer",
          index: 1,
        },
      ],
      recorder: null,
      playTime: 0,
      audioSrc: '',
      recordList:[],
      count:0,
      score:0,
      scorestate:0,
      defaultstate:3,
      text:'',
      currentQid: '',
      questionList: [],
      pid:'',
    };
  },
  created() {
    this.showTimer();
    this.getPid(this.$cookie.getCookie("uid"));
    this.recorder = new Recorder({
      sampleBits: 8, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 11025, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1 // 声道，支持 1 或 2， 默认是1
      // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    })
  },
  watch: {},
  methods: {
    //查看成绩
    checkscore(){
      console.log("checkscore")
      this.getscore();
      this.$alert('你的得分是:'+this.score, '训练得分', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    //获取的分接口
    getscore(){

      //通过axios get获取得分
      this.score=30;
      this.scorestate=1;
    },

    //checkcount
    checkcount(){
      if(this.count>=this.defaultstate)
      {
        return true;
      }
      return false;
    },
    // 用户发送消息
   async sentMsg() {
       if(this.checkcount())
       {
         return 0;
       }
       clearTimeout(this.timer);
       this.showTimer();

        if (this.recorder == null || this.recorder.duration === 0) {
          this.$message({
            message: '请先录音',
            type: 'error'
          })
          return false
        }
        this.recorder.pause() // 暂停录音
        this.timer = null
        console.log('发送录音')// 上传录音
        //发送语音和文字消息
        await this.uploadaudio();
        console.log(this.text);
        var obj = {
          type: "rightinfo",
          time: this.getTodayTime(),
          content: this.text,

        };
        this.info.push(obj);
        this.count+=1;
        this.recorder.destroy();
        //顾客提问
        if(!this.checkcount())
        {
          await this.appendRobotMsg();
        }else{
          this.getscore();
        }

    },
    //获取pid
    getPid(uid)
    {
      const token = this.$cookie.getCookie("token");
      const param = {
        uid: uid
      }
      const header = {
        'token': token
      }
      this.$axios.get("getPid", { params: param, headers: header }).then(res=>
      {
        console.log(res.data.data);
        this.pid = res.data.data;
      })
    },
    //上传录音
    async uploadaudio(){
      //上传录音
      const formData = new FormData()
      const blob = this.recorder.getWAVBlob()// 获取wav格式音频数据
      // 此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为file塞入formData
      const newbolb = new Blob([blob], {type: 'audio/wav'})
      const fileOfBlob = new File([newbolb], new Date().getTime() + '.wav')
      const token = this.$cookie.getCookie("token");
      const header = {
        'token': token
      }
      const url = window.URL.createObjectURL(fileOfBlob)
      console.log(url);
      formData.append('file', fileOfBlob)
      formData.append('uid', this.$cookie.getCookie('uid'));
      formData.append('pid', this.pid)
      if (this.count === 0)
      {
        formData.append('qid','399');
      }
      else
      {
        formData.append('qid', this.questionList[this.count-1].qid);
      }
      const axios = require('axios')
      await axios.post('fileUpload', formData,{headers:header}).then(res => {
        console.log(res.data.data);
        this.text = res.data.data;
      })
    },

    // 机器人回答消息
    async appendRobotMsg() {
      clearTimeout(this.timer);
      this.showTimer();
      //根据传来的消息从题库抽取问题
      await this.getProblem();
      let answerText = this.questionList[this.count - 1].content;
      console.log(answerText);
      let obj = {
          type: "leftinfo",
          time: this.getTodayTime(),
          name: "robot",
          content: answerText,
          question: [],
        };
        this.info.push(obj);
      },

    //获取题库问题
    async getProblem(){
      const token = this.$cookie.getCookie("token");
      const header = {
        'token': token
      }
      await this.$axios.get("getAIQuestionList", { headers: header }).then(res=>
      {
        console.log(res.data.data);
        for (let i = 0; i < res.data.data.length; i++)
        {
          this.questionList.push(res.data.data[i]);
        }
      })
    },

      // this.$nextTick(() => {
      //   var contentHeight = document.getElementById("content");
      //   contentHeight.scrollTop = contentHeight.scrollHeight;
      // });

    showTimer() {
      this.timer = setTimeout( 1000 * 60);
    },
    getTodayTime() {
      // 获取当前时间
      var day = new Date();
      let seconds = day.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      } else {
        seconds = seconds;
      }
      let minutes = day.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      } else {
        minutes = minutes;
      }
      let time =
        day.getFullYear() +
        "-" +
        (day.getMonth() + 1) +
        "-" +
        day.getDate() +
        " " +
        day.getHours() +
        ":" +
        minutes +
        ":" +
        seconds;
      return time;
    },
    //测试
    gettext(){
      const arr = ['happy','sad','normal']
      this.mood = arr[Math.floor(Math.random()*3)]
        let text=this.mood;
        return text;
    },

    //开始录音
    handleStart() {
      if(this.checkcount())
      {
        return 0;
      }
      this.recorder = new Recorder()
      Recorder.getPermission().then(() => {
        console.log('开始录音')
        this.recorder.start() // 开始录音
      }, (error) => {
        this.$message({
          message: '请先允许该网页使用麦克风',
          type: 'info'
        })
        console.log(`${error.name} : ${error.message}`)
      })
    },
    //停止录音
    handleStop() {
      if(this.checkcount())
      {
        return 0;
      }
      console.log('停止录音')
      this.recorder.stop();
      const blob = this.recorder.getWAVBlob();
      const newBlob = new Blob([blob], {type: 'audio/wav'});
      const url = URL.createObjectURL(newBlob);
      console.log(url);
      this.recordList.push(url);
    },
    //删除录音
    handleDestroy() {
      if(this.checkcount())
      {
        return 0;
      }
      console.log('删除')
      if (this.recorder == null || this.recorder.duration === 0) {
        this.$message({
          message: '请先录音',
          type: 'error'
        })
        return false
      }
      this.recorder.destroy() // 毁实例
      this.recordList.pop();
      this.timer = null
    },
    //播放录音
    handlePlay(index) {
      let selfIndex = Math.floor(index / 2);
      console.log(selfIndex);
      this.$refs.audio.src = this.recordList[selfIndex];
      this.$refs.audio.play();
      // this.recorder.play();
      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime()
        } catch (error) {
          this.timer = null
        }
      }, 100)



    },
  }
}
</script>

<style lang="scss">
.main {
  width: 100%;
  // height: 100vh;
  background: linear-gradient(
      180deg,
      rgba(149, 179, 212, 1) 0%,
      rgba(74, 131, 194, 1) 100%
  );
  overflow: hidden;
  .box {
    width: 100%;
    /* width: 680px; */
    height: 500px;
    background-color: #fafafa;
    position: relative;
    padding: 1.25rem;
    #content {
      height: 340px;
      overflow-y: scroll;
      font-size: 14px;
      width: 100%;
      .circle {
        display: inline-block;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: #eff1f3;
      }
      .con_text {
        color: #333;
        margin-bottom: 5px;
      }
      .con_que {
        color: #1c88ff;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
      .info_r {
        position: relative;
        .circle_r {
          position: absolute;
          left: 0%;
        }
        .pic_r {
          width: 17px;
          height: 17px;
          margin: 8px;
        }
        .con_r {
          display: inline-block;
          /* max-width: 253px; */
          width: 55%;
          min-height: 55px;
          /* min-height: 20px; */
          background-color: #e2e2e2;
          border-radius: 6px;
          padding: 10px;
          margin-left: 40px;
        }
        .time_r {
          margin-left: 45px;
          color: #999999;
          font-size: 12px;
        }
      }
      .info_l {
        text-align: right;
        // margin-right: 20px;
        color: #ffffff;
        color: #3163C5;
        margin-top: 10px;

        // .circle_l {
        //   // vertical-align: -10px;
        // }
        .pic_l {
          width: 13px;
          height: 17px;
          margin: 8px 10px;
        }
        .time_l {
          margin-right: 45px;
          color: #999999;
          font-size: 12px;
          margin-top: 5px;
        }
        .con_l {
          display: inline-block;
          width: 220px;
          min-height: 51px;
          background-color: #3163C5;
          border-radius: 6px;
          padding: 10px;
          text-align: left;
          color: #fff;
          margin-right: 5px;
        }
      }
      #question {
        cursor: pointer;
      }
    }
  }
}
.setproblem {
  width: 100%;
  height: 68px;
  background-color: #ffffff;
  position: relative;
  margin-top: 3.75rem;

}
.setproblem textarea {
  color: #999999;
  padding: 10px;
  box-sizing: border-box;
}
.setproblem button {
  width: 5.875rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #3163C5;
  opacity: 1;
  border-radius: 4px;
  font-size: 10px;
  color: #ffffff;
  position: absolute;
  right: 5%;
  top: 30%;
  cursor: pointer;
  border: none;
}

.czkj-item-title {
  line-height: 25px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 5px;
}

.czkj-item-question {
  cursor: pointer;
  display: block;
  padding: 8px;
  position: relative;
  border-bottom: 1px dashed #ccc;
  line-height: 20px;
  min-height: 20px;
  overflow: hidden;
}

.czkj-question-msg {
  float: left;
  font-size: 14px;
  color: #3163C5;
}
</style>
