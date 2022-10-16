<template>
  <div class="search">
    <el-header class="search_head">
      <el-container>
        <!--天气-->
        <el-container>
          <div class="weather_box">
            {{ city }}
            <div
              style="font-size: 20px; color: rgb(76, 136, 240); margin-top: 5px"
              class="el-icon-sunny"
            ></div>
            {{ temperature }}
          </div>
        </el-container>
        <!-- 用户登录信息 -->
        <el-dropdown @command="custerList">
          <el-container class="user_info" v-show="showUserData">
            <el-avatar
              :size="35"
              style="border: 1px solid #4e71f2"
              src="../../static/logo.png"
            ></el-avatar>
            <p>{{ subAlias }}</p>
          </el-container>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personalCenter" icon="el-icon-s-custom"
              >个人中心
            </el-dropdown-item>
            <el-dropdown-item command="accountSettings" icon="el-icon-setting"
              >账号设置
            </el-dropdown-item>
            <el-dropdown-item command="switchAccount" icon="el-icon-s-operation"
              >切换账号
            </el-dropdown-item>
            <el-dropdown-item command="logOut" icon="el-icon-user-solid"
              >退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-link
          class="to_login_link"
          v-show="!showUserData"
          type="info"
          underline="true"
          :href="loginUrl"
          >去登录..</el-link
        >
      </el-container>
    </el-header>

    <el-container>
      <el-aside class="search_left_aside"></el-aside>
      <el-main class="search_main">
        <!-- logo图片 -->
        <img class="search_logo" src="../../static/logo.png" />
        <div class="search_box">
          <el-container>
            <!-- 搜索输入框 -->
            <el-input
              class="search_input"
              placeholder="请输入搜索内容..."
              v-model.trim="searchValue"
              @keyup.enter.native="doSearch(searchValue)"
              :disabled="showLoading"
              clearable
            >
            </el-input>
            <!-- 搜索按钮 -->
            <el-button
              type="primary"
              :loading="showLoading"
              @click="doSearch(searchValue)"
              element-loading-spinner="el-icon-loading"
              icon="el-icon-search"
            >
              搜坤一下
            </el-button>
          </el-container>
        </div>
        <!-- 搜索内容展示 -->
        <div class="search_content">
          <div
            v-show="showSearchContent"
            v-for="emoji in emojiList"
            :key="emoji.id"
            style="display: inline-block; overflow: hidden"
          >
            <!-- 展示表情包图片 -->
            <el-image
              class="emoji_content"
              src="../../static/nodata.png"
              fit="fill"
            >
            </el-image>
          </div>
          <!-- 无数据展示 -->
          <el-empty
            class="no_search_data"
            v-show="showNoData"
            image="../../static/nodata.png"
          >
          </el-empty>
          <!-- 加载页面中 -->
          <div
            class="search_content_loading"
            v-show="showLoading"
            v-loading="showLoading"
            element-loading-text="坤坤表情包搜索中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0.0.0.0.5)"
          ></div>
        </div>
        <!-- 分页 -->
        <el-pagination
          class="page_box"
          v-show="showSearchContent"
          @current-change="changePage"
          :current-page="pageData.pageNum"
          :page-size="pageData.pageSize"
          layout="total, pager, jumper"
          :total="pageData.total"
        >
        </el-pagination>
      </el-main>
      <el-aside class="search_left_right"></el-aside>
    </el-container>

    <el-footer class="serach_footer">
      根据我国《坤法》第250条，故意散布贬损他人人格，破坏他人名誉，本罪在犯罪客观方面表现为行为人实施捏造并散布某种虚拟事实，足以贬损他人人格、名誉，
      数罪并罚处时长两年半的有期练习生。
    </el-footer>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      serverUrl: "http://localhost:9200/kun-blog",
      personalCenterUrl: "",
      accountSettingsUrl: "",
      switchAccountUrl: "",
      logOutUrl: "",
      showUserData: false,
      subAlias: "坤坤基尼太美",
      city: "广州",
      temperature: "32℃",
      searchValue: "",
      showLoading: false,
      showSearchContent: false,
      showNoData: false,
      emojiList: [
        {
          id: 0,
          typeId: 0,
          url: "",
          path: "",
          createTime: "",
          updateTime: "",
          name: "",
          remark: "",
          heat: 0,
        },
      ],
      pageData: {
        // 当前页数
        pageNum: 0,
        // 数据总数
        total: 0,
        // 页大小
        pageSize: 14,
      },
      // 配置信息
      emojiConfig: {
        emojiBaseUrl: "",
      },
    };
  },
  components: {},
  methods: {
    //
    custerList(item) {
      // 跳转页面网址
      var skipUrl;
      switch (item) {
        case "personalCenter":
          skipUrl = this.serverUrl + this.personalCenterUrl;
          break;
        case "accountSettings":
          skipUrl = this.serverUrl + this.accountSettingsUrl;
          break;
        case "switchAccount":
          skipUrl = this.serverUrl + this.switchAccountUrl;
          break;
        case "logOut":
          skipUrl = this.serverUrl + this.logOutUrl;
          break;
        default:
          skipUrl = "http://www.baidu.com";
      }
      // 跳转到可以回退的页面
      window.location = skipUrl;
    },
    // 开始搜索
    async doSearch(value) {
      console.info("开始搜索..." + value);
      this.showLoading = !this.showLoading;
      setTimeout(() => {
        this.emojiList = [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
          // { id: 15 },
          // { id: 16 },
          // { id: 17 },
        ];
        this.showSearchContent = !this.showSearchContent;
        this.showLoading = !this.showLoading;
        // this.showNoData = !this.showNoData;
      }, 1000);
    },
    // 跳转页数
    async changePage(val) {
      val = val - 1;
      console.log("当前页->" + val);
      // var result = await this.post(this.serverUrl + this.searchUrl, {
      //   searchContent: this.searchValue,
      //   page: val,
      //   size: this.pageData.pageSize,
      // });

      // this.handlerResult(result);
      // if (this.showNoSearchData) {
      // }
    },
    // 检查当前是否已经登录
    async checkLogin() {
      var token = this.$cookies.get("login_token");
      console.log("当前token->" + token);
      // 未登录
      if (token === undefined) {
      } else {
      }
    },
  },
  computed: {
    // 计算昵称长度，大于6个汉字则用...省略
    subAlias() {
      var computedAlias = this.alias;
      if (computedAlias.length > 6) {
        computedAlias = computedAlias.substring(0, 5) + "...";
      }
      return computedAlias;
    },
    // 处理登录路径
    loginUrl() {
      return "http://localhost:8080/#/login";
    },
  },
  mounted() {},
};
</script>

