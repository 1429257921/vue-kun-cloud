<template>
  <div class="personal_center">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-container>
        <div>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-input
              placeholder="几月几号,示例1105"
              v-model.number="userInfo.birthday"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 头像展示 -->
        <el-upload
          class="avatar-uploader"
          :http-request="uploadAvatar"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-container>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      serverUrl: "http://localhost:9200/kun-blog",
      getUserDetailsUrl: "/api/user/getUserDetails",
      getConfigUrl: "/api/config/get",
      uploadFileeUrl: "/api/file/upload",
      imageUrl: "",
      loginToken: "",
      loginUserInfo: {},
      userInfo: {
        uid: "",
        username: "",
        birthday: "",
        sex: "",
        mark: "",
        nickname: "",
        avatar: "",
        phone: "",
        createTime: "",
        updateTime: "",
        lastIp: "",
        addres: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 头像上传
    async uploadAvatar(param) {
      let fd = new FormData();
      fd.append("file", param.file);
      // fd.append('name',  dataForm.name);
      var result = await this.$http({
        methods: "get",
        url: this.serverUrl + this.uploadFileeUrl,
        headers: {
          ContentType: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: this.loginToken,
        },
        params: fd,
      }).catch((err) => {
        console.error(
          "调用文件上传接口返回错误->" + JSON.stringify(err.response.data)
        );
        this.$message.error(err.response.data.message);
        return;
      });
      console.info("文件上传->" + JSON.stringify(result.data.body));
    },
    // 检查当前是否已经登录
    async initData() {
      var token = this.$cookies.get("login_token");
      // 未登录
      if (token !== undefined && token !== "" && token !== null) {
        var userInfo = this.$cookies.get("user_info");
        if (userInfo !== undefined && userInfo !== "" && userInfo !== null) {
          this.loginToken = token;
          this.loginUserInfo = userInfo;
          console.info(token);
          console.info(userInfo);
          console.info("==========================");
          await this.getConfig();
          await this.getUserDetails();
        }
      }
    },
    // 获取用户详情信息
    async getUserDetails() {
      var result = await this.$http({
        url: this.serverUrl + this.getUserDetailsUrl,
        headers: {
          Authorization: this.loginToken,
        },
      }).catch((err) => {
        console.error(
          "调用获取用户详情接口返回错误->" + JSON.stringify(err.response.data)
        );
        this.$message.error(err.response.data.message);
        return;
      });
      console.info("获取用户详情信息->" + JSON.stringify(result.data.body));
    },
    // 获取配置
    async getConfig() {
      var result = await this.$http({
        url: this.serverUrl + this.getConfigUrl,
        headers: {
          Authorization: this.loginToken,
        },
      }).catch((err) => {
        console.error(
          "调用获取配置接口返回错误->" + JSON.stringify(err.response.data)
        );
        this.$message.error(err.response.data.message);
        return;
      });
      this.getConfigVO = result.data.body;
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar:hover {
  border-color: #409eff;
}
</style>