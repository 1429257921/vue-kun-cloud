<template>
  <div class="login">
    <div class="login_box">
      <p class="title">用户登录</p>
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
            show-password
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

        <el-form-item style="margin-left: 130px">
          <el-button
            type="primary"
            @click="login('ruleForm')"
            :loading="showLogging"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
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

    return {
      serverUrl: "http://localhost:9200/kun-blog",
      getCodeUrl: "/api/auth/getCode",
      loginUrl: "/api/auth/login",
      validatedCodeUrl: "/api/auth/validatedCode",
      publicKey:
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrM+z/DwD4zf0Czl8/fg7B+mfZ89+LIzNoFBkLVYzSF+NMtIovovlZd33Lgjpi73EqQM7a5SQhTbzfVF/VQyvVwjoEv3zVfW1s5KqV8NI+1fQtZ8Ef/vFDOKEz5CYxzJggvXIQFvpbJPvupWWxV84O5oeneTQzI3aqlOIknoHDzQIDAQAB",
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
        code: "",
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        passWord: [{ validator: validatePassWord, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 登录方法
    async login(ruleForm) {
      this.showLogging = true;
      await this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 表单校验通过
          this.$http
            .post(this.serverUrl + this.validatedCodeUrl, {
              uuid: this.getCodeData.uuid,
              code: this.ruleForm.code,
            })
            .then((res) => {
              if (res.status === 200) {
                this.doLogin(this.ruleForm);
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
    async doLogin(ruleForm) {
      const jse = new this.$jsEncrypt();
      // 配置公钥
      jse.setPublicKey(this.publicKey);
      // 加密密码
      let encryptPassWord = jse.encrypt(ruleForm.passWord);
      await this.$http
        .post(this.serverUrl + this.loginUrl, {
          userName: ruleForm.userName,
          passWord: encryptPassWord,
          code: ruleForm.code,
          timestamp: Date.now(),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(JSON.stringify(res));
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

              this.$router.go(-1);
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
    },
  },
  // 页面渲染后调用
  mounted() {
    this.getCode();
  },
};
</script>

<style scoped>
.login {
  background-image: url(../../static/backgroud.png);
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
}

.title {
  margin: 0px 20px 20px 115px;
  font-size: 25px;
  font-family: Sans-serif;
  font-style: normal;
  letter-spacing: 5px;
  padding-left: 88px;
  color: rgb(24, 103, 221);
}

.login_box {
  position: fixed;
  top: 14%;
  left: 31%;
  width: 30%;
  padding: 15px 80px 0px 10px;
  background-color: rgb(202, 200, 200);
  border-radius: 20px;
  opacity: 0.77;
}
</style>