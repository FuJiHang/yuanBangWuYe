<!--
 * @Author: fujihang
 * @Date: 2020-07-22 13:57:48
 * @LastEditors: your name
 * @LastEditTime: 2020-08-22 14:45:44
 * @Description: 物业通知
--> 
<template>
  <div id="fuProperNotice">
    <div class="bgContant" v-show="showNotian">
      <div class="chooseList">
        <span class="child">
          <span class="name">关键字</span>
          <el-input v-model="keyWord" clearable></el-input>
        </span>
        <el-date-picker
          v-model="time"
          value-format="yyyy-MM-dd"
          @change="getData"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          物业通知
          <span class="mini">
            共
            <span class="blue">{{total}}</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" @click="getData" />
        </span>
        <span class="val">
          <el-button type="primary" size="small" @click="addDef">新增</el-button>
          <el-button type="primary" size="small" class="hui" @click="delAllFN">批量删除</el-button>
        </span>
      </span>
      <!--  -->

      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="content" label="概要" align="center"></el-table-column>
          <el-table-column prop="status" label="发布状态" align="center">
            <template slot-scope="scope">
              <span
                :class="[scope.row.publishState?'greed':'']"
              >{{scope.row.publishState?'已发布':'未发布'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="delFN(scope.row)"
                style="margin-right:10px;"
              >
                <el-button size="mini" slot="reference" type="danger">删除</el-button>
              </el-popconfirm>

              <el-button size="mini" type="primary" @click="changeFN(scope.row)">修改</el-button>
              <el-button size="mini" type="primary" @click="changeFN(scope.row,-1)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          layout="prev, pager, next, jumper"
          :total="total/10"
        ></el-pagination>
      </div>
    </div>
    <!--  -->
    <div class="bgContant" style="overflow:auto;" v-show="!showNotian">
      <div class="noticeT">
        <span class="name"></span>
        <el-button size="small" @click="showNotian=true">返回</el-button>
      </div>
      <div class="inputList mt">
        <span class="name">通知标题</span>
        <span class="flex">
          <el-input v-model="title" placeholder="请输入通知标题" :disabled="noId==-1"></el-input>
        </span>
      </div>
      <div class="inputList">
        <span class="name">通知内容</span>
        <textarea v-model="notice" placeholder="请输入通知内容" :disabled="noId==-1"></textarea>
      </div>
      <!--  -->
      <fuReleaseImg name="通知配图" :imgPost="imgPost" :noId="noId" :imageUrl="imageUrl" wx:if="!showNotian"></fuReleaseImg>

      <!--  -->
      <div class="btnList" v-if="noId!=-1">
        <el-button class="hui" size="small" @click="addFN(false)">保存</el-button>
        <el-button type="primary" size="small" @click="addFN(true)">确认发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import fuReleaseImg from '../../components/fuReleaseImg'
export default {
  components:{
    fuReleaseImg
  },
  data() {
    return {

      imageUrl: [],
      showNotian: true,
      time: "",
      total: 0,
      keyWord: "",
      multipleSelection: [],
      currentPage4: 1,
      tableData: [ ],
      title: "",
      notice: "",
      imgPost: [],
      noId: 0,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getImg(data){
      this.imgPost=data
      console.log(data);
    },
    
    //
    addDef() {
      this.title = ''
      this.notice =''
      this.imageUrl =[]
      this.imgPost =[]
      this.noId = 0
      this.showNotian = false;
    },
    //
    delAllFN() {
      let del = [];
      this.multipleSelection.forEach((s) => {
        del.push(s.id);
      });
      this.deleteFN({
        url: "/propertyservice/notify/batch",
        data: del,
      }).then((r) => {
        if (r.data.status == "OK") {
          this.oFN("批量删除成功！");
          this.currentPage4 = 1;
          this.getData();
        } else this.eFN(r.data.message);
      });
    },
    //
    getData() {
      this.getFN({
        url: "/propertyservice/notify/page",
        data: {
          currentPage: this.currentPage4,
          keyWord: this.keyWord || null,
          pageSize: 10,
          publishDate: this.time || null,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.tableData = r.data.data.records;
          r.data.data.total ? (this.total = r.data.data.total) : "";
        } else this.eFN(r.data.message);
      });
    },
    


    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getData();
    },
    delFN(b) {
      this.deleteFN({
        url: "/propertyservice/notify/" + b.id,
        data: {},
      }).then((r) => {
        if (r.data.status == "OK") {
          this.oFN("删除成功！");
          this.currentPage4 = 1;
          this.getData();
        } else this.eFN(r.data.message);
      });
    },
    changeFN(b, see) {
      this.title = b.title;
      this.notice = b.content;
      this.imageUrl = b.imagesUri.split(",");
      this.imgPost = b.imagesUri.split(",");
      this.noId = see || b.id;
      this.showNotian = false;
    },
    seeFN(b) {
      this.showNotian = false;
    },
    //
    addFN(isRe) {
      if (!this.title || !this.notice || !this.imgPost.length)
        return this.eFN("请填完要发布的内容！");
      if (this.noId) return this.changeOk(isRe);
      this.postFN({
        url: "/propertyservice/notify",
        data: {
          title: this.title,
          content: this.notice,
          imagesUri: this.imgPost.join(","),
          publishState: isRe,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.oFN(isRe ? "发布成功" : "保存成功！");
          this.currentPage4 = 1;
          this.getData();
          this.showNotian = true;
        } else this.eFN(r.data.message);
      });
    },
    //
    changeOk(isRe) {
      this.putFN({
        url: "/propertyservice/notify",
        data: {
          title: this.title,
          content: this.notice,
          imagesUri: this.imgPost.join(","),
          publishState: isRe,
          id: this.noId,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.oFN(isRe ? "发布成功" : "修改成功！");
          this.currentPage4 = 1;
          this.getData();
          this.showNotian = true;
        } else this.eFN(r.data.message);
      });
    },
  },
};
</script>

<style lang="less">
#fuProperNotice {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
  margin: 19px;
  height: 100%;
  overflow: hidden;

  .bgContant {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .noticeT {
      display: flex;
      align-items: center;
      margin: 28px 29px 0;
      // border-left: 6px solid #4799f7;
      padding-left: 20px;
      .name {
        flex: 1;
      }
      .el-button {
        border-radius: 6px;
        border: 1px solid rgba(71, 153, 247, 1);
        color: #4799f7;
        font-size: 14px;
        width: 80px;
      }
    }
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
        width: 80px;
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
      // border-color: rgba(192, 206, 223, 1);
      border: none;
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
    overflow: hidden;
    thead tr th {
      background: rgba(246, 246, 246, 1);
    }
    .greed {
      color: #2b9704;
    }
    .el-table {
    }
    .el-pagination {
      padding: 20px 0;
      text-align: center;
    }
  }
  //
  .inputList {
    display: flex;
    align-items: flex-start;
    padding: 0 50px;
    .name {
      font-weight: bold;
      margin-right: 20px;
    }
    .val {
      flex: 1;
    }
    textarea {
      border: 1px solid rgb(206, 206, 206);
      border-radius: 5px;
      padding: 20px;
      box-sizing: border-box;
      flex: 1;
      height: 200px;
    }
  }
  .mt {
    align-items: baseline;
    margin: 20px 0 20px;
  }
  
  .btnList {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    .el-button {
      width: 120px;
      font-size: 16px;
      color: #fff;
      margin: 0 30px;
    }
    .hui {
      background: rgba(174, 183, 193, 1);
    }
  }
}
</style>