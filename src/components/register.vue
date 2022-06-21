<template>
	<div class="register">
    <el-row type="flex" justify="center" align="middle">
      <el-form class="register_form" :model="newuser" :rules="rules">
        <h3 style="text-align: center;">注册</h3>
        <el-form-item prop="userName">
          <el-input type="text" v-model="newuser.userName" placeholder="请输入用户名" style="width: 90%; display: inline-block"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input type="text" v-model="newuser.phone" placeholder="请输入电话" style="width: 90%; display: inline-block"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="newuser.password" placeholder="请输入密码" style="width: 90%; display: inline-block"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input type="password" v-model="newuser.rePassword" placeholder="请再次输入密码" style="width: 90%; display: inline-block"></el-input>
        </el-form-item>
        <router-link to='/login'>返回登录</router-link>
        <el-form-item>
          <el-button type="primary" style="width: 90%; margin-top: 15px;" @click="register">注册</el-button>
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
    name: 'register',
    data() {
      return {
        newuser: {
          userName: "",
          phone: "",
          password: "",
          rePassword: ""
        },
        rules: {
          userName: [
            { type: "string", required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          phone: [
            { type: "string", required: true, message: '请输入电话', trigger: 'blur' }
          ],
          password: [
            { type: "string", required: true, message: '请输入密码', trigger: 'blur' }
          ],
          rePassword: [
            { type: "string", required: true, message: '请再次输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    methods: {
      register: function () {
        let fd = new FormData();
        fd.append("username", this.newuser.userName);
        fd.append("password", this.newuser.password);
        fd.append("phone", this.newuser.phone);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        if (this.password === this.rePassword) {
          this.$axios.post("register", fd, config).then(res => {
            if (res.data.code === 200) {
              this.$router.push({ path: "/login" });
            } else {
              alert("注册失败");
            }
          })
        } else {
          alert("两次输入的密码不同")
        }
      }
    }
  }
</script>

<style>
.register {
  background: #4682B4;
  position: fixed;
  width: 100%;
  height: 100%;
}
.register_form {
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
