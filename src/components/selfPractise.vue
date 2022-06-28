<template xmlns:el-row="http://www.w3.org/1999/html">
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
        <el-radio v-for="(choice, index) in questionList[currentQuestion - 1].choices"
                  :key="index" :label="choice.content"
                  border size="medium"
                  style="display: block; font-size: 20px; width: 100vh; height: 50px;
                  text-align: left; margin-left: 0;"
                  @change="setSelectedChoice(index)">
          {{choice.content}}
        </el-radio>
      </el-radio-group>
    </el-row>
    <div>
      <el-row>
        <el-col :span="4" style="height: 20vh;"></el-col>
        <el-col v-show="answerShow" ref="answerTab" :span="16"
                style="margin-top: 50px; height: 20vh;
                border-style: solid; text-align: left; padding-left: 15px; padding-top: 10px;">
          <span style="font-size: 20px; font-family: 'Source Code Pro',  'Droid Sans Mono', sans-serif;">
            {{ questionAnswer }}</span>
        </el-col>
        <el-col :span="4" style="height: 20vh;"></el-col>
      </el-row>
    </div>
    <el-row style="margin-top: 50px;">
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
      answerShow: false,
      selectedChoice: -1,
      locked: false
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
        this.resetPage();
      }
    },
    rightClicked() {
      if (this.currentQuestion < this.allQuestion)
      {
        this.currentQuestion++;
        this.resetPage();
      }
    },
    resetPage() {
      this.questionData = this.questionList[this.currentQuestion - 1].content;
      this.questionAnswer = '';
      this.input = "";
      this.selectedChoice = -1;
      this.answerShow = false;
      this.locked = false;
      this.$refs["answerTab"].$el["style"].backgroundColor = '#D1FFEE';
      this.$refs["answerTab"].$el["style"].borderColor = '#7cfc00';
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
      this.answerShow = true;
      if (this.questionList[this.currentQuestion - 1].type === '单选')
      {
        let answerIndex = parseInt(this.questionList[this.currentQuestion - 1].answer);
        if (this.selectedChoice !== answerIndex)
        {
          console.log(false);
          this.$refs["answerTab"].$el["style"].backgroundColor = '#FFC5D3';
          this.$refs["answerTab"].$el["style"].borderColor = '#FF81A8';
        }
        else
        {
          console.log(true);
          this.$refs["answerTab"].$el["style"].backgroundColor = '#D1FFEE';
          this.$refs["answerTab"].$el["style"].borderColor = '#7cfc00';
        }
        this.questionAnswer = "答案：" + this.questionList[this.currentQuestion - 1].choices[answerIndex].content;
      }
      else
      {
        this.questionAnswer = "答案：" + this.questionList[this.currentQuestion - 1].answer;
      }
    },
    setSelectedChoice(index) {
      if (!this.locked)
      {
        this.selectedChoice = index;
        this.locked = true;
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
