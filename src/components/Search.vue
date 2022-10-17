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
              :src="getConfigVO.pictureBaseUrl + loginUserInfo.avatar"
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
        <el-button
          class="to_login_link"
          type="text"
          v-show="!showUserData"
          @click="gotoLogin"
          >去登录..</el-button
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
              style="background-color: #4e6ef2"
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
              :src="getConfigVO.pictureBaseUrl + emoji.url"
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
      getConfigUrl: "/api/config/get",
      searchUrl: "/api/emoji/search",
      showUserData: false,
      alias: "坤坤基尼太美",
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
      getConfigVO: {
        pictureBaseUrl: "",
      },
      loginToken: "",
      // aliasPictureUrl: "",
      loginUserInfo: "",
    };
  },
  methods: {
    custerList(item) {
      // 跳转页面网址
      var skipUrl;
      switch (item) {
        case "personalCenter":
          skipUrl = "/userInfo";
          break;
        case "accountSettings":
          skipUrl = "/accountSettings";
          break;
        case "switchAccount":
          skipUrl = "/switchAccount";
          break;
        case "logOut":
          {
            this.$cookies.remove("user_info");
            this.$cookies.remove("login_token");
            // 刷新当前页面
            this.$router.go(0);
          }
          break;
        default:
          skipUrl = "http://www.baidu.com";
      }
      console.info("skipUrl->" + skipUrl);
      if (skipUrl !== undefined) {
        this.$router.push(skipUrl);
      }
    },

    // 开始搜索
    async doSearch(searchValue) {
      console.info(this.getConfigVO.pictureBaseUrl + this.aliasPictureUrl);
      if (searchValue === "") {
        this.$message({
          message: "请先输入搜索内容",
          type: "warning",
        });
        return;
      }

      if (await this.checkLogin()) {
        return;
      }
      this.pageData = {
        pageNum: 0,
        total: 0,
        pageSize: 14,
      };
      console.info("开始搜索..." + searchValue);
      this.showLoading = true;
      var result = await this.$http({
        methods: "get",
        url: this.serverUrl + this.searchUrl,
        headers: {
          Authorization: this.loginToken,
        },
        params: {
          searchContent: searchValue,
          page: this.pageData.pageNum,
          size: this.pageData.pageSize,
        },
      })
        // .then((res) => {
        //   if (res.status === 200) {
        //     result = res;
        //   }
        // })
        .catch((err) => {
          console.error(
            "调用搜索接口返回错误->" + JSON.stringify(err.response.data)
          );
          this.$message.error(err.response.data.message);
          return;
        });
      this.showLoading = false;
      // console.info("搜索结果->" + JSON.stringify(result.data.body));
      if (
        result !== undefined &&
        result.data.body.list !== undefined &&
        result.data.body.list.length !== 0
      ) {
        // 数据不为空
        this.showSearchContent = true;
        this.showNoData = false;
        this.emojiList = result.data.body.list;
        this.pageData = result.data.body;
      } else {
        this.showNoData = true;
        this.showSearchContent = false;
      }
    },
    // 跳转页数
    async changePage(val) {
      if (await this.checkLogin()) {
        return;
      }
      val = val - 1;
      console.log("当前页->" + val);
      // var result;
      var result = await this.$http({
        methods: "get",
        url: this.serverUrl + this.searchUrl,
        headers: {
          Authorization: this.loginToken,
        },
        params: {
          searchContent: this.searchValue,
          page: val,
          size: this.pageData.pageSize,
        },
      })
        // .then((res) => {
        //   if (res.status === 200) {
        //     result = res;
        //   }
        // })
        .catch((err) => {
          console.error(
            "调用分页接口返回错误->" + JSON.stringify(err.response.data)
          );
          this.$message.error(err.response.data.message);
          return;
        });
      // console.info("分页返回数据->" + JSON.stringify(result));
      this.emojiList = result.data.body.list;
      this.pageData = result.data.body;
    },
    // 路由到登录页面
    gotoLogin() {
      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
    },
    // 检查是否已经登录
    async checkLogin() {
      // console.info("======================");
      // console.info(this.loginToken);
      // console.info(this.loginUserInfo);
      if (
        this.loginToken === undefined ||
        this.loginUserInfo === undefined ||
        this.loginToken === null ||
        this.loginUserInfo === null ||
        this.loginToken === "" ||
        this.loginUserInfo === ""
      ) {
        // console.info("检查登录");
        await this.$confirm("登录后才能使用, 是否立刻去登录?", "提示", {
          confirmButtonText: "去登录",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.gotoLogin();
          })
          .catch(() => {});
        return true;
      }
      return false;
    },
    // 检查当前是否已经登录
    async initData() {
      var token = this.$cookies.get("login_token");
      // console.log("当前token->" + JSON.stringify(token));
      // 未登录
      if (token !== undefined && token !== "" && token !== null) {
        var userInfo = this.$cookies.get("user_info");
        // console.info("用户信息->" + JSON.stringify(userInfo));
        if (userInfo !== undefined && userInfo !== "" && userInfo !== null) {
          this.alias = userInfo.nickName;
          // this.aliasPictureUrl = userInfo.avatar;
          this.loginToken = token;
          this.loginUserInfo = userInfo;
          this.showUserData = true;
          this.getConfig();
        }
      }
    },
    // 获取配置
    async getConfig() {
      var result;
      await this.$http({
        url: this.serverUrl + this.getConfigUrl,
        headers: {
          Authorization: this.loginToken,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            result = res;
          }
        })
        .catch((err) => {
          console.error(
            "调用获取配置接口返回错误->" + JSON.stringify(err.response.data)
          );
          this.$message.error(err.response.data.message);
          return;
        });
      // console.info(JSON.stringify(result.data));
      this.getConfigVO = result.data.body;
    },
  },
  computed: {
    // 计算昵称长度，大于6个汉字则用...省略
    subAlias() {
      var computedAlias = this.alias;
      if (computedAlias !== undefined && computedAlias.length > 6) {
        computedAlias = computedAlias.substring(0, 5) + "...";
      }
      return computedAlias;
    },
  },

  mounted() {
    this.initData();
  },
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
/* .search_left_aside {
}

.search_left_right {
} */
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
  margin: 20px 40px 0px 5px;
  letter-spacing: 2px;
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
  width: 100%;
  height: 52%;
  overflow: auto;
}
/* .page_box {
} */
.search_content_loading {
  width: 100%;
  height: 100%;
}
.no_search_data {
  /* margin-top: 50px; */
}
.emoji_content {
  width: 130px;
  height: 140px;
  margin-left: 3px;
  margin-bottom: 0px;
}
</style>