<style scoped>
.search {
  margin: 0;
}
.search_head {
  border-bottom: 1px solid rgb(210, 208, 208);
}
.search_main {
  height: 590px;
  text-align: center;
  margin: 0;
  padding: 0;
}
.search_left_aside {
}

.search_left_right {
}
.serach_footer {
  text-align: center;
  border-top: 1px solid rgb(210, 208, 208);
  font-size: 5px;
  padding-top: 15px;
}
.user_info {
  font: 13px/23px Arial, sans-serif;
  margin-top: 14px;
}
.user_info p {
  margin: 11px 4px 6px 6px;
}
.weather_box {
  position: absolute;
  top: 2.7%;
  right: 11%;
  width: 120px;
  letter-spacing: 3px;
  height: 35px;
  font: 13px/23px Arial, sans-serif;
}
.to_login_link {
  margin: 28px 50px 0px 5px;
}
.search_logo {
  width: 27%;
  height: 12%;
  margin: 20px 0px 15px 0px;
}
.search_input {
  width: 45%;
  margin-left: 22%;
}
.search_content {
  margin-top: 50px;
  margin-bottom: 30px;
  /* background-color: rgb(180, 181, 183); */
  width: 100%;
  height: 52%;
  overflow: auto;
}
.page_box {
  /* position: relative; */
  /* top: 0; */
}
.search_content_loading {
  width: 100%;
  height: 100%;
}
.no_search_data {
  margin-top: 50px;
}
.emoji_content {
  width: 130px;
  height: 140px;
  margin-left: 3px;
  margin-bottom: 0px;
}
</style>