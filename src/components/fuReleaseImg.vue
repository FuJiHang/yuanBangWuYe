<template>
  <div class="fuReleaseImg">
    <span class="name">{{name}}</span>
    <span class="contant">
      <div class="avatar" v-for="(item,index) in imageUrl " :key="index">
        <img :src="item" />
        <i class="el-icon-delete" @click="delectFN(index)" v-if="noId!=-1"></i>
      </div>

      <el-upload
        v-if="noId!=-1"
        class="avatar-uploader"
        action="/fileservice/image"
        :headers="{'Authorization':headers}"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :multiple="true"
      >
        <i v-if="imageUrl.length<=9" class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span class="num">{{imageUrl.length}}/9</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["name","noId","imageUrl","imgPost"],
  data() {
    return {
      headers: localStorage.getItem("token"),
      // imageUrl: [],
      // imgPost: [],
    };
  },
  mounted(){

  },
  methods: {
    // 删除图片
    delectFN(index) {
      this.imageUrl.splice(index, 1);
      this.deleteFN({
        url: "/fileservice/image",
        data: this.imgPost.splice(index, 1),
      }).then((r) => {
        if (r.data.status == "OK") {
        } else this.eFN(r.data.message);
      });
      this.$emit("getImg", this.imgPost);
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.status != "OK") return this.eFN(r.message);
      this.imageUrl.push(URL.createObjectURL(file.raw));
      this.imgPost.push(res.data);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1M!");
      }
      return isLt2M;
    },
  },
};
</script>

<style lang="less">
.fuReleaseImg {
  padding: 20px 50px 0;
  display: flex;
  align-items: center;
  .name {
    font-weight: bold;
    margin-right: 20px;
  }
  .avatar {
    position: relative;
    img {
      margin-right: 20px;
      width: 100px;
      height: 100px;
      display: block;
    }
    .el-icon-delete {
      position: absolute;
      top: 5px;
      right: 25px;
      color: red;
    }
  }

  .contant {
    flex: 1;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    .el-upload {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    .add {
      border-radius: 2px;
      box-sizing: border-box;
      height: 100px;
      width: 100px;
      line-height: 90px;
      text-align: center;
      font-size: 80px;
      border: 1px solid rgb(206, 206, 206);
    }
    .num {
      margin-left: 10px;
      color: #66b44a;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
</style>