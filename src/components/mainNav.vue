<template>
  <div>
    <top-bar></top-bar>
    <el-row style="height: 100%;">
      <el-col :span="3" style="height: 100%; background-color: #2c3e50">
        <el-menu :default-active=activePath class="el-menu-demo" router
        text-color="#fff" active-text-color="rgb(178, 195, 209)">
          <el-menu-item index="/docStudy">文档学习</el-menu-item>
          <el-menu-item index="/selfPractise">自我练习</el-menu-item>
          <el-menu-item index="/aiPractise">人机对练</el-menu-item>
          <el-menu-item index="/userInfo">用户信息</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" style="height: 100%;">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "_axios@0.27.2@axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import TopBar from "./topBar";

export default {
  name: "mainNav",
  components: {TopBar},
  data() {
    return {
      activePath: '/userInfo'
    }
  },
  created() {
    this.$router.push({ path: this.activePath });
  },
  methods: {

  }
}
</script>

<style scoped>
  .el-menu-demo {
    text-align: center;
    background-color: #2c3e50;
    height: 100vh;
  }
  .el-menu-item:hover, .el-menu-item:focus {
    background-color: lightslategray !important;
  }
  ::v-deep.el-menu-item:active {
    background-color: #2c3e50;
  }
  ::v-deep.el-aside {
    display: block;
    position: relative;
    overflow-y: scroll;
  }
</style>
