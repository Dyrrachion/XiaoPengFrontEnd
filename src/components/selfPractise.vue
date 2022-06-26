<template>
  <div>
    <el-row justify="center" style="margin-top: 50px;">
      <span style="font-size: 30px;">{{ questionData }}</span>
    </el-row>
    <el-row style="margin-top: 50px;">
      <el-input ref="input"
                v-if="questionList[currentQuestion - 1] && questionList[currentQuestion - 1].type === '问答'"
                v-model="input" placeholder="请输入您的答案" style="width: 50%;"
                type="textarea"
                :rows="4">
      </el-input>
      <el-radio-group v-if="questionList[currentQuestion - 1] && questionList[currentQuestion - 1].type === '单选'"
                      v-model="choicesSelection"
                      size="medium">
        <el-radio v-for="choice in questionList[currentQuestion - 1].choices"
                  :key="choice.id" :label="choice.content"
                  border size="medium"
                  style="display: block; font-size: 20px; width: 100vh; height: 50px;
                  text-align: left; margin-left: 0;">
          {{choice.content}}
        </el-radio>
      </el-radio-group>
    </el-row>
    <el-row style="margin-top: 50px;">
      <span style="font-size: 30px">{{ questionAnswer }}</span>
    </el-row>
    <el-row style="margin-top: 100px;">
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
      choicesSelection: '',
      currentQuestion: 1,
      allQuestion: 2,
      questionData: "问题内容",
      questionAnswer: "",
      questionList: [],
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
        this.questionData = this.questionList[this.currentQuestion - 1].content;
        this.questionAnswer = '';
        this.input = "";
      }
    },
    rightClicked() {
      if (this.currentQuestion < this.allQuestion)
      {
        this.currentQuestion++;
        this.questionData = this.questionList[this.currentQuestion - 1].content;
        this.questionAnswer = '';
        this.input = "";
      }
    },
    jumpToResult() {
      this.$router.push({ path: "/selfPractiseResult"});
    },
    getQuestionList() {
      const param = {
        selNum: 3,
        subNum: 3
      }
      const token = this.$cookie.getCookie("token");
      const header = {
        'token': token
      }
      console.log(token);
      this.$axios.get("getQuestionList", { params: param, headers: header })
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++)
          {
            const question = {
              content: res.data.data[i].content,
              answer: res.data.data[i].answer,
              type: res.data.data[i].type,
              choices: res.data.data[i].choices
            }
            this.questionList.push(question);
          }
          console.log(this.questionList);
          this.allQuestion = this.questionList.length;
          this.questionData = this.questionList[0].content;
        });
    },
    printAnswer() {
      if (this.questionList[this.currentQuestion - 1].type === '单选')
      {
        console.log(true);
        let answerIndex = parseInt(this.questionList[this.currentQuestion - 1].answer);
        this.questionAnswer = "答案：" + this.questionList[this.currentQuestion - 1].choices[answerIndex].content;
      }
      else
      {
        console.log(false);
        this.questionAnswer = "答案：" + this.questionList[this.currentQuestion - 1].answer;
      }
    }
  }
}
</script>

<style scoped>
  .el-radio >>> .el-radio__input {
    display: none !important;
  }
</style>
