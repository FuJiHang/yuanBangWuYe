<!--
 * @Author: fujihang
 * @Date: 2020-07-22 18:49:00
 * @LastEditors: your name
 * @LastEditTime: 2020-08-24 17:47:06
 * @Description: 车位预约
--> 

<template>
  <div id="fuParkReser">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">预约日期</span>
          <el-date-picker v-model="chooseTime" type="date" placeholder="选择日期"></el-date-picker>
        </span>
        <span class="child">
          <span class="name">预约人</span>
          <el-input v-model="people" clearable></el-input>
        </span>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search" @click="getData(true)">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          车位预约
          <span class="mini">
            共
            <span class="blue">{{total}}</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" @click="getData" />
        </span>
        <span class="val">
          <el-button type="primary" plain size="small" @click="checkFNO">可预约车位管理</el-button>
          <!-- <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary" size="small" class="hui">修改</el-button>
          <el-button type="primary" size="small" class="hui">删除</el-button>-->
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
          <el-table-column prop="name" label="预约人" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
          <el-table-column prop="car" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="time" label="预约时间" align="center"></el-table-column>
          <el-table-column prop="submit" label="提交时间" align="center"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
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
    <div class="bgContant2" v-if="!showDoor">
      <!--  -->
      <div class="noticeT">
        <span class="name">可预约车位管理</span>
        <el-button size="small" @click="showDoor=true">返回</el-button>
      </div>
      <!--  -->
      <div class="parkInfo">
        <div class="title">车位收费信息</div>
        <!--  -->
        <div class="info">
          <span class="child">
            <span class="name">小区名:</span>
            <span class="val">{{changeInfo.community.name}}</span>
          </span>
          <span class="child">
            <span class="name">地址:</span>
            <span class="val">{{changeInfo.community.address}}</span>
          </span>
        </div>
        <!--  -->
        <div class="timeList" v-for="(item,index) in timeList" :key="index">
          <span class="child">
            <span class="name">{{item.name}}</span>
            <el-time-picker
              value-format="HH:mm"
              format="HH:mm"
              is-range
              v-model="item.time"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </span>
          <span class="child">
            <span class="name">{{item.fee}}</span>
            <el-input placeholder="请输入内容" type="number" v-model="item.money">
              <template slot="append">元/小时</template>
            </el-input>
            <el-input placeholder="请输入内容" type="number" @change="changeFN" v-model="item.fending">
              <template slot="append">元封顶</template>
            </el-input>
          </span>
        </div>
        <div class="timeList">
          <span class="name">全天收费</span>

          <span class="child">
            <el-input placeholder="请输入内容" type="number" v-model="allDay" disabled>
              <template slot="append">元封顶</template>
            </el-input>
          </span>
        </div>
        <!--  -->
      </div>

      <!--  -->
      <div class="parkNum" v-for="(item,index) in parkNum" :key="index">
        <span class="name">{{item.name}}</span>
        <span class="val">
          <el-input placeholder="请输入内容" type="number" disabled v-model="item.val" v-if="index!=2" />
          <el-input-number
            type="number"
            v-model="item.val"
            @change="handleChange"
            :min="0"
            :max="max"
            label="描述文字"
            v-else
          ></el-input-number>
        </span>
      </div>

      <!--  -->
      <div class="btn">
        <el-button
          type="primary"
          @click="isAddOrChange?addPackManage():changePack()"
        >{{isAddOrChange?'确定新增':'确定修改'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: "",
      showDoor: true,
      chooseTime: "",
      people: "",
      currentPage4: 1,
      info: [
        {
          name: "姓名:",
          val: "王鸿",
          data: "",
        },
        {
          name: "性别:",
          val: "男",
          data: "",
        },
        {
          name: "手机:",
          val: "13344449999",
          data: "",
        },
        {
          name: "电话:",
          val: "020-44449999",
          data: "",
        },
        {
          name: "身份证号:",
          val: "420122199001010226",
          data: "",
        },
        {
          name: "默认住址:",
          val: "元邦山清水秀花园1栋205",
          data: "",
        },
        {
          name: "身份:",
          val: "业主",
          data: "",
        },
        {
          name: "邮箱:",
          val: "377789999@qq.com",
          data: "",
        },
      ],
      tableData: [
        {
          name: "王鸿",
          phone: "15577776666",
          car: "粤A 888888",
          time: "2020-06-12 14:30",
          submit: "2020-06-12 14:30",
          status: "进行中",
        },
        {
          name: "王鸿",
          phone: "15577776666",
          car: "粤A 888888",
          time: "2020-06-12 14:30",
          submit: "2020-06-12 14:30",
          status: "进行中",
        },
      ],
      onlineCon: [
        {
          name: "来访人数",
          val: "2人",
          data: "",
        },
        {
          name: "目的",
          val: "探访",
          data: "",
        },
        {
          name: "预约时间",
          val: "2020-06-12  14:30",
          data: "",
        },
        {
          name: "来访时间",
          val: "2020-06-12  14:30",
          data: "",
        },
        {
          name: "状态",
          val: "进行中",
          data: "",
        },
      ],
      multipleSelection: [], //
      jindu: [
        {
          name: "业主姓名",
          val: "王鸿",
          data: "",
        },
        {
          name: "报修类型",
          val: "室内报修",
          data: "",
        },
        {
          name: "报修时间",
          val: "2020-06-12  14:30",
          data: "",
        },
        {
          name: "报修详情",
          val: "洗手池堵塞,无法下水",
          data: "",
        },
        {
          name: "预约时间",
          val: "2020-06-12  14:30",
          data: "",
        },
      ],
      timeList: [
        {
          name: "第一时段",
          time: "",
          money: 0,
          fending: 0,
          fee: "收费",
        },
        {
          name: "第二时段",
          time: "",
          money: 0,
          fending: 0,
          fee: "收费",
        },
      ],
      allDay: 0,
      parkNum: [
        {
          name: "小区总车位数",
          val: "",
          plr: "",
          data: "count",
        },
        {
          name: "闲置车位数",
          val: "",
          plr: "",
          data: "idelCount",
        },
        {
          name: "可预约车位数",
          val: "",
          plr: "",
          data: "bookableCount",
        },
      ],
      isAddOrChange: false,
      changeInfo: {
        community:{}
      },
      max:0
    };
  },
  //
  mounted() {
    this.getData();
    // this.checkFNO();
  },
  methods: {
    //
    changeFN() {
      this.allDay =
        parseFloat(this.timeList[0].fending) +
        parseFloat(this.timeList[1].fending);
      // console.log(this.timeList[0].fending,this.timeList[1].fending,'=======');
    },
    //
    checkFNO() {
      this.showDoor=false
      this.getFN({
        url: "/assetsservice/parkingappointmentmanager/message",
        data: {},
      }).then((r) => {
        if (r.data.status == "OK") {
          r.data.data
            ? (this.isAddOrChange = false)
            : (this.checkFNT(), (this.isAddOrChange = true));
          if (r.data.data) {
            let datar = r.data.data;
            this.changeInfo = datar;
            this.timeList = [
              {
                name: "第一时段",
                time: datar.firstStage.split(","),
                money: datar.firstStagePrice,
                fending: datar.firstStageMaxCost,
                fee: "收费",
              },
              {
                name: "第二时段",
                time: datar.secondStage.split(","),
                money: datar.secondStagePrice,
                fending: datar.secondStageMaxCost,
                fee: "收费",
              },
            ];
            this.allDay = datar.firstStageMaxCost + datar.secondStageMaxCost;
            this.parkNum.forEach((s) => {
              s.val = datar[s.data];
            });
            this.max=this.parkNum[0].val
          }
        } else this.eFN(r.data.message);
        console.log(r);
      });
    },
    //
    checkFNT() {
      this.getFN({
        url: "/assetsservice/parkingappointmentmanager/parking_survey",
        data: {},
      }).then((r) => {
        if (r.data.status == "OK") {
          this.parkNum[0].val = r.data.data.count;
          this.parkNum[1].val = r.data.data.idelCount;
        } else this.eFN(r.data.message);
        console.log(r);
      });
    },
    handleChange() {
      console.log();
    },

    //
    changePack() {
      this.putFN({
        url: "/assetsservice/parkingappointmentmanager",
        data: {
          communityId:this.changeInfo.communityId,
          id:this.changeInfo.id,
          firstStage: this.timeList[0].time[0] + "," + this.timeList[0].time[1],
          firstStageMaxCost: this.timeList[0].fending,
          firstStagePrice: this.timeList[0].money,
          secondStage:
            this.timeList[1].time[0] + "," + this.timeList[1].time[1],
          secondStageMaxCost: this.timeList[1].fending,
          secondStagePrice: this.timeList[1].money,
          dayMaxCost: this.allDay,
          count: this.parkNum[0].val,
          idelCount: this.parkNum[1].val,
          bookableCount: this.parkNum[2].val,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.oFN('修改成功！')
        } else this.eFN(r.data.message);
        console.log(r);
      });
    },

    //
    addPackManage() {
      this.postFN({
        url: "/assetsservice/parkingappointmentmanager",
        data: {
          firstStage: this.timeList[0].time[0] + "," + this.timeList[0].time[1],
          firstStageMaxCost: this.timeList[0].fending,
          firstStagePrice: this.timeList[0].money,
          secondStage:
            this.timeList[1].time[0] + "," + this.timeList[1].time[1],
          secondStageMaxCost: this.timeList[1].fending,
          secondStagePrice: this.timeList[1].money,
          dayMaxCost: this.allDay,
          count: this.parkNum[0].val,
          idelCount: this.parkNum[1].val,
          bookableCount: this.parkNum[2].val,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.oFN("新增成功！");
        } else this.eFN(r.data.message);
      });
    },
    //
    getData(seach) {
      seach ? (this.currentPage4 = 1) : "";
      this.getFN({
        url: "/assetsservice/parkingappointment/page",
        data: {
          appointTime: this.chooseTime || null,
          currentPage: this.currentPage4,
          name: this.people || null,
          pageSize: 10,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
        } else this.eFN(r.data.message);
        console.log(r);
      });
    },
    //
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less">
#fuParkReser {
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
      // width: 100px;
      font-size: 15px;
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
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    height: 100%;
    overflow: auto;
    .el-range-separator {
      width: 35px;
    }
    .noticeT {
      display: flex;
      align-items: center;
      margin: 28px 29px;
      border-left: 6px solid #4799f7;
      padding-left: 20px;
      .name {
        font-size: 22px;
        font-weight: bold;
        flex: 1;
      }
      .el-button {
        border-radius: 6px;
        border: 1px solid rgba(71, 153, 247, 1);
        color: #4799f7;
        font-size: 18px;
        width: 100px;
      }
    }
    .btn {
      padding: 30px;
      text-align: center;
    }
    //
    .parkInfo {
      margin: 0 28px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
      padding: 0 22px;
      .title {
        padding: 24px 0 20px;
        font-size: 18px;
        font-weight: bold;
      }
      .info {
        display: flex;
        align-items: center;
        padding: 0 0 15px;
        margin: 0 20px;
        border-bottom: 1px solid rgb(238, 238, 238);
        .child {
          margin-right: 15%;
          .name {
            color: #787878;
            font-size: 14px;
            margin-right: 20px;
          }
        }
      }
      .timeList {
        padding: 10px 0;
        margin: 0 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(238, 238, 238);
        .name {
          margin-right: 20px;
        }
        .child {
          margin-right: 5%;
          display: flex;
          align-items: center;
          .name {
            margin-right: 20px;
          }
          .el-input {
            flex: 1;
            margin-right: 15px;
          }
        }
      }
    }
    .parkNum {
      justify-content: center;
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-top: 50px;
      .el-input {
        max-width: 250px;
      }
      .val {
        width: 400px;
      }
      .name {
        text-align: right;
        margin-right: 50px;
        width: 100px;
      }
    }
  }
}
</style>