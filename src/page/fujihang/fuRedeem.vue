<!--
 * @Author: fujihang
 * @Date: 2020-07-22 17:13:59
 * @LastEditors: your name
 * @LastEditTime: 2020-08-19 15:12:02
 * @Description: 车位转卖
--> 

<template>
  <div id="fuRedeem">
    <div class="bgContant">
      <div class="chooseList">
        <span class="child">
          <span class="name">关键词</span>
          <el-input v-model="input" clearable></el-input>
        </span>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">积分兑换物品</span>
        <span class="val">
          <el-button type="primary" size="small" plain>新增</el-button>
          <el-button type="primary" size="small" plain>批量删除</el-button>
          <el-button type="primary" size="small" plain>历史发布</el-button>
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
          <el-table-column prop="title" label="物品名称" align="center"></el-table-column>
          <el-table-column prop="add" label="物品描述" align="center"></el-table-column>
          <el-table-column prop="price" label="兑换积分" align="center"></el-table-column>
          <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delFN(scope.$index, scope.row)">置顶</el-button>
              <el-button size="mini" type="primary" @click="seeFN(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog title="新增物品" :visible.sync="parkAlert" width="600px">
      <div class="list" v-for="(item,index) in addList" :key="index">
        <span class="name">{{item.name}}</span>
        <img :src="item.img" v-if="item.img" />
        <el-input :placeholder="'请输入'+item.name" v-model="item.val" v-else>
          <template slot="append" v-if="index==3">积分</template>
        </el-input>
      </div>
      <div class="btn">
        <el-button type="primary" >确定发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parkAlert: false,
      input: "",
      multipleSelection: [],
      currentPage4: 1,
      tableData: [
        {
          img: require("../../../static/bg.jpg"),
          title: "心相印卷纸12筒装",
          add: "正品保障 居家必备",
          price: "5000",
          time: "2020-06-12 14:30",
        },
        {
          img: require("../../../static/bg.jpg"),
          title: "心相印卷纸12筒装",
          add: "正品保障 居家必备",
          price: "5000",
          time: "2020-06-12 14:30",
        },
      ],
      addList: [
        {
          name: "物品图片",
          img: require("../../../static/20140816114432535.png"),
          val: "",
          plr: "",
          data: "",
        },
        {
          name: "物品名称",
          val: "心相印卷纸12筒装",
          data: "",
        },
        {
          name: "物品描述",
          val: "正品保障 居家必备",
          data: "",
        },
        {
          name: "兑换积分",
          val: "5000",
          data: "",
        },
      ],
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
  },
};
</script>

<style lang="less">
#fuRedeem {
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

    .mini {
      font-size: 14px;
      margin-left: 10px;
      .blue {
        color: #56a1f8;
      }
    }
    .el-button {
      width: 100px;
      font-size: 14px;
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
  .el-dialog {
    .list {
      display: flex;
      align-items: center;
      //   justify-content: center;
      margin-bottom: 20px;
      .name {
        width: 100px;
        text-align: right;
        margin-right: 20px;
      }
      > img {
        height: 80px;
      }
      .el-input {
        flex: 1;
        margin-right: 40px;
      }
    }
    .btn{
         text-align: center;
        .el-button{
           
        }
    }
    .el-dialog__header {
      padding: 20px 0;
      text-align: center;
      margin: 0 20px;
      border-bottom: 1px dashed rgb(219, 219, 219);
    }
  }
}
</style>