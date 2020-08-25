<!--
 * @Author: fujihang
 * @Date: 2020-07-25 16:21:25
 * @LastEditors: your name
 * @LastEditTime: 2020-08-21 09:50:16
 * @Description: 业主基本信息
--> 

<template>
  <div id="fuDefaultInfo">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">业主姓名</span>
          <el-input v-model="people" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">电话</span>
          <el-input v-model="idS" clearable></el-input>
        </span>
        <!-- <span class="child">
          <span class="name">房号</span>
          <el-select v-model="roomId" placeholder="请选择">
            <el-option
              v-for="item in roomList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>-->
        <span class="child">
          <span class="name">账户状态</span>
          <el-select v-model="status" placeholder="请选择" clearable>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search" @click="getData(true)">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          业主基本信息
          <span class="mini">
            共
            <span class="blue">{{total}}</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" @click="getData" />
        </span>
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
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="序号" align="center" width="80px"></el-table-column>
          <el-table-column prop="name" label="业主姓名" align="center"></el-table-column>
          <el-table-column label="性别" align="center">
            <template slot-scope="scope">{{scope.row.gender==1?'男':'女'}}</template>
          </el-table-column>
          <el-table-column prop="idcard" label="身份证号" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
          <!-- <el-table-column prop="lou" label="楼栋" align="center"></el-table-column>
          <el-table-column prop="root" label="单元号" align="center"></el-table-column>
          <el-table-column prop="room" label="房号" align="center"></el-table-column>-->
          <el-table-column label="账户状态" align="center">
            <template slot-scope="scope">
              <span :class="[scope.row.bind?'greed':'red']">{{scope.row.bind?'已绑定':'未绑定'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
              <el-button size="mini" type="primary" @click="detailFN( scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="total/10"
          layout=" prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!--  -->
    <div class="bgContant2" v-show="!showDoor">
      <div class="noticeT">
        <span class="name">业主详情</span>
        <el-button size="small" @click="returnFN">返回</el-button>
      </div>
      <div class="info">
        <div class="nav">
          <span class="name">业主信息</span>
        </div>
        <div class="contant">
          <span class="child" v-for="(item,index) in info" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="val">{{item.name=='性别:'?item.val==1?'男':'女':item.val||'无'}}</span>
          </span>
        </div>
      </div>
      <!--  -->
      <el-tabs v-model="activeName" type="card" @tab-click="tabFN">
        <el-tab-pane
          :label="item.name"
          :name="'index'+index"
          v-for="(item,index) in infoList"
          :key="index"
        >
          <!--  -->
          <div v-show="activeName=='index'+index">
            <div class="fcList" v-for="(itemc,indexc) in item.list" :key="indexc">
              <img src="/static/house.png" />
              <span class="conborder">
                <span class="contant">
                  <span class="name">{{itemc.name}}</span>
                  <span class="val" @click="itemc.show=!itemc.show">
                    详情
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                </span>
                <!--  -->
                <div class="detail" v-show="itemc.show">
                  <span class="child" v-for="(items,indexs) in itemc.det" :key="indexs">
                    <span class="name">{{items.name}}</span>
                    <span class="val">{{items.val||'无'}}</span>
                  </span>
                </div>
              </span>
            </div>
            <div style="padding:0 30px;font-size:18px;" v-if="!item.list.length">暂无数据</div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!--  -->
      <!-- <div class="onlineCon">
        <span class="child" v-for="(item,index) in onlineCon" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="val">{{item.val}}</span>
        </span>
      </div>-->

      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDoor: true,
      people: "",
      idS: "",
      roomId: "",
      multipleSelection: "",
      status: "",
      currentPage4: 1,
      total: 0,
      roomList: [
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
          value: "false",
          label: "未绑定",
        },
        {
          value: "true",
          label: "已绑定",
        },
      ],
      tableData: [],
      info: [
        {
          name: "姓名:",
          val: "",
          data: "name",
        },
        {
          name: "性别:",
          val: "",
          data: "gender",
        },
        {
          name: "手机:",
          val: "",
          data: "phone",
        },

        {
          name: "身份证号:",
          val: "",
          data: "idcard",
        },
        {
          name: "邮箱:",
          val: "",
          data: "email",
        },
      ],
      onlineCon: [
        {
          name: "地址",
          val: "广州市花都山前大道1242号",
          data: "",
        },
        {
          name: "购入时间",
          val: "2020-06-12  14:30",
          data: "",
        },
        {
          name: "房屋面积",
          val: "86平方米",
          data: "",
        },
        {
          name: "车位",
          val: "2000元/月",
          data: "",
        },
      ],
      activeName: "index0",
      infoList: [
        {
          name: "房产信息",
          list: [],
        },
        {
          name: "商铺信息",
          list: [],
        },
        {
          name: "车位信息",
          list: [],
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //
    returnFN() {
      this.showDoor = true;
    },
    // 获取数据
    getData(isSeach) {
      isSeach ? (this.currentPage4 = 1) : "";
      this.getFN({
        url: "/assetsservice/proprietor/page",
        data: {
          bindState: this.status || null,
          currentPage: this.currentPage4,
          pageSize: 10,
          phone: this.idS || null,
          proprietorName: this.people || null,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.tableData = r.data.data.records;
          r.data.data.total ? (this.total = r.data.data.total) : "";
        } else this.eFN(r.data.message);
      });
    },
    // getHouse() {},
    handleEdit(a, b) {},
    // 
    tabFN(data){
      console.log(data);
      data.index==2?this.getPack():data.index==1?'':''
    },


    // 房屋的
    detailFN(data) {
      this.info.forEach((s) => {
        s.val = data[s.data];
      });
      this.infoList[0].list = [];
      this.infoList[1].list = [];
      this.infoList[2].list = [];
      this.infoList[2].post=data.id,
      // 房屋的
      this.getFN({
        url: "/assetsservice/housemessage/houseMessage?proprietorId=" + data.id,
      }).then((r) => {
        if (r.data.status == "OK") {
          r.data.data.forEach((s) => {
            this.infoList[0].list.push({
              name: s.storiedBuilding + s.number,
              show: false,
              det: [
                {
                  name: "地址",
                  val: s.community.address,
                },
                {
                  name: "房屋面积",
                  val: s.area + "平方",
                },
              ],
            });
          });
        } else this.eFN(r.data.message);
      });
      // 商铺的
      // this.getFN({
      //   url: "/assetsservice/shopsmessage/message?proprietorId=" + data.id,
      // }).then((r) => {
      //   console.log(r,'======');
      //   if (r.data.status == "OK") {
      //     r.data.data.forEach((s) => {

      //     {
      //   name: "1栋 1单元 0205",
      //   img: require("../../../static/20140816114432535.png"),
      //   show: false,
      //   det: [
      //     {
      //       name: "地址",
      //       val: "广州市花都山前大道1242号",
      //       data: "",
      //     },
      //     {
      //       name: "购买日期",
      //       val: "2020年6月12日",
      //       data: "",
      //     },
      //     {
      //       name: "交房日期",
      //       val: "2020年6月12日",
      //       data: "",
      //     },
      //     {
      //       name: "房屋面积",
      //       val: "单独车位",
      //       data: "",
      //     },
      //     {
      //       name: "成交金额",
      //       val: "86平方米",
      //       data: "",
      //     },
      //     {
      //       name: "产权期限",
      //       val: "70年",
      //       data: "",
      //     },
      //     {
      //       name: "合同编号",
      //       val: "111122223333",
      //       data: "",
      //     },
      //     {
      //       name: "经办人",
      //       val: "王小二",
      //       data: "",
      //     },
      //     {
      //       name: "经办人电话",
      //       val: "13344445555",
      //       data: "",
      //     },
      //   ],
      // },

      // this.infoList[1].list.push({
      //   name: s.storiedBuilding + s.number,
      //   show: false,
      //   det: [
      //     {
      //       name: "地址",
      //       val: s.community.address,
      //     },
      //     {
      //       name: "房屋面积",
      //       val: s.area + "平方",
      //     },
      //   ],
      // });

      //     });
      //   } else this.eFN(r.data.message);
      // });

      this.showDoor = false;
    },
    // 车位
    getPack() {
      if(this.infoList[2].finsh) return
      this.getFN({
        url: "/assetsservice/parkingmessage/proprietor?proprietorId=" + this.infoList[2].post,
      }).then((r) => {
        if (r.data.status == "OK") {
          this.infoList[2].finsh=true
          r.data.data.forEach((s) => {
            this.infoList[2].list.push({
              name: s.location + s.floor + "层" + s.number + "号",
              show: false,
              det: [
                {
                  name: "业主姓名",
                  val: s.proprietorName,
                },
                {
                  name: "车位类型",
                  val: s.category,
                },
                {
                  name: "购买日期",
                  val: s.tradeDate,
                },
                {
                  name: "楼层",
                  val: s.floor + "层",
                },
                {
                  name: "交易状态",
                  val:
                    s.tradeState == 0
                      ? "闲置"
                      : s.tradeState == 1
                      ? "已售"
                      : s.tradeState == 2
                      ? "已租"
                      : "待租户确认",
                },
              ],
            });
          });
        } else this.eFN(r.data.message);
      });
    },
    //
    handleDelete(a, b) {
      console.log(a, b);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getData();
      // console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less">
#fuDefaultInfo {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  //
  .bgContant {
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
    }
    .el-pagination {
      padding: 20px 0;
      text-align: center;
    }
  }

  //
  //
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
  //
  .info {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    margin: 0 30px 33px;
    border-radius: 10px;
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px;
      .name {
        font-size: 20px;
        font-weight: bold;
      }
      .val {
        color: #4799f7;
        font-size: 16px;
        display: flex;
        align-items: center;
        .el-icon-edit-outline {
          font-size: 22px;
          margin-right: 5px;
        }
      }
    }
    .contant {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 10px;
      .child {
        margin: 0 21px 36px;
        width: calc(25% - 42px);
        font-size: 16px;
        .name {
          color: #787878;
        }
        .val {
          font-weight: bold;
        }
      }
    }
  }

  //
  .bgContant2 {
    height: 100%;
    overflow: auto;
  }
  //
  .onlineCon {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .child {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      font-size: 16px;
      margin-bottom: 20px;
      .name {
        width: 110px;

        color: #808080;
      }
      .val {
        border: 1px solid rgb(185, 185, 185);
        padding: 5px 20px;
        width: 300px;
      }
    }
  }

  //
  .el-tabs {
    .fcList {
      display: flex;
      align-items: flex-start;
      margin: 0 30px;
      > img {
        width: 50px;
        height: 50px;
      }
      .conborder {
        flex: 1;
        margin-left: 33px;
      }
      .contant {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(221, 221, 221);
        padding: 18px 0;
        margin-bottom: 20px;
        .name {
          font-size: 18px;
          color: #303133;
        }
        .val {
          color: #909399;
        }
      }
      .detail {
        flex-wrap: wrap;
        display: flex;
        align-items: center;

        .child {
          display: flex;
          align-items: center;

          width: 33.33%;
          margin-bottom: 20px;
          .name {
            font-size: 16px;
          }
          .val {
            margin: 0 20px;
            flex: 1;
            padding: 10px 20px;
            border: 1px solid rgb(228, 228, 228);
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>