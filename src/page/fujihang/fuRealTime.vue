<!--
 * @Author: fujihang
 * @Date: 2020-07-22 15:30:31
 * @LastEditors: your name
 * @LastEditTime: 2020-07-22 17:09:10
 * @Description: 实时资讯
--> 
<template>
  <div id="fuRealTime">
    <template v-if="false">
      <div class="chooseList">
        <span class="child">
          <span class="name">关键字</span>
          <el-input v-model="input" clearable></el-input>
        </span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          物业通知
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary" size="small" class="hui">批量删除</el-button>
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
          <el-table-column prop="detail" label="首图" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="shouye" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="status" label="发布状态" align="center"></el-table-column>
          <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delFN(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" type="primary" @click="changeFN(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="primary" @click="seeFN(scope.$index, scope.row)">查看</el-button>
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
    </template>
    <!--  -->
    <template v-else>
      <div class="inputList mt">
        <span class="name">资讯标题</span>
        <span class="flex">
          <el-input v-model="title" placeholder="请输入通知标题"></el-input>
        </span>
      </div>
      <div class="inputList">
        <span class="name">资讯内容</span>
        <textarea v-model="notice" placeholder="请输入通知内容"></textarea>
      </div>
      <div class="imgList">
        <span class="name">内容配图</span>
        <span class="contant">
          <span class="add">+</span>
          <span class="num">0/9</span>
        </span>
      </div>
      <div class="imgList">
        <span class="name">资讯封面</span>
        <span class="contant">
          <span class="add">+</span>
          <span class="num">0/9</span>
        </span>
      </div>
      <div class="btnList">
        <el-button class="hui" size="small">保存</el-button>
        <el-button type="primary" size="small">确认发布</el-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      notice: "",
      value1: "",
      input: "",
      multipleSelection: [],
      currentPage4: 1,
      tableData: [
        {
          img: require("../../../static/bg.jpg"),
          title: "元邦山清水秀小区停水通知",
          status: "已发布",
          time: "2020-06-12 14:30"
        },
        {
          img: require("../../../static/bg.jpg"),
          title: "元邦山清水秀小区停水通知",
          status: "已发布",
          time: "2020-06-12 14:30"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    delFN(a, b) {
      console.log(a, b);
    },
    changeFN(a, b) {
      console.log(a, b);
    },
    seeFN(a, b) {
      console.log(a, b);
    }
  }
};
</script>

<style lang="less">
#fuRealTime {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
  margin: 19px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
      height: 80px;
    }
  }
  //
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
    margin: 60px 0 20px;
  }
  .imgList {
    padding: 20px 50px 0;
    display: flex;
    align-items: center;
    .name {
      font-weight: bold;
      margin-right: 20px;
    }
    .contant {
      flex: 1;
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
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