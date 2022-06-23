<template>
  <div class="header_container">
    <h3 style="color: #fff;">智能陪练</h3>
    <el-dropdown @command="handleCommand" menu-align='start'>
      <img src="../assets/avatar.png" alt="" class="avatarDropdown">
      <el-dropdown-menu slot="dropdown" :append-to-body="false">
        <el-dropdown-item command="signOut">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
  name: "topBar",
  methods: {
    handleCommand(command) {
      if (command === 'signOut')
      {
        this.$cookie.delCookie("uid");
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped>
.header_container{
  background-color: #092746;
  height: 60px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-left: 20px;
}
.avatarDropdown{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 37px;
  margin-left: 30px;
}
.el-dropdown-menu__item{
  text-align: center;
}
.el-popper {
  width: 75px;
  margin-right: 15px;
}
</style>
