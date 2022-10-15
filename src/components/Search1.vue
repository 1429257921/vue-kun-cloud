<template>
  <div style="height: 100%;">
    <el-container id="container" style="height: 100%">
      <!-- 顶部容器 -->
      <el-header
        style="
          height: 7%;
          margin-top: 0px;
          padding-right: 3%;
          border-bottom: 1px inset;
        "
      >
        <el-dropdown
          trigger="click"
          @command="custerList"
          style="float: right; height: 100%"
        >
          <span class="el-dropdown-link">
            <el-avatar
              :size="35"
              style="border: 1px solid #4e71f2"
              src="../images/kgcc.jpg"
            ></el-avatar>
            <div
              style="
                padding-top: 5px;
                display: inline-block;
                margin-left: 3px;
                overflow: hidden;
                height: 80%;
              "
            >
              <div
                style="
                  margin-top: 13px;
                  font: 14px/23px 'PingFang SC', Arial, 'Microsoft YaHei',
                    sans-serif;
                "
              >
                {{ subAlias }}
              </div>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personalCenter"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item command="accountSettings"
              >账号设置</el-dropdown-item
            >
            <el-dropdown-item command="switchAccount"
              >切换账号</el-dropdown-item
            >
            <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-container id="main">
        <!-- 左侧容器 -->
        <el-aside style="width: 14%; height: 100%; text-align: center">
          <p></p>
        </el-aside>

        <!-- 主要区容器 -->
        <el-main style="padding: 0px">
          <el-container style="width: 100%; height: 100%">
            <!-- 坤坤搜索logo图 -->
            <el-header style="height: 15%; text-align: center">
              <img id="logo" src="../../static/logo.png" />
            </el-header>
            <!-- 搜索框 -->
            <el-main style="height: 18%; padding: 30px">
              <el-input
                style="width: 50%; margin-left: 19%"
                placeholder="请输入搜索内容..."
                v-model.trim="searchValue"
                @keyup.enter.native="startSearch(searchValue)"
                clearable
              >
              </el-input>
              <!-- 搜索按钮 -->
              <el-button
                type="primary"
                :loading="showLoading"
                @click="startSearch(searchValue)"
                element-loading-spinner="el-icon-loading"
              >
                搜坤一下
              </el-button>
            </el-main>

            <!-- 展示搜索内容 -->
            <el-main
              id="showSearch"
              style="height: 75%; padding: 0px; position: relative"
            >
              <div class="showSearchContent" v-if="showSearch">
                <!-- 遍历表情包集合 -->
                <div
                  v-for="emoji in emojiList"
                  :key="emoji.id"
                  style="display: inline-block; overflow: hidden"
                >
                  <!-- 展示表情包图片 -->
                  <el-image
                    style="
                      width: 130px;
                      height: 140px;
                      margin-left: 3px;
                      margin-bottom: 10px;
                    "
                    :src="emojiConfig.emojiBaseUrl + emoji.url"
                    fit="fill"
                  >
                  </el-image>
                </div>
                <!-- </ul> -->
              </div>
              <!-- 分页导航 -->
              <div class="paging" v-if="showSearch">
                <el-pagination
                  @current-change="changePage"
                  :current-page="pageData.pageNum"
                  :page-size="pageData.pageSize"
                  layout="total, pager, jumper"
                  :total="pageData.total"
                >
                </el-pagination>
              </div>
              <!-- 无数据展示 -->
              <el-empty v-if="showNoSearchData" image="../images/nodata.jpg">
              </el-empty>
              <!-- 加载页面中 -->
              <div
                style="width: 100%; height: 50%"
                v-if="showLoading"
                v-loading="showLoading"
                element-loading-text="坤坤表情包搜索中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0.0.0.0.5)"
              ></div>
            </el-main>
          </el-container>
        </el-main>

        <!-- 右侧容器 -->
        <el-aside style="width: 14%; height: 100%; text-align: center">
          <p></p>
        </el-aside>
      </el-container>

      <!-- 底部容器 -->
      <el-footer
        style="
          height: 5%;
          margin-bottom: 0px;
          text-align: center;
          border-top: 1px inset;
        "
      >
        <p style="font-size: 4px; margin-top: 8px">
          根据我国《坤法》第250条，故意散布贬损他人人格，破坏他人名誉，本罪在犯罪客观方面表现为行为人实施捏造并散布某种虚拟事实，足以贬损他人人格、名誉，
          数罪并罚处时长两年半的有期练习生。
        </p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Search1",
  data() {
    return {
      serverUrl: "http://localhost:9200/kun-blog",
      searchUrl: "/api/emoji/search",
      getConfigUrl: "/api/emoji/getConfig",
      showSearch: false,
      showNoSearchData: false,
      showLoading: false,
      searchValue: "",
      alias: "坤坤",
      url: "",
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
        pageSize: 2,
      },
      // 配置信息
      emojiConfig: {
        emojiBaseUrl: "",
      },
    };
  },
  methods: {
    custerList(item) {
      console.log(item);
      // 跳转页面网址
      var skipUrl = "http://www.baidu.com";
      switch (item) {
        case "personalCenter":
          skipUrl = "http://www.baidu.com";
          break;
        case "accountSettings":
          skipUrl = "http://www.baidu.com";
          break;
        case "switchAccount":
          skipUrl = "http://www.baidu.com";
          break;
        case "logOut":
          skipUrl = "http://www.baidu.com";
          break;
        default:
          skipUrl = "http://www.baidu.com";
      }
      // 跳转到可以回退的页面
      window.location = skipUrl;
    },

    // 开始搜索
    async startSearch(searchValue) {
      if (searchValue === "") {
        this.$message({
          message: "请先输入搜索内容",
          type: "warning",
        });

        return;
      }
      console.log("开始搜索");
      this.showNoSearchData = false;
      this.showSearch = false;
      this.emojiList = [];
      if (this.emojiList === undefined || this.emojiList.length === 0) {
        // console.log('展示加载中的页面')
        this.showLoading = true;
      } else {
        this.pageData = {
          pageNum: 0,
          total: 0,
          size: this.pageData.pageSize,
        };
      }

      var result = await this.post(this.serverUrl + this.searchUrl, {
        searchContent: searchValue,
        page: this.pageData.pageNum,
        size: this.pageData.pageSize,
      });

      this.handlerResult(result);
    },

    // 跳转页数
    async changePage(val) {
      val = val - 1;
      console.log("当前页->" + val);
      var result = await this.post(this.serverUrl + this.searchUrl, {
        searchContent: this.searchValue,
        page: val,
        size: this.pageData.pageSize,
      });

      this.handlerResult(result);
      if (this.showNoSearchData) {
      }
    },
    // 调用接口
    async post(url, param) {
      console.log("params->" + JSON.stringify(param));
      var result;
      await axios({
        method: "GET",
        url: url,
        params: param,
      })
        .then((res) => {
          result = res;
        })
        .catch((err) => {
          console.log("调用接口发生错误->" + err);

          // this.$message.error('搜索失败，找不到服务器');
          this.$message.error(err);
        });
      this.showLoading = false;
      console.log(result);
      return result;
    },

    async handlerResult(result) {
      // 失败响应处理 状态码不为200
      if (result === undefined) {
        // await this.$message.error('调用服务器发生错误，请稍后重试！');
        return;
      }
      if (result.status !== 200) {
        if (result.data !== undefined && result.data.body !== undefined) {
          console.err(result.data.body.msgDetail);
          await this.$message.error(result.data.body.message);
          return;
        }
        await this.$message.error("服务器无内容响应，请稍后重试！");
        return;
      }

      // 正确响应处理 状态码为200
      if (result.data === undefined || result.data.body === undefined) {
        await this.$message.error("客户端无内容响应，请稍后重试！");
        return;
      }

      // 查询无数据
      if (
        result.data.body.list === undefined ||
        result.data.body.list.length === 0
      ) {
        this.showNoSearchData = true;
        this.showSearch = false;
        return;
      }

      // 查询有数据
      this.emojiList = result.data.body.list;
      this.pageData = result.data.body;
      this.showSearch = true;
      this.showNoSearchData = false;
      this.showLoading = false;
    },

    async getConfig() {
      var result;
      await axios({
        method: "GET",
        url: this.serverUrl + this.getConfigUrl,
        params: { userId: "kunkun123123", alias: "坤哥" },
      })
        .then((res) => {
          result = res;
        })
        .catch((err) => {
          console.log("调用接口发生错误" + err.response.data);
          this.$message.error(err.response.data.message);
          return;
        });
      this.emojiConfig = result.data.body;
      // console.log('获取配置->' + JSON.stringify(result));
      console.log("获取配置->" + JSON.stringify(result.data.body));
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
  },
  // 初始化
  mounted() {
    console.log("开始初始化");
    this.getConfig();
  },
};
</script>

<style scoped>
html {
  height: 100%;
}

body {
  height: 98%;
}

#main {
  height: 100%;
}

#logo {
  width: 23%;
  height: 80%;
  margin-top: 20px;
}

.showSearchContent {
  /* background-color: rebeccapurple; */
  height: 88%;
  overflow: auto;
}

.paging {
  height: 10%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
}
</style>