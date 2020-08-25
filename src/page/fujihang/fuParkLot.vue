<!--
 * @Author: fujihang
 * @Date: 2020-07-24 10:10:46
 * @LastEditors: your name
 * @LastEditTime: 2020-08-18 15:11:29
 * @Description: 车位管理
--> 

<template>
  <div id="fuParkLot">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">车位状态</span>
          <el-select v-model="status" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="child">
          <span class="name">车位号</span>
          <el-input v-model="packId" clearable></el-input>
        </span>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search" @click="getData(true)">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          元邦·山清水秀地下车库
          <span class="mini">
            共
            <span class="blue">{{total}}</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" @click="getData" />
        </span>
        <!-- <span class="val">
          <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary" size="small" class="hui" @click="parkAlert=true">修改</el-button>
          <el-button type="primary" size="small" class="hui">删除</el-button>
        </span>-->
      </span>
      <!--  -->

      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="100%"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="location" label="楼栋" align="center"></el-table-column>
          <el-table-column prop="floor" label="楼层" align="center"></el-table-column>

          <el-table-column prop="number" label="车位号" align="center"></el-table-column>
          <el-table-column prop="category" label="车位类型" align="center"></el-table-column>
          <el-table-column label="车位状态" align="center">
            <template slot-scope="scope">
              <span
                :class="[scope.row.tradeState == 0
              ? 'red'
              : scope.row.tradeState == 1
              ? 'greed'
              : scope.row.tradeState == 2
              ? 'yellow':'']"
              >
                {{scope.row.tradeState == 0
                ? "闲置"
                : scope.row.tradeState == 1
                ? "已售"
                : scope.row.tradeState == 2
                ? "已租"
                : "待租户确认"}}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="tradeDate" label="售出时间" align="center"></el-table-column>
          <el-table-column prop="proprietorName" label="户主姓名" align="center" class-name="blue"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="parkAlertFN(scope.row,false)">修改</el-button>
              <el-button size="mini" @click="parkAlertFN(scope.row,true)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!--  -->
      <el-dialog title="车位信息" :visible.sync="parkAlert">
        <div class="list">
          <span class="child">
            <span class="name">楼栋</span>
            <el-input v-model="infoPark[0]" disabled></el-input>
          </span>
          <span class="child">
            <span class="name">楼层</span>
            <el-input v-model="infoPark[1]" disabled></el-input>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">车位号</span>
            <el-input v-model="infoPark[2]" disabled></el-input>
          </span>
          <span class="child">
            <span class="name">车位类型</span>
            <el-input v-model="infoPark[3]" disabled></el-input>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">车位状态</span>
            <el-select v-model="infoPark[4]" placeholder="请选择" :disabled="disable">
              <el-option
                v-for="item in ppList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
          <span class="child">
            <span class="name">售出时间</span>
            <el-date-picker
              v-model="infoPark[5]"
              :disabled="disable"
              type="date"
              :placeholder="disable?'暂无信息':'选择日期'"
            ></el-date-picker>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">业主姓名</span>
            <el-input v-model="infoPark[6]" :disabled="disable">
              <template slot="append" v-if="!disable">
                <span @click="choosePeople=true">选择业主</span>
              </template>
            </el-input>
          </span>
          <span class="child">
            <span class="name">身份证号</span>
            <el-input v-model="infoPark[7]" :disabled="disable"></el-input>
          </span>
        </div>
        <div class="btn" v-if="!disable">
          <el-button type="primary" size="small" @click="changeFN">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 选择业主 -->
      <el-dialog title="车位信息" :visible.sync="choosePeople">
        <div class="choosePeople">
          <div class="seach">
            业主姓名
            <el-input v-model="seachName" placeholder="请输入业主姓名"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getPeople">搜索</el-button>
          </div>
          <el-table
            :data="peopleData"
            tooltip-effect="dark"
            style="width: 100%"
            height="100%"
            highlight-current-row
            @current-change="choosePeopleFN"
          >
            <el-table-column prop="name" label="业主姓名" align="center" class-name="blue"></el-table-column>
            <el-table-column prop="idcard" label="身份证号" align="center" class-name="blue"></el-table-column>
          </el-table>
          <div class="btn">
            <el-button size="small" @click="okFN">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 1,
      showDoor: true,
      parkAlert: false,
      multipleSelection: [],
      currentPage4: 1,
      disable: false,
      choosePeople: false,
      seachName: "",
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
      ppList: [
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
      status: "",
      packId: "",
      tableData: [],
      peopleData: [],
      infoPark: [],
      lsPeople: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    choosePeopleFN(val) {
      this.lsPeople = [val.name, val.idcard, val.id];
    },

    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getData();
      // console.log(`当前页: ${val}`);
    },

    //获取数据
    getData(isSeach) {
      isSeach ? (this.currentPage4 = 1) : "";
      this.getFN({
        url: "/assetsservice/parkingmessage/page",
        data: {
          tradeState: this.status || null,
          currentPage: this.currentPage4,
          pageSize: 10,
          number: this.packId || null,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          r.data.data.records.forEach((s) => {
            s.category = s.category || "-";
            s.tradeDate = s.tradeDate || "-";
            s.proprietorName = s.proprietorName || "-";
            s.location = s.location || "-";
          });
          this.tableData = r.data.data.records;
          r.data.data.total ? (this.total = r.data.data.total) : "";
        } else this.eFN(r.data.message);
      });
    },
    // 弹窗
    parkAlertFN(data, type) {
      this.infoPark = [
        data.location == "-" ? "暂无信息" : data.location,
        data.floor + "层",
        data.number,
        data.category != "-" ? data.category : "暂无信息",
        data.tradeState ? data.tradeState : data.tradeState.toString(),
        data.tradeDate != "-" ? data.tradeDate : "",
        data.proprietorName != "-" ? data.proprietorName : "暂无信息",
      ];
      this.infoPark[8] = data.id;
      this.infoPark[9] = data.lastProprietorId;
      this.disable = type;
      if (!data.lastProprietorId)
        return (this.parkAlert = true), (this.infoPark[7] = "暂无信息");
      this.getFN({
        url: "/assetsservice/proprietor/message/" + data.lastProprietorId,
      }).then((r) => {
        if (r.data.status == "OK") {
          this.infoPark[7] = r.data.data.idcard;
          this.parkAlert = true;
        } else this.eFN(r.data.message);
      });
    },

    //
    getPeople() {
      this.getFN({
        url: "/assetsservice/proprietor/page",
        data: {
          currentPage: 1,
          pageSize: 100,
          proprietorName: this.seachName,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.peopleData = r.data.data.records;
        } else this.eFN(r.data.message);
      });
    },

    //
    okFN() {
      this.infoPark[6] = this.lsPeople[0];
      this.infoPark[7] = this.lsPeople[1];
      this.infoPark[9] = this.lsPeople[2];
      this.choosePeople = false;
      // new Date().getYears()
    },

    //
    changeFN() {
      if (
        !this.infoPark[5] ||
        this.infoPark[6] == "暂无信息" ||
        this.infoPark[7] == "暂无信息"
      )
        return this.eFN("请完善修改的信息！");
      let time = this.infoPark[5];
      this.putFN({
        url: "/assetsservice/parkingmessage",
        data: {
          tradeState: this.infoPark[4],
          proprietorName: this.infoPark[6],
          tradeDate:
            time.toString().indexOf("T") != -1
              ? time.getFullYear() +
                "-" +
                (time.getMonth() + 1) +
                "-" +
                time.getDate()
              : time,
          id: this.infoPark[8],
          lastProprietorId: this.infoPark[9],
        },
      }).then((s) => {
        if (s.data.status == "OK") {
          this.oFN("修改成功！");
          this.parkAlert = false;
          this.getData();
        } else this.eFN(r.data.message);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less">
#fuParkLot {
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
    overflow: hidden;
    thead tr th {
      background: rgba(246, 246, 246, 1);
    }
    .el-table {
      height: 100%;
      .red {
        color: #f56c6c;
      }
      .greed {
        color: #67c23a;
      }
      .yellow {
        color: #e6a23c;
      }
      .blue {
        color: #56a1f8;
      }
      // ? 'red'
      //       : scope.row.tradeState == 1
      //       ? 'greed'
      //       : scope.row.tradeState == 2
      //       ? 'yellow':'']"
    }
    .el-pagination {
      padding: 20px 0;
      text-align: center;
    }
  }

  //
  //
  .el-dialog {
    .list {
      display: flex;
      align-items: center;
      // justify-content: center;
      margin-bottom: 20px;
      .child {
        flex: 1;
        justify-content: center;
        display: flex;
        align-items: center;
        margin: 0 30px;
        .name {
          width: 80px;
        }
        .el-input {
          width: 200px;
        }
      }
    }
    .el-dialog__header {
      padding: 20px 0;
      text-align: center;
      margin: 0 20px;
      border-bottom: 1px dashed rgb(219, 219, 219);
    }
    .help {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .name {
        margin-right: 20px;
      }
      textarea {
        height: 150px;
        width: 500px;
        border: 1px solid rgb(209, 209, 209);
        padding: 20px;
        box-sizing: border-box;
        font-size: 14px;
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      .el-button {
        width: 110px;
      }
    }
  }
  //
  .choosePeople {
    overflow: hidden;
    height: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .seach {
      display: flex;
      align-items: center;

      .el-input {
        margin: 0 20px;
        width: 250px;
      }
    }
    .el-table {
      margin-top: 20px;
      flex: 1;
    }
    .btn {
      .el-button {
        background: #f8af43;
        color: #fff;
        border: none;
      }
    }
  }
  tr th {
    background: #f6f6f6;
  }
}
</style>