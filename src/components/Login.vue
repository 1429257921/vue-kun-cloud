<style>
   html {
      height: 100%;
      background-image: url(/static/backgroud.png);
      /* background-repeat: no-repeat; */
      background-size: 100%;
    }

    body {
      height: 98%;
    }

    #root {
      text-align: center;
    }

    .head {
      /* background-color: antiquewhite; */
      line-height: 60px;
    }

    .left_aside {
      width: 14%;
      /* background-color: aquamarine; */
    }

    .right_aside {
      width: 14%;
      /* background-color: blueviolet; */
    }

    .main {
      height: 100%;
      width: 70%;
      /* background-color: yellow; */
      line-height: 540px;
    }

    .login_box {
      margin: 50px 150px 120px 150px;
      padding: 50px 120px 10px 50px;
      height: 100%;
      text-align: center;
      background-color: rgb(202, 200, 200);
      border-radius: 20px;
      opacity: 0.9;
    }

    .footer {
      /* background-color: violet; */
      line-height: 60px;
    }

</style>

<template>
  <div class="login_box">
    <el-container>
      <el-header class="head"> </el-header>
      <el-container>
        <el-aside class="left_aside"></el-aside>
        <el-main class="main">
          <div class="login_box">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="账号" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="passWord">
                <el-input
                  type="password"
                  v-model="ruleForm.passWord"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassWord">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPassWord"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="验证码" prop="code" label-width="100px">
                <el-container>
                  <el-input v-model="ruleForm.code"></el-input>

                  <el-image
                    style="width: 250px; height: 41px; margin-left: 20px"
                    @click="getCode"
                    :src="getCodeData.img"
                    fit="fit"
                  >
                  </el-image>
                </el-container>
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  @click="login('ruleForm')"
                  :loading="showLogging"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-main>
        <el-aside class="right_aside"></el-aside>
      </el-container>
      <el-footer class="footer"> </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    // 校验用户名
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    // 校验验证码
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    // 校验密码
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPassWord !== "") {
          this.$refs.ruleForm.validateField("checkPassWord");
        }
        callback();
      }
    };
    // 校验确认密码
    var validatePassWord2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      serverUrl: "http://localhost:9200/kun-blog",
      getCodeUrl: "/api/auth/getCode",
      loginUrl: "/api/auth/login",
      validatedCodeUrl: "/api/auth/validatedCode",
      skipUrl: "",
      // 是否登录中
      showLogging: false,
      getCodeData: {
        uuid: "",
        img: "",
      },
      ruleForm: {
        userName: "",
        passWord: "",
        checkPassWord: "",
        code: "",
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        passWord: [{ validator: validatePassWord, trigger: "blur" }],
        checkPassWord: [{ validator: validatePassWord2, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 登录方法
    async login(ruleForm) {
      console.info("校验参数->" + JSON.stringify(ruleForm));

      this.showLogging = true;
      await this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 表单校验通过
          console.info("执行登录方法");
          this.$http({
            method: "post",
            url: this.serverUrl + this.validatedCodeUrl,
            data: { uuid: this.getCodeData.uuid, code: this.ruleForm.code },
          })
            .then((res) => {
              // console.info('校验接口返回结果->' + JSON.stringify(res));
              if (res.status === 200) {
                console.info("校验通过！！！！");
                this.doLogin(this.ruleForm);
              }
            })
            .catch((err) => {
              // console.error('校验接口返回错误->' + JSON.stringify(err.response.data));
              console.error("错误码->" + err.response.status);
              this.$message.error(err.response.data.message);
              this.getCode();
            });
        } else {
          // 表单校验失败
          console.error("error submit!!");
          return false;
        }
      });

      this.showLogging = false;
    },

    // 调用登录接口
    async doLogin(ruleForm) {
      // console.info('登录参数->' + JSON.stringify(ruleForm));
      // let param = { 'userName': ruleForm.userName, 'passWord': ruleForm.passWord, 'code': ruleForm.code, 'timestamp': Date.now() };
      // console.info('参数->' + JSON.stringify(param));
      await axios
        .post(this.serverUrl + this.loginUrl, {
          userName: ruleForm.userName,
          passWord: ruleForm.passWord,
          code: ruleForm.code,
          timestamp: Date.now(),
        })
        .then((res) => {
          console.info("登录接口返回结果->" + JSON.stringify(res));
          if (res.status === 200) {
            // console.info(res.data)
            // console.info('登录成功, 准备跳转页面！！！！');
            this.$message({
              message: "登录成功",
              type: "success",
            });
            setTimeout(() => {
              window.location.href =
                "http://127.0.0.1:5500/%E5%9F%BA%E7%A1%80vue%E9%A1%B9%E7%9B%AE/test.html";
            }, 2000);
          }
        })
        .catch((err) => {
          console.error(
            "调用登录接口返回错误->" + JSON.stringify(err.response.data)
          );
          this.$message.error(err.response.data.message);
          this.getCode();
        });
    },

    // 获取验证码
    async getCode() {
      this.getCodeData = {};
      var result;
      await axios
        .get(this.serverUrl + this.getCodeUrl)
        .then((res) => {
          result = res;
        })
        .catch((err) => {
          console.log("调用接口发生错误" + err.response.data);
          this.$message.error(err.response.data.message);
          return;
        });
      this.getCodeData = result.data.body;
      // console.log('获取验证码->' + JSON.stringify(result.data.body));
    },
  },

  components: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // console.log('开始初始化');
    this.getCode();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>
