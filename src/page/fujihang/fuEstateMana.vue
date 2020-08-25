<!--
 * @Author: fujihang
 * @Date: 2020-07-24 16:23:36
 * @LastEditors: your name
 * @LastEditTime: 2020-08-20 14:59:00
 * @Description: 物业管理
--> 

<template>
  <div id="fuEstateMana">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">姓名</span>
          <el-input v-model="people" clearable></el-input>
        </span>

        <span class="child">
          <span class="name">所属部门</span>
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          物业管理
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small" @click="showDoor=false">新增</el-button>
          <el-button type="primary" size="small" class="hui">修改</el-button>
          <el-button type="primary" size="small" class="hui">删除</el-button>
        </span>
      </span>
      <!--  -->

      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="头像" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="shouye" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="depart" label="所属部门" align="center"></el-table-column>
          <el-table-column prop="join" label="职务" align="center"></el-table-column>
          <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="time" label="入职时间" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" min-width="100px">
            <template slot-scope="scope">
              <el-button size="mini" @click="showDoor=false">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          layout="prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>

    <!--  -->
    <div class="bgContant bgContant2" v-show="!showDoor">
      <div class="nationS">新增人员</div>
      <div class="conList">
        <span class="child" v-for="(item,index) in infoPark" :key="index">
          <span class="name">{{item.name}}</span>
          <el-input v-model="item.val" v-if="index<3||index==4"></el-input>
          <el-select v-model="item.val" placeholder="请选择" v-if="index==3||index==5||index==7">
            <el-option
              v-for="item in (index==3?departList:index==5?joinList:index==7?statusList:'')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker v-model="item.val" type="date" placeholder="选择日期" value-format="yyyy-mm-dd"  v-if="index==6"></el-date-picker>
        </span>
        <span class="child">
          <span class="name">头像</span>
          <!-- <span class="imgList">
            <span class="img">
              <img src />
              <input type="file" />
            </span>
          </span>-->
          <el-upload
            class="avatar-uploader"
            action="/ImgAlbum/UpdateImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>
      </div>
      <div class="nationS">创建账户</div>
      <div class="postList" v-for="(item,index) in postList" :key="index">
        <span class="name">{{item.name}}</span>
        <span class="input">
          <el-input v-model="item.val" />
        </span>
      </div>
      <div class="btn">
        <el-button type="primary" size="small" class="hui" @click="showDoor=true">关闭</el-button>
        <el-button type="primary" size="small" @click="addPeople">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      showDoor: true,
      people: "",
      multipleSelection: [],
      currentPage4: 1,
      statusList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      status: "",
      tableData: [
        {
          img: require("../../../static/20140816114432535.png"),
          name: "刘源",
          depart: "客服部",
          join: "客服经理",
          phone: "13553570213",
          email: "33322233@qq.com",
          time: "2020-5-5",
          status: "在岗",
        },
        {
          img: require("../../../static/20140816114432535.png"),
          name: "刘源",
          depart: "客服部",
          join: "客服经理",
          phone: "13553570213",
          email: "33322233@qq.com",
          time: "2020-5-5",
          status: "在岗",
        },
      ],
      parkAlert: false, //
      departList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      joinList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      statusList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],

      infoPark: [
        {
          name: "姓名",
          val: "",
          data: "",
        },
        {
          name: "证件号",
          val: "",
          data: "",
        },
        {
          name: "联系电话",
          val: "",
          data: "",
        },
        {
          name: "所属部门",
          val: "",
          data: "",
        },
        {
          name: "邮箱",
          val: "",
          data: "",
        },
        {
          name: "职务",
          val: "",
          data: "",
        },
        {
          name: "入职时间",
          val: "",
          data: "",
        },
        {
          name: "状态",
          val: "",
          data: "",
        },
      ],
      postList: [
        {
          name: "账号",
          val: "",
        },
        {
          name: "密码",
          val: "",
        },
        {
          name: "确认密码",
          val: "",
        },
      ],
    };
  },
  methods: {
    //
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1M!");
      }
      return isLt2M;
    },
    //
    handleEdit(a, b) {
      console.log(a, b);
    },
    handleDelete(a, b) {
      console.log(a, b);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //
    addPeople() {
      if(!this.postList[0].val||!this.postList[1].val) return this.eFN('请填写账号和密码！')
      if(this.postList[1].val!=this.postList[2].val) return this.eFN('两次密码不一致！')
      this.postFN({
        url: "/systemmanager/user",
        data: {
          category:2,
          communityId:1,
          headPortraitUri:this.imageUrl,
          email:this.infoPark[4].val,
          nickName:this.infoPark[0].val,
          phone:this.infoPark[2].val,
          employeeVo:{
            departmentId:this.infoPark[3].val,
            inductionDate:this.infoPark[6].val,
            state:this.infoPark[7].val,
          },
          username:this.postList[0].val,
          password:this.postList[1].val,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.oFN('新增成功！')
          this.showDoor=false
        } else this.eFN(r.data.message);
        console.log(r);
      });
    },
  },
};
</script>

<style lang="less">
#fuEstateMana {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  //
  .bgContant {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    margin: 19px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  //
  .chooseList {
    display: flex;
    align-items: center;
    padding: 22px 40px;
    .child {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .name {
        font-weight: bold;
        margin-right: 15px;
        font-size: 18px;
        width: 100px;
      }
      .el-input__inner {
        font-size: 16px;
      }
    }
    .flex {
      flex: 1;
      text-align: right;
    }
  }
  //
  .funtion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 40px 16px;
    .name {
      font-size: 20px;
      > img {
        height: 18px;
      }
    }
    .hui {
      background: rgba(192, 206, 223, 1);
      border-color: rgba(192, 206, 223, 1);
    }
    .mini {
      font-size: 14px;
      margin-left: 10px;
      .blue {
        color: #56a1f8;
      }
    }
    .el-button {
      width: 100px;
      font-size: 18px;
    }
  }
  //
  .tableWork {
    flex: 1;
    display: flex;
    flex-direction: column;
    thead tr th {
      background: rgba(246, 246, 246, 1);
    }
    .el-table {
      height: 100%;
    }
    .el-pagination {
      padding: 20px 0;
      text-align: center;
    }
    .cell > img {
      height: 40px;
      width: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  //
  .bgContant2 {
    .nationS {
      padding: 30px 70px 20px;
      font-size: 18px;
    }
    .conList {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .child {
        display: flex;
        align-items: center;
        width: calc(25% - 40px);
        margin: 0 20px 30px;
        .name {
          width: 80px;
          text-align: right;
          margin-right: 20px;
        }
        .el-input {
          width: 200px;
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
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
        .imgList {
          .img {
            overflow: hidden;
            position: relative;
            > img {
              height: 60px;
              width: 60px;
              object-fit: cover;
              border-radius: 50%;
            }
            > input {
              opacity: 0;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
      }
    }
    .postList {
      display: flex;
      align-items: center;
      margin: 0 auto 20px;
      .name {
        width: 80px;
        text-align: right;
        margin-right: 20px;
      }
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      .el-button {
        width: 110px;
        margin: 0 10px;
      }
      .hui {
        background: rgba(192, 206, 223, 1);
        border-color: rgba(192, 206, 223, 1);
      }
    }
  }
}
</style>