<template>
  <div>
    <el-row justify="center" style="margin-top: 50px;">
      <span style="font-size: 30px;">{{ questionData }}</span>
    </el-row>
    <el-row style="margin-top: 50px;">
      <el-input ref="input" v-model="input" placeholder="请输入您的答案" style="width: 50%;"
                type="textarea"
                :rows="4">
      </el-input>
    </el-row>
    <el-row style="margin-top: 50px;">
      <span style="font-size: 20px" v-show="answerShow">答案：{{ questionAnswer }}</span>
    </el-row>
    <el-row style="margin-top: 250px;">
      <el-button type="primary" style="width: 10%; margin-right: 200px;" @click="leftClicked()">上一题</el-button>
      <span style="font-size: 24px;">{{ currentQuestion }} / {{ allQuestion }}</span>
      <el-button type="primary" style="width: 10%; margin-left: 200px;" @click="rightClicked()">下一题</el-button>
    </el-row>
    <el-row style="margin-top: 50px;">
      <el-button type="primary" style="width: 10%;"
                 @click="printAnswer()">显示答案</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "selfPractise",
  data() {
    return {
      input: '',
      currentQuestion: 1,
      allQuestion: 2,
      questionData: "问题内容",
      questionAnswer: "问题答案",
      questionList: [],
      questionAnswerList: [],
      answerShow: false
    }
  },
  created() {
    this.getQuestionList();
  },
  methods: {
    leftClicked() {
      if (this.currentQuestion > 1)
      {
        this.currentQuestion--;
        this.questionData = this.questionList[this.currentQuestion - 1];
        this.questionAnswer = this.questionAnswerList[this.currentQuestion - 1];
        this.answerShow = false;
        this.input = "";
      }
    },
    rightClicked() {
      if (this.currentQuestion < this.allQuestion)
      {
        this.currentQuestion++;
        this.questionData = this.questionList[this.currentQuestion - 1];
        this.questionAnswer = this.questionAnswerList[this.currentQuestion - 1];
        this.answerShow = false;
        this.input = "";
      }
    },
    jumpToResult() {
      this.$router.push({ path: "/selfPractiseResult"});
    },
    getQuestionList() {
      const param = {
        number: 5
      }
      this.$axios.get("getQuestionList", { params: param })
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++)
          {
            this.questionList.push(res.data.data[i].content);
            this.questionAnswerList.push(res.data.data[i].answer);
          }
          this.allQuestion = this.questionList.length;
          this.questionData = this.questionList[0];
          this.questionAnswer = this.questionAnswerList[0];
        });
    },
    printAnswer() {
      this.answerShow = true;
    }
  }
}
</script>

<style scoped>

</style>
