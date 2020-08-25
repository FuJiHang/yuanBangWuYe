<!--
 * @Author: fujihang
 * @Date: 2020-07-22 17:13:59
 * @LastEditors: your name
 * @LastEditTime: 2020-08-19 15:47:52
 * @Description: 车位转卖
--> 

<template>
  <div id="fuPiontDet">
    <div class="bgContant">
      <div class="chooseList">
        <span class="child">
          <span class="name">兑换人</span>
          <el-input v-model="name" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">兑换物品</span>
          <el-input v-model="goods" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">状态</span>
          <el-select v-model="status" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
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

          <el-table-column prop="title" label="兑换人" align="center"></el-table-column>
          <el-table-column prop="add" label="兑换物品" align="center"></el-table-column>
          <el-table-column prop="price" label="兑换积分" align="center"></el-table-column>
          <el-table-column prop="time" label="兑换时间" align="center"></el-table-column>
          <el-table-column prop="time" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delFN(scope.$index, scope.row)">状态修改</el-button>
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
        <span class="val" v-if="!index">
          <el-tag v-for="tag in item.val" :key="tag.name" closable :type="tag.type">{{tag.name}}</el-tag>
        </span>
        <el-select v-model="item.val" v-else placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button type="primary">确定更改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parkAlert: true,
      name: "",
      goods: "",
      multipleSelection: [],
      currentPage4: 1,
      status: 0,
      options: [
        {
          value: "0",
          label: "闲置",
        },
        {
          value: 1,
          label: "已售",
        },
        {
          value: 2,
          label: "已租",
        },
        {
          value: 3,
          label: "待租户确认",
        },
      ],
      tableData: [
        {
          title: "王鸿",
          add: "心相印卷纸12筒装",
          price: "兑换物品",
          time: "2020-06-12 14:30",
          status: "未领取",
        },
        {
          title: "王鸿",
          add: "心相印卷纸12筒装",
          price: "兑换物品",
          time: "2020-06-12 14:30",
          status: "未领取",
        },
      ],
      addList: [
        {
          name: "兑换人",
          val: [
            { name: "标签一", type: "" },
            { name: "标签二", type: "success" },
            { name: "标签三", type: "info" },
            { name: "标签四", type: "warning" },
            { name: "标签五", type: "danger" },
          ],
          data: "",
        },
        {
          name: "领取情况",
          val: "",
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
#fuPiontDet {
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
      .el-input {
        flex: 1;
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
      .val {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgb(230, 230, 230);
      }
    }
    .btn {
      text-align: center;
      .el-button {
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