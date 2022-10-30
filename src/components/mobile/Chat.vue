<template>
  <div class="chat">
    <el-container class="container">
      <!-- 顶栏容器 -->
      <el-header style="height: 6%">
        <el-row style="">
          <el-col :span="5">
            <div class="grid-content back_box">
              <el-button icon="el-icon-back" />
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content title_info_box">
              {{ activeName }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content extend_box">
              <el-button icon="el-icon-circle-plus-outline" />
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主要区域容器 -->
      <el-main style="height: 84%">
        <router-view></router-view>
      </el-main>
      <!-- 底栏容器 -->
      <el-footer style="height: 10%">
        <router-link tag="a" to="/mobile/chatList"> 聊天 </router-link>
        <router-link tag="a" to="/mobile/friendList"> 好友 </router-link>
        <router-link tag="a" to="/mobile/find"> 发现 </router-link>
        <router-link tag="a" to="/mobile/me"> 我的 </router-link>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Chat",
  data() {
    return {
      activeName: "聊天",
    };
  },
  components: {},
  methods: {},
  mounted() {},
};
</script>
<style scoped>
.container {
  /* 铺满可视化屏幕 vh是相对值=100%高度 */
  height: 100vh;
}
.container .el-header {
  background-color: rgb(120, 65, 171);
  padding: 0;
  /* overflow: hidden; */
}
.container .el-main {
  overflow: auto;
  background-color: rgb(147, 134, 159);
  padding: 0;
}
.container .el-footer {
  background-color: rgb(12, 66, 100);
  padding: 0;
}
.grid-content .el-button {
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 0;
  margin: 0;
}
.grid-content {
  text-align: center;
  /* position: absolute; */
  /* top: 0; */
  /* width: 100%; */
  /* height: 100%; */
}
.back_box {
  /* width: 10%;
  float: left;
  background: #d3dce6; */
}
.title_info_box {
  /* margin-left: 10px;
  width: 10%;
  background: #99a9bf; */
}
.extend_box {
  /* float: right;
  width: 10%;
  background: #d3dce6; */
}
</style>