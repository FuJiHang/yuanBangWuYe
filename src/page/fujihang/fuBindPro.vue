<!--
 * @Author: fujihang
 * @Date: 2020-07-22 17:31:33
 * @LastEditors: your name
 * @LastEditTime: 2020-08-21 10:39:32
 * @Description: 用户绑定房产
--> 

<template>
  <div id="fuBindPro">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        用户绑定房产
        <span class="flex">
          <img src="/static/zhongzhiG.png" @click="exam ? getHis() : getPropri()" />
          <span @click=" exam ? getHis() : getPropri()">刷新</span>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          <span class="childS">
            <span
              @click="chooseFN(index)"
              :class="['i',exam==index?'exam':'']"
              v-for="(item,index) in examList"
              :key="index"
            >{{item}}</span>
          </span>
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
            @change="exam ? getHis() : getPropri()"
            value-format="yyyy-MM-dd"
            :clearable="false"
          ></el-date-picker>
        </span>
        <span class="val">
          <el-button type="primary" size="small">删除</el-button>
        </span>
      </span>
      <!--  -->

      <div class="tableWork">
        <el-table
          :data="exam?hisData:tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          highlight-current-row
          @current-change="selectFN"
        >
          <el-table-column prop="proprietorName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="storiedBuilding" label="小区" align="center"></el-table-column>
          <el-table-column prop="houseNumber" label="户号" align="center"></el-table-column>
          <el-table-column prop="idcard" label="证件号" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话" align="center"></el-table-column>
          <el-table-column prop="createTime" label="提交时间" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center">
            <template slot-scope="scope">
              <span
                :class="[scope.row.state=='待审核'?'blue':scope.row.state=='绑定成功'?'green':'red']"
              >{{scope.row.state}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <el-pagination
          v-if="exam"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!--  -->
    <div class="bgContant2" v-show="!showDoor">
      <div class="noticeT">
        <span class="name">合同详情</span>
        <el-button size="small" type="primary" @click="showDoor=true">返回</el-button>
      </div>
      <!--  -->
      <div class="info">
        <div class="child" v-for="(item,index) in info" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="val">{{item.val}}</span>
          <span class="btn">
            <el-button size="small" type="primary" v-if="index==2" @click="seeFN">查看</el-button>
          </span>
        </div>
      </div>
      <!--  -->
      <div class="btnList" v-if="!exam">
        <el-button class="hui" size="small" @click="shenHeFN('绑定失败')">审核不通过</el-button>
        <el-button type="primary" size="small" @click="shenHeFN('绑定成功')">审核通过</el-button>
      </div>
    </div>

    <!--  -->
    <el-dialog title="房屋详情" :visible.sync="parkAlert">
      <div class="detailFW">
        <span class="child" v-for="(item,index) in areaList" :key="index">
          <span class="name">{{item.name}}</span>
          <el-input disabled :placeholder="item.val+item.d"></el-input>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parkAlert: false,
      shenHe: {},
      exam: 0,
      examList: ["待审核", "历史审核"],
      time: new Date(),
      showDoor: true,
      value: "",
      currentPage4: 1,
      tableData: [],
      hisData: [],
      info: [
        {
          name: "业主姓名:",
          val: "",
          data: "proprietorName",
        },
        {
          name: "绑定小区:",
          val: "",
          data: "",
        },
        {
          name: "房号:",
          val: "",
          data: "storiedBuilding",
          data2: "houseNumber",
        },
        {
          name: "电话号码:",
          val: "",
          data: "phone",
        },
        {
          name: "业主证件号:",
          val: "",
          data: "idcard",
        },
        {
          name: "提交时间:",
          val: "",
          data: "createTime",
        },
      ],
      total: 0,
      multipleSelection: [], //
      areaList: [
        {
          name: "楼栋",
          val: "",
          data: "storiedBuilding",
          d: "",
        },
        {
          name: "房号",
          val: "",
          data: "number",
          d: "",
        },
        {
          name: "面积",
          val: "",
          data: "area",
          d: "平方米",
        },
        {
          name: "房屋状态",
          val: "",
          data: "tradeState",
          d: "",
        },
        {
          name: "业主姓名",
          val: "",
          data: "proprietorName",
          d: "",
        },
        {
          name: "绑定状态",
          val: "",
          data: "bind",
          d: "",
        },
      ],
    };
  },

  methods: {
    //
    seeFN() {
      this.getFN({
        url: "/assetsservice/housemessage/" + this.shenHe.id,
        data: {},
      }).then((r) => {
        if (r.data.status == "OK") {
          r.data.data.tradeState = r.data.data.tradeState ? "已出售" : "未出售";
          r.data.data.bind = r.data.data.bind ? "已绑定" : "未绑定";
          this.areaList.forEach((c) => {
            c.val = r.data.data[c.data];
          });
          this.parkAlert=true
        } else this.eFN(r.data.message);
      });
    },

    //
    shenHeFN(data) {
      this.shenHe.state = data;
      this.putFN({
        url: "/assetsservice/bindproprietor",
        data: this.shenHe,
      }).then((r) => {
        if (r.data.status == "OK") {
          this.oFN("操作成功！");
          this.showDoor = true;
          this.exam ? this.getHis() : this.getPropri();
        } else this.eFN(r.data.message);
      });
    },
    //
    selectFN(val) {
      this.info.forEach((r) => {
        r.val = val[r.data] + (val[r.data2] ? val[r.data2] : "");
      });
      this.shenHe = val;
      this.showDoor = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getHis();
    },
    chooseFN(i) {
      this.exam = i;
      this.exam ? this.getHis() : this.getPropri();
    },
    getPropri() {
      this.getFN({
        url: "/assetsservice/bindproprietor/untreated",
        data: {
          date: this.time,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.tableData = r.data.data.records;
        } else this.eFN(r.data.message);
      });
    },
    getHis() {
      this.getFN({
        url: "/assetsservice/bindproprietor/history",
        data: {
          date: this.time,
          pageSize: 10,
          currentPage: this.currentPage4,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.hisData = r.data.data.records;
          this.total = r.data.data.total;
        } else this.eFN(r.data.message);
      });
    },
  },
  mounted() {
    this.getPropri();
    this.getHis();
  },
};
</script>

