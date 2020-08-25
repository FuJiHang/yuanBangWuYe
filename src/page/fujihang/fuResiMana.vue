<!--
 * @Author: fujihang
 * @Date: 2020-07-30 18:22:09
 * @LastEditors: your name
 * @LastEditTime: 2020-08-21 10:11:45
 * @Description: 住宅管理
--> 


<template>
  <div id="fuResiMana">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">房屋状态</span>
          <el-select v-model="status" placeholder="请选择" clearable >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>

        <span class="child">
          <span class="name">楼栋</span>
          <el-input v-model="room" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">单元号</span>
          <el-input v-model="unit" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">房号</span>
          <el-input v-model="roomId" clearable></el-input>
        </span>
        <span class="flex">
          <el-button type="primary" icon="el-icon-search" @click="getData(true)">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          <!-- 实时资讯评论 -->
          元邦·山清水秀
          <!-- <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>-->
          <!-- <img src="/static/zhongzhiG.png" /> -->
        </span>
        <!-- <span class="val">
          <el-button type="primary" size="small">批量禁用</el-button>
          <el-button type="primary" size="small" class="hui">批量启用</el-button>
          <el-button type="primary" size="small" class="hui">删除</el-button>
        </span>-->
      </span>
      <!--  -->

      <!-- floor:"1栋",
          unit:"A单元",
          room:"房号",
          status:"已出售",
          name:"王鸿",
          phone:"13553570072",
          time:"2020-06-12",
      people:"2人"-->

      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="100%"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="storiedBuilding" label="楼栋" align="center"></el-table-column>
          <el-table-column prop="number" label="房号" align="center"></el-table-column>
          <el-table-column label="房屋状态" align="center">
            <template slot-scope="scope">
              <span
                :class="[scope.row.tradeState?'greed':'red']"
              >{{scope.row.tradeState?'已售出':'未售出'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="proprietorName" label="业主姓名" align="center" class-name="blue"></el-table-column>
          <el-table-column label="售出时间" align="center">
            <template slot-scope="scope">{{scope.row.tradeDate||'-'}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="detailFN(scope.row)">查看</el-button>
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
    </div>

    <!--  -->
    <div class="bgContant2" v-show="!showDoor">
      <div class="noticeT">
        <span class="name">申请租赁审核</span>
        <el-button size="small" @click="showDoor=true">返回</el-button>
      </div>
      <div class="info">
        <div class="nav">
          <span class="name">房屋信息</span>
          <span class="val" @click="edit=!edit">
            <i class="el-icon-edit-outline"></i>
            编辑
          </span>
        </div>
        <div class="contant">
          <span class="child" v-for="(item,index) in info" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="val">
              <el-input :disabled="edit" v-model="item.val"></el-input>
            </span>
          </span>
        </div>
      </div>
      <!--  -->
      <div class="people">
        <div class="navtap">
          <span class="name">{{info[4].val}}的</span>
          <span class="val">家人</span>
          <span class="flex">人数: {{people.length}}人</span>
        </div>
        <div class="add">
          <el-button size="small">新增家人</el-button>
        </div>
        <div class="list" v-for="(item,index) in people" :key="index">
          <img :src="item.img" />
          <span class="contant">
            <span class="flex">
              <div class="name">{{item.name}}</div>
              <div class="val">{{item.val}}</div>
            </span>
            <el-button size="small" type="primary">删除</el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      showDoor: true,
      edit: true,
      room: "",
      roomId: "",
      status: "",
      unit: "",
      multipleSelection: [],
      currentPage4: 1,
      statusList: [
        {
          value: "false",
          label: "未出售",
        },
        {
          value: "true",
          label: "已出售",
        },
      ], //

      tableData: [
        {
          floor: "1栋",
          unit: "A单元",
          room: "房号",
          status: "已出售",
          name: "王鸿",
          phone: "13553570072",
          time: "2020-06-12",
          people: "2人",
        },
      ],
      info: [
        {
          name: "房屋状态:",
          val: "",
        },
        {
          name: "房屋面积:",
          val: "",
          data: "area",
        },
        {
          name: "房屋地址:",
          val: "",
        },
        {
          name: "房屋类型:",
          val: "",
          data: "",
        },
        {
          name: "业主姓名:",
          val: "",
          data: "proprietorName",
        },
        {
          name: "身份证号:",
          val: "",
        },
        {
          name: "电话:",
          val: "",
        },
        {
          name: "绑定家人:",
          val: "",
          data: "bindFamilyNumber",
        },
      ],
      people: [ ],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage4 = val;
      this.getData();
    },
    handleEdit(index, data) {
      this.showDoor = false;
    },
    handleDelete(index, data) {},
    //获取数据
    getData(isSeach) {
      isSeach ? (this.currentPage4 = 1) : "";
      this.getFN({
        url: "/assetsservice/housemessage/page",
        data: {
          tradeState: this.status || null,
          currentPage: this.currentPage4,
          pageSize: 10,
          unit: this.unit || null,
          storiedBuilding: this.room || null,
          number: this.roomId || null,
        },
      }).then((r) => {
        console.log(r, "=======");
        if (r.data.status == "OK") {
          this.tableData = r.data.data.records;
          r.data.data.total ? (this.total = r.data.data.total) : "";
        } else this.eFN(r.data.message);
      });
    },
    // 详情
    detailFN(data) {
      // {
      //   name: "房屋状态:",
      //   val: "",
      // },
      // {
      //   name: "房屋面积:",
      //   val: "",
      //   data: "area",
      // },
      // {
      //   name: "房屋地址:",
      //   val: "",
      // },
      // {
      //   name: "房屋类型:",
      //   val: "",
      //   data: "",
      // },
      // {
      //   name: "业主姓名:",
      //   val: "",
      //   data: "proprietorName",
      // },
      // {
      //   name: "身份证号:",
      //   val: "",
      // },
      // {
      //   name: "电话:",
      //   val: "",
      // },
      // {
      //   name: "绑定家人:",
      //   val: "",
      //   data: "bindFamilyNumber",
      // },

      this.info.forEach((s, i) => {
        if (!i) {
          s.val = data.tradeState ? "已出售" : "未出售";
        } else if (i == 2) {
          s.val = data.community.address;
        } else if (i == 3) {
        } else if (i == 5) {
          s.val = data.proprietor.idcard;
        } else if (i == 6) {
          s.val = data.proprietor.phone;
        } else s.val = data[s.data];
      });

      this.getFN({
        url: "/assetsservice/housemessage/family",
        data: {
          housePropertyId: data.id,
          proprietorId: data.proprietor ? data.proprietor.id : null,
        },
      }).then((r) => {
        this.showDoor = false;
        if(r.data.status=="OK"){  
          this.people=r.data.data
        }else this.eFN(r.data.message)
        console.log(r, "======");
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less">
#fuResiMana {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
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
        font-size: 18px;
        margin-right: 10px;
      }
      .el-input__inner {
        font-size: 16px;
      }
      .el-input {
        flex: 1;
      }
    }
    .flex {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .hui {
        background: rgba(192, 206, 223, 1);
        border-color: rgba(192, 206, 223, 1);
      }
    }
    .long {
      .el-button {
        font-size: 14px;
        width: 90px;
      }
    }
  }
  .chooseMB {
    padding: 10px 20px;
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
      .blue {
        color: #6095ff;
      }
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
        display: flex;
        align-items: center;
        .name {
          color: #787878;
        }
        .val {
          margin-left: 20px;
          flex: 1;
          input {
            font-weight: bold;
          }
          .el-input.is-disabled .el-input__inner {
            color: #666;
          }
        }
      }
    }
  }
  //
  .people {
    //
    .navtap {
      font-weight: bold;
      font-size: 18px;
      display: flex;
      align-items: flex-end;
      color: #4799f7;
      margin: 0 50px 20px;
      border-bottom: 1px solid rgb(238, 238, 238);
      padding-bottom: 20px;
      .name {
        font-size: 22px;
        padding-right: 15px;
        border-right: 1px solid rgb(238, 238, 238);
        margin-right: 20px;
      }
      .val {
        flex: 1;
      }
    }
    .add {
      margin: 0 50px 20px;
      .el-button {
        border-color: #4799f7;
        color: #4799f7;
        font-size: 16px;
      }
    }
    .list {
      display: flex;
      align-items: center;
      margin: 0 50px 0 60px;
      > img {
        height: 60px;
        margin-right: 20px;
      }
      .contant {
        flex: 1;
        font-weight: bold;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(238, 238, 238);
        .flex {
          flex: 1;
          padding: 15px 0;
        }
        .name {
          font-size: 16px;
          margin-bottom: 5px;
        }
        .val {
          font-size: 14px;
          color: #4799f7;
        }
      }
      .el-button {
        font-size: 16px;
        width: 110px;
      }
    }
  }
}
</style>