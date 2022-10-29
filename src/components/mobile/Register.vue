<template>
  <div class="register">
    <el-tabs
      class="box"
      type="border-card"
      :stretch="true"
      v-model="activeName"
    >
      <el-tab-pane label="登录" name="login"> <login-page></login-page> </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <div class="register_box">
          <el-header class="title">GoChat</el-header>

          <el-main class="register_input">
            <el-form
              :model="registerFormData"
              :rules="registerRules"
              ref="ruleFormRef"
              label-width="50px"
            >
              <el-form-item prop="name">
                <span slot="label"><i class="el-icon-phone input-icon" /></span>
                <el-input
                  v-model.number="registerFormData.name"
                  placeholder="请输入手机号"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item prop="pass">
                <span slot="label"><i class="el-icon-lock input-icon" /></span>
                <el-input
                  type="password"
                  v-model="registerFormData.pass"
                  placeholder="请输入密码"
                  autocomplete="off"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <span slot="label"><i class="el-icon-lock input-icon" /></span>
                <el-input
                  type="password"
                  placeholder="请再次输入密码"
                  v-model="registerFormData.checkPass"
                  autocomplete="off"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item prop="code">
                <span slot="label"><i class="el-icon-check input-icon" /></span>
                <el-container>
                  <el-input
                    v-model="registerFormData.code"
                    placeholder="请输入验证码"
                    clearable
                  ></el-input>
                  <el-image
                    style="width: 200px; height: 41px; margin-left: 10px"
                    :src="getCodeData.img"
                    fit="fit"
                  >
                  </el-image>
                </el-container>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button
                  class="register_submit"
                  type="primary"
                  @click="register('ruleFormRef')"
                  :loading="showRegistration"
                >
                  注册
                </el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import API from "@/config/api";
import loginPage from "@/components/mobile/Login";

export default {
  name: "Register",
  components: {
    "login-page": loginPage,
  },
  data() {
    var checkName = (rule, value, callback) => {
      console.info("手机号->" + value);
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        const regE = /^1[3578]\d{9}$/;
        const regES = new RegExp(regE);
        if (!regES.test(value)) {
          callback(new Error("手机号格式错误"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码, 6-18个数字或字母"));
      } else {
        const regE = /^[a-zA-Z0-9]{6,18}$/;
        const regES = new RegExp(regE);
        if (!regES.test(value)) {
          callback(new Error("密码格式错误"));
        }
        if (this.registerFormData.checkPass !== "") {
          this.$refs.ruleFormRef.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码, 6-18个数字或字母"));
      } else if (value !== this.registerFormData.pass) {
        callback(new Error("两次输入密码不一致!"));
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
    return {
      activeName: "login",
      registerFormData: { name: "", pass: "", checkPass: "", code: "" },
      registerRules: {
        name: [{ validator: checkName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
      getCodeData: { uuid: "", img: "" },
      showRegistration: false,
    };
  },
  methods: {
    // 开始注册
    async register(ruleFormRef) {
      this.showRegistration = true;
      console.info("开始注册...");
      await this.$refs[ruleFormRef].validate((valid) => {
        if (valid) {
          this.checkCode();
        } else {
          // 表单校验失败
          return false;
        }
      });
      this.showRegistration = false;
    },
    // 校验验证码
    async checkCode() {
      await this.$http
        .post(API.VALIDATED_CODE_URL, {
          uuid: this.getCodeData.uuid,
          code: this.registerFormData.code,
        })
        .then((res) => {
          if (res.status === 200) {
            console.info("校验通过！！！！");
            // 校验通过后调用注册
            this.doRegister(this.registerFormData);
          }
        })
        .catch((err) => {
          console.error(
            "调用校验接口异常->" + JSON.stringify(err.response.data)
          );
          this.$message.error(err.response.data.message);
          this.getCode();
        });
    },
    // 执行注册
    async doRegister(registerFormData) {
      const jse = new this.$jsEncrypt();
      // 配置公钥
      jse.setPublicKey(API.RSA_PUBILC_KEY);
      // 加密密码
      let encryptPassWord = jse.encrypt(registerFormData.pass);
      await this.$http
        .post(API.REGISTER_URL, {
          userName: registerFormData.name,
          passWord: encryptPassWord,
          code: registerFormData.code,
          timestamp: Date.now(),
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              message: "注册成功，正在跳转登录页面...",
              type: "success",
            });
            setTimeout(() => {
              this.registerFormData = {};
              this.activeName = "login";
            }, 2000);
          }
        })
        .catch((err) => {
          console.error(
            "调用注册接口返回错误->" + JSON.stringify(err.response.data)
          );
          this.$message.error(err.response.data.message);
          this.getCode();
        });
    },
    // 获取验证码
    async getCode() {
      this.getCodeData = {};
      var result;
      await this.$http
        .get(API.GET_CODE_URL)
        .then((res) => {
          if (res.status === 200) {
            result = res;
          }
        })
        .catch((err) => {
          console.error("调用获取验证码接口返回错误->" + JSON.stringify(err));
          this.$message.error(err.response.data.message);
          return;
        });
      this.getCodeData = result.data.body;
    },
  },
  computed: {},
  mounted() {
    this.getCode();
  },
};
</script>
<style scoped>
.register {
  background-image: url(/static/mobile/background.png);
  background-repeat: no-repeat;
  background-size: 370%;
  height: 100%;
}
.box {
  opacity: 0.45;
  background-color: rgb(94, 94, 93);
  height: 100%;
  overflow: auto;
}
.register_box {
  /* display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; */
}
.title {
  margin-top: 18%;
  margin-bottom: 5%;
  font-weight: 1000;
  font-size: 50px;
  color: rgb(102, 199, 41);
  letter-spacing: 2px;
  text-align: center;
  width: 100%;
}
.register_input {
  width: 100%;
}
.input-icon {
  font-size: 30px;
  padding-top: 5px;
}
.register_submit {
  padding: 15px 70px;
  width: 100%;
}
</style>

<style>
.el-tabs__item {
  height: 50px;
  line-height: 50px;
}
.el-tabs--border-card > .el-tabs__header {
  background-color: rgb(81, 80, 80);
  border-bottom: 1px solid rgb(81, 80, 80);
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: rgb(195, 188, 188);
  border-right-color: #042981;
  border-left-color: #98a43f;
}
/* 输入框 */
.register_input[data-v-51d033b0] {
  width: 100%;
  padding-left: 5%;
  padding-right: 12%;
}
.el-form-item__label {
  color: aliceblue;
}
</style>