<style lang="less">
#fuBindPro {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
    font-size: 20px;

    .flex {
      flex: 1;
      // text-align: right;
      color: #a7a7a7;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        margin-right: 10px;
      }
    }
  }
  //
  .funtion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 40px 16px;
    .name {
      font-size: 14px;
      display: flex;
      align-items: center;
      .childS {
        display: flex;
        align-items: center;

        margin-right: 20px;

        .i {
          border: 1px solid rgb(218, 218, 218);
          width: 100px;
          padding: 9px 0;
          text-align: center;
          border-radius: 2px;
        }
        .exam {
          color: #1989fa;
          background: rgba(230, 241, 252, 1);
          border-color: rgba(163, 208, 253, 1);
        }
      }
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
  }

  //
  .bgContant2 {
    //
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    margin: 19px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .noticeT {
      display: flex;
      align-items: center;
      margin: 28px 29px;
      //   border-left: 6px solid #4799f7;
      padding-left: 20px;
      .name {
        font-size: 22px;
        font-weight: bold;
        flex: 1;
      }
      .el-button {
        border-radius: 6px;
        border: 1px solid rgba(71, 153, 247, 1);
        color: #fff;
        font-size: 18px;
        width: 100px;
      }
    }
    //
    .info {
      .child {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        font-size: 16px;
        .name {
          width: 100px;
          text-align: right;
          color: #333333;
        }
        .val {
          margin: 0 20px;
          padding: 5px 15px;
          border-radius: 2px;
          background: rgba(242, 242, 242, 1);
          color: #909399;
          width: 250px;
        }
        .btn {
          width: 80px;
        }
        .el-button {
          width: 80px;
        }
      }
    }
  }
  //
  .el-dialog {
    .el-dialog__header {
      padding: 20px 0;
      text-align: center;
      margin: 0 20px;
      border-bottom: 1px dashed rgb(219, 219, 219);
    }
  }

  //
  .btnList {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    .el-button {
      width: 150px;
      font-size: 16px;
      color: #fff;
      margin: 0 30px;
    }
    .hui {
      background: #e6a23c;
    }
  }

  //
  .detailFW {
    display: flex;
    flex-wrap: wrap;
    .child {
      width: 50%;
      padding: 20px;
      display: flex;
      align-items: center;
      .name {
        width: 80px;
      }
      .el-input {
        flex: 1;
      }
    }
  }
}
</style>