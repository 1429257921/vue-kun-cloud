<template>
  <div class="login">
    <el-header class="title">GoChat</el-header>

    <el-main class="login_input">
      <el-form
        :model="loginFormData"
        :rules="loginRules"
        ref="ruleFormRef"
        label-width="50px"
      >
        <el-form-item prop="name">
          <span slot="label"><i class="el-icon-phone input-icon" /></span>
          <el-input
            v-model.number="loginFormData.name"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <span slot="label"><i class="el-icon-lock input-icon" /></span>
          <el-input
            type="password"
            v-model="loginFormData.pass"
            placeholder="请输入密码"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <span slot="label"><i class="el-icon-check input-icon" /></span>
          <el-container>
            <el-input
              v-model="loginFormData.code"
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
            class="login_submit"
            type="primary"
            @click="login('ruleFormRef')"
            :loading="showLogging"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script>
import API from "@/config/api";

export default {
  name: "Login",
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
      showLogging: false,
      loginFormData: { name: "", pass: "", code: "" },
      loginRules: {
        name: [{ validator: checkName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
      getCodeData: { uuid: "", img: "" },
    };
  },
  methods: {
    // 登录
    async login(ruleFormRef) {
      this.showLogging = true;
      await this.$refs[ruleFormRef].validate((valid) => {
        if (valid) {
          // 表单校验通过
          this.$http
            .post(API.VALIDATED_CODE_URL, {
              uuid: this.getCodeData.uuid,
              code: this.loginFormData.code,
            })
            .then((res) => {
              if (res.status === 200) {
                this.doLogin(this.loginFormData);
              }
            })
            .catch((err) => {
              console.error("错误码->" + err.response.status);
              this.$message.error(err.response.data.message);
              this.getCode();
            });
        } else {
          // 表单校验失败
          return false;
        }
      });
      this.showLogging = false;
    },

    // 调用登录接口
    async doLogin(loginFormData) {
      const jse = new this.$jsEncrypt();
      // 配置公钥
      jse.setPublicKey(API.RSA_PUBILC_KEY);
      // 加密密码
      let encryptPassWord = jse.encrypt(loginFormData.pass);
      await this.$http
        .post(API.LOGIN_URL, {
          userName: loginFormData.name,
          passWord: encryptPassWord,
          code: loginFormData.code,
          timestamp: Date.now(),
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            setTimeout(() => {
              var result = res.data.body;

              this.$cookies.set(
                "login_token",
                result.userToken,
                result.expireTime / 1000,
                null
              );

              this.$cookies.set(
                "user_info",
                result.user,
                result.expireTime / 1000,
                null
              );
              // 页面跳转
              this.$router.push("/mobile/chat");
            }, 1500);
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
      await this.$http
        .get(API.GET_CODE_URL)
        .then((res) => {
          result = res;
        })
        .catch((err) => {
          console.log("调用接口发生错误" + err.response.data);
          this.$message.error(err.response.data.message);
          return;
        });
      this.getCodeData = result.data.body;
    },
  },
  mounted() {
    this.getCode();
  },
};
</script>
<style scoped>
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
.input-icon {
  font-size: 30px;
  padding-top: 5px;
}
.login_submit {
  padding: 20px 70px;
  width: 100%;
  letter-spacing: 5px;
  font-size: 20px;
}
</style>
<style>
/* 输入框 */
</style>