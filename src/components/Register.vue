<template>
  <div class="register">
    <div class="register_box">
      <p class="title">用户注册</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="账号名" prop="userName">
          <el-input
            v-model="ruleForm.userName"
            placeholder="账号唯一识别，可用来登录"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="passWord">
          <el-input
            type="password"
            v-model="ruleForm.passWord"
            placeholder="建议使用两种或两种以上字符组合"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassWord">
          <el-input
            type="password"
            v-model="ruleForm.checkPassWord"
            placeholder="请再次输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code" label-width="100px">
          <el-container>
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入验证码"
            ></el-input>

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
            @click="register('ruleForm')"
            :loading="showRegistration"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    // 校验用户名
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        // 密码至少包含1个大写字母，1个小写字母，1个数字,下划线，横线
        // const regE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9-\\_]{6,18}$/;
        const regE = /^[a-zA-Z0-9]{6,20}$/;
        const regES = new RegExp(regE);
        if (!regES.test(value)) {
          callback(new Error("账号名格式错误"));
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
    // 校验密码
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPassWord !== "") {
          this.$refs.ruleForm.validateField("checkPassWord");
        }
        // 密码至少包含1个大写字母，1个小写字母，1个数字,下划线，横线
        // const regE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9-\\_]{6,18}$/;
        const regE = /^[a-zA-Z0-9]{6,18}$/;
        const regES = new RegExp(regE);
        if (!regES.test(value)) {
          callback(new Error("账号名格式错误"));
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
      serverUrl: "http://192.168.3.10:9200/kun-blog",
      getCodeUrl: "/api/auth/getCode",
      registerUrl: "/api/auth/register",
      validatedCodeUrl: "/api/auth/validatedCode",
      publicKey:
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrM+z/DwD4zf0Czl8/fg7B+mfZ89+LIzNoFBkLVYzSF+NMtIovovlZd33Lgjpi73EqQM7a5SQhTbzfVF/VQyvVwjoEv3zVfW1s5KqV8NI+1fQtZ8Ef/vFDOKEz5CYxzJggvXIQFvpbJPvupWWxV84O5oeneTQzI3aqlOIknoHDzQIDAQAB",
      showRegistration: false,
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
    // 注册方法
    async register(ruleForm) {
      this.showLogging = true;
      await this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$http
            .post(this.serverUrl + this.validatedCodeUrl, {
              'uuid': this.getCodeData.uuid,
              'code': this.ruleForm.code
            })
            .then((res) => {
              if (res.status === 200) {
                console.info("校验通过！！！！");
                this.doRegister(this.ruleForm);
              }
            })
            .catch((err) => {
              console.error(
                "调用校验接口异常->" + JSON.stringify(err.response.data)
              );
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

    // 调用注册接口
    async doRegister(ruleForm) {
      const jse = new this.$jsEncrypt();
      // 配置公钥
      jse.setPublicKey(this.publicKey);
      // 加密密码
      let encryptPassWord = jse.encrypt(ruleForm.passWord);
      await this.$http
        .post(this.serverUrl + this.registerUrl, {
          'userName': ruleForm.userName,
          'passWord': encryptPassWord,
          'code': ruleForm.code,
          'timestamp': Date.now(),
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              message: "注册成功成功，正在跳转登录页面...",
              type: "success",
            });
            setTimeout(() => {
              this.$router.push("/login");
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
        .get(this.serverUrl + this.getCodeUrl)
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
  mounted() {
    this.getCode();
  },
};
</script>
<style scoped>
.register {
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

.register_box {
  position: fixed;
  top: 14%;
  left: 31%;
  width: 30%;
  padding: 15px 80px 0px 10px;
  /* text-align: center; */
  background-color: rgb(202, 200, 200);
  border-radius: 20px;
  opacity: 0.77;
}
</style>