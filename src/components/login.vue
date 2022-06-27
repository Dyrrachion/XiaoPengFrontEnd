<template>
  <div class="login">
    <el-row type="flex" justify="center" align="middle">
      <el-form ref="loginForm" :model="user" status-icon>
        <h3>登录</h3>
        <hr>
        <el-form-item prop="username" style="width: 80%; display: inline-block; margin-top: 50px;">
          <el-input type="text" v-model="user.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item id="password" prop="password" style="width: 80%; display: inline-block">
          <el-input type="password" v-model="user.password" show-password prefix-icon="el-icon-lock"
                    @keyup.enter.native="doLogin()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin()" style="width: 80%;">登 录</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 50px;">
          <el-button type="primary" @click="doRegister()" style="width: 80%;">注 册</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { type: "string", required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { type: "string", required: true, message: '请输入密码', trigger: 'blur' }
        ]
     }
    };
  },
  created() {},
  methods: {
    doLogin() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
      } else {
        let fd = new FormData();
        fd.append("username",this.user.username);
        fd.append("password",this.user.password);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        fd.forEach((value, key) => {
            console.log(`key ${key}: value ${value}`);
        })
        axios
          .post("login", fd, config)
          .then(res => {
            // console.log("输出response.data.status", res.data.status);
            if (res.data.code === 200) {
              console.log(res.data.data);
              this.$cookie.setCookie("token", res.data.data.token);
              this.$cookie.setCookie("uid", res.data.data.uid);
              this.$router.push({ path: "/main" });
            } else {
              alert("您输入的用户名或密码错误！");
            }
          });
      }
    },
    doRegister() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style>
  .login {
    background: #4682B4;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .el-form {
    background: rgba(255, 255, 255, 0.5);
    vertical-align: center;
    margin: 20px;
    width: 30%;
    height: 60%;
    border-radius: 10px;
    text-align: center;
  }
  .el-row {
    height: 100%;
  }

</style>
