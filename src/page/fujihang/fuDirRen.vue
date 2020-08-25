<!--
 * @Author: fujihang
 * @Date: 2020-07-22 17:13:59
 * @LastEditors: your name
 * @LastEditTime: 2020-08-04 16:10:09
 * @Description: 闲置转卖
--> 

<template>
  <div id="fuDirRen">
    <div class="bgContant" v-show="showZM">
      <div class="chooseList">
        <span class="child">
          <span class="name">关键词</span>
          <el-input v-model="input" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">评论者</span>
          <el-input v-model="revie" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">评论状态</span>
          <span class="val">
            <el-select v-model="com" placeholder="请选择">
              <el-option
                v-for="item in comList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </span>
        <span class="flex">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          闲置转卖
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small">批量屏蔽</el-button>
          <el-button type="primary" size="small" class="hui">批量启用</el-button>
          <el-button type="primary" size="small" class="hui">删除</el-button>
        </span>
      </span>
      <!--  -->

 <!-- {
          img: require("../../../static/bg.jpg"),
          title: "元邦山清水秀小区停水通知",
          add: "元邦明月翡翠1栋地下停车场A15",
          price: "1000元/月",
          time: "2020-06-12 14:30",
          name: "王瑶",
          buystatus: "未卖出",
          status: "启用",
        }, -->

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
          <el-table-column prop="title" label="车位标题" align="center"></el-table-column>
          <el-table-column prop="add" label="车位位置" align="center"></el-table-column>
          <el-table-column prop="price" label="租金" align="center"></el-table-column>
          <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
          <el-table-column prop="name" label="发布者" align="center"></el-table-column>
          <el-table-column prop="buystatus" label="车位状态" align="center"></el-table-column>
          <el-table-column prop="status" label="发布状态" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delFN(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" type="primary" @click="seeFN(scope.$index, scope.row)">详情</el-button>
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
    <div class="bgContant2" v-show="!showZM">
      <div class="noticeT">
        <span class="name">转卖详情</span>
        <el-button size="small" @click="showZM=true" type="primary" plain>返回</el-button>
      </div>
      <div class="list">
        <span class="name">发布状态</span>
        <span class="val">
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div
        :class="['list',index==2||index==7?'border':'',index==1?'start':'']"
        v-for="(item,index) in comDetail"
        :key="index"
      >
        <span class="name">{{item.name}}</span>
        <span class="val">
          <el-input v-if="index!=1" v-model="item.val" :type="index==1||index==2||index==7?'textarea':''" disabled="true"></el-input>
          <div v-if="index==1" class="imgCon">
            <img v-for="(itemi,indexi) in item.val" :src="itemi" :key="indexi" />
          </div>
        </span>
      </div>
      <!--  -->
      <div class="list btn">
        <!-- <el-button type="primary" size="small">确认回复</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showZM: true,
      input: "",
      revie: "",
      com: "",
      comList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "黄金糕",
        },
      ],
      multipleSelection: [],
      currentPage4: 1,
      tableData: [
        {
          img: require("../../../static/bg.jpg"),
          title: "元邦山清水秀小区停水通知",
          add: "元邦明月翡翠1栋地下停车场A15",
          price: "1000元/月",
          time: "2020-06-12 14:30",
          name: "王瑶",
          buystatus: "未卖出",
          status: "启用",
        },
        {
          img: require("../../../static/bg.jpg"),
          title: "元邦山清水秀小区停水通知",
          add: "元邦明月翡翠1栋地下停车场A15",
          price: "1000元/月",
          time: "2020-06-12 14:30",
          name: "王瑶",
          buystatus: "未卖出",
          status: "启用",
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
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ], //
      status: "",
      comDetail: [
        {
          name: "车位介绍",
          val: "元邦明月翡翠1栋地下停车场A15",
          data: "",
        },
        {
          name: "图片",
          val: [
            require("../../../static/bg.jpg"),
            require("../../../static/bg.jpg"),
            require("../../../static/bg.jpg"),
          ],
          data: "",
        },
        {
          name: "详情介绍",
          val: "因闲置在家所以低价转租,有意者联系我",
          data: "",
        },
        {
          name: "租金",
          val: "1000元/月",
          data: "",
        },
        {
          name: "发布时间",
          val: "2020-12-12  13:20",
          data: "",
        },
        {
          name: "发布人",
          val: "王瑶",
          data: "",
        },
        {
          name: "出租状态",
          val: "未租出",
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
    seeFN(a, b) {
      this.showZM = false;
      console.log(a, b);
    },
  },
};
</script>

<style lang="less">
#fuDirRen {
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
  .bgContant2 {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    height: 100%;
    overflow: auto;

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
        font-size: 14px;
        width: 90px;
      }
    }
    //
    .list {
      display: flex;
      align-items: center;
      margin: 0 100px 20px;
      width: 70%;
      .name {
        width: 100px;
        text-align: right;
        margin-right: 25px;
      }
      .val{
        flex: 1;
        .imgCon{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          >img{
            height: 80px;
            margin-right: 10px;
            // height: 1px;
          }
        }
      }
      .el-input__inner,
      .el-textarea__inner {
        width: 240px;
      }
    }
    .start {
      align-items: flex-start;
    }
    .border {
      padding-top: 20px;
      border-top: 2px dashed rgb(235, 235, 235);
      align-items: flex-start;
    }
    .btn {
      margin-top: 20px;
      .el-button {
        margin-left: 250px;
        width: 110px;
      }
    }
  }

  .hui {
    background: rgba(174, 183, 193, 1);
  }
}
</style>