<template>
  <div class="register">
    <el-header class="header" style="height: 7%">
      <el-row :gutter="24" class="title" style="margin: 0">
        <el-col :span="7"
          ><div class="grid-content roll_back">
            <el-button
              icon="el-icon-back"
              @click="rollBackPage"
              style="background-color: #222121; border: 0"
            ></el-button>
          </div>
        </el-col>
        <el-col :span="10"
          ><div class="grid-content page_info" :style="titleStyle">
            页面信息
          </div></el-col
        >
        <el-col :span="7"
          ><div class="grid-content extended">
            <!-- <el-button :size="$getComponentSize" icon="el-icon-circle-plus-outline"></el-button> -->
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-tabs
      tab-position="bottom"
      v-model="activeName"
      type="border-card"
      @tab-click="handleClick"
      :stretch="true"
    >
      <el-tab-pane class="change_page" name="chat">
        <span slot="label"><i class="el-icon-date"></i> 聊天</span>
        <!-- <el-main class="main" :style="mainHeight">聊天</el-main> -->
        <el-main class="main" :style="mainHeight">聊天</el-main>
      </el-tab-pane>
      <el-tab-pane class="change_page" name="addressBook"
        ><span slot="label"><i class="el-icon-date"></i> 通讯录</span>
        <el-main class="main" :style="mainHeight">通讯录</el-main>
      </el-tab-pane>
      <el-tab-pane class="change_page" name="find"
        ><span slot="label"><i class="el-icon-date"></i> 发现</span>
        <el-main class="main" :style="mainHeight">发现</el-main>
      </el-tab-pane>
      <el-tab-pane class="change_page" name="me"
        ><span slot="label"><i class="el-icon-date"></i> 我的</span>
        <el-main class="main" :style="mainHeight">我的</el-main>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "GoChat",
  data() {
    return {
      msg: "",
      activeName: "chat",
      titleStyle: {
        height: "40px",
      },
      mainHeight: {
        height: "500px",
      },
    };
  },
  methods: {
    // 退出页面
    rollBackPage() {
      console.info("退出页面");
      var height = document.body.clientHeight;
      console.info("高度->" + height);
      alert("高度" + height);
    },
    // 切换页面
    handleClick(tab, event) {
      console.log(tab, event);
      this.msg = tab;
    },
    selectBox() {
      var height = document.body.clientHeight;
      // 获取可见区域高度
      // var height = document.documentElement.clientHeight;
      console.info("高度->" + height);
      console.info("计算高度->" + height * 0.835);
      this.mainHeight.height = height * 0.838 + "px";
      this.titleStyle.height = height * 0.05 + "px";
    },
  },
  mounted() {
    this.selectBox();
  },
  created() {
    // var height = document.body.clientHeight;
    // console.info("高度->" + height);
    // var box = document.getElementsByClassName("main");
    // box.style.height = height * 0.8;
  },
};
</script>
<style scoped>
.register {
  margin: 0;
  border: 0;
  height: 100%;
  width: 100%;
  background-color: azure;
}
.header {
  margin: 0;
  padding: 0;
  height: 8%;
  background-color: #222121;
  color: rgb(221, 223, 225);
  font-family: "Hiragino Sans GB";
}
.title {
  /* color: rgb(221, 223, 225); */
  /* background-color: #222121;
  font-family: "Hiragino Sans GB"; */
  /* height: 50px; */
}
.main {
  /* min-height: 150vh; */
  height: 535px;
  /* height: 100%; */
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: auto;
  background-color: aquamarine;
}

.grid-content {
  height: 100%;
}
.page_info {
  padding-top: 10px;
  height: 100%;
  text-align: center;
}
</style>
<style>
/* .header[data-v-677abdbc] {
  background-color: #222121;
} */
/* 展示内容 */
.el-tabs--border-card .el-tabs__content {
  padding: 0;
  margin: 0;
  width: 100%;
  /* height: 535px; */
  /* height: 100%; */
}
.el-tabs--bottom .el-tabs__header.is-bottom {
  margin: 0;
}
.change_page[data-v-677abdbc] {
  width: 100%;
}
/* 底部按钮 */
.el-tabs__item {
  padding-top: 10px;
  height: 60px;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #767676;
  border-right-color: #767676;
  border-left-color: #767676;
}
.el-tabs__nav {
  background-color: #222121;
}
.el-tabs--bottom.el-tabs--border-card .el-tabs__header.is-bottom {
  border: 0;
}
/* .el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom{
  margin-bottom: 0;
} */
.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border-bottom: 0;
}
.el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom:not(.is-active) {
  border: 1px solid #493e3e;
}
</style>