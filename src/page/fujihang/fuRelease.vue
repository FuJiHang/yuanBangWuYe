<!--
 * @Author: fujihang
 * @Date: 2020-07-22 17:13:59
 * @LastEditors: your name
 * @LastEditTime: 2020-08-04 15:38:14
 * @Description: 闲置转卖
--> 

<template>
  <div id="fuRelease">
    <div class="bgContant" v-show="showZM==0">
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
          动态发布
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

      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="detail" label="发布内容" align="center"></el-table-column>
          <el-table-column prop="fab" label="点赞" align="center"></el-table-column>
          <el-table-column prop="com" label="评论数" align="center"></el-table-column>
          <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
          <el-table-column prop="publisher" label="发布者" align="center"></el-table-column>
          <el-table-column prop="status" label="发布状态" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delFN(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" type="primary" @click="seeTFN(scope.$index, scope.row)">详情</el-button>
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
    <div class="bgContant2" v-show="showZM==1">
      <div class="noticeT">
        <span class="name">动态详情</span>
        <el-button size="small" @click="showZM=0">返回</el-button>
      </div>
      <!--  -->
      <div class="contantDet">
        <span class="child">
          <span class="name">发布状态</span>
          <span class="val noBg">
            <el-select v-model="status" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </span>
        <span
          :class="['child',index==0||index==2?'mini':'']"
          v-for="(item,index) in comDetail"
          :key="index"
        >
          <span class="name">{{item.name}}</span>
          <span class="val">{{item.val}}</span>
        </span>
      </div>
      <div class="imgList">
        <span class="name">图片</span>
        <span class="img">
          <img src="/static/bg.jpg" />
        </span>
      </div>
      <!--  -->
      <div class="comTop">
        <span class="child">
          <span class="name">被评论数</span>
          <span class="val">50</span>
        </span>
        <span class="child">
          <span class="name">点赞数</span>
          <span class="val">50</span>
        </span>
      </div>
      <!--  -->

      <div class="tableWork">
        <el-table
          :data="tableData2"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="xuhao" label="序号" align="center"></el-table-column>
          <el-table-column prop="name" label="评论人" align="center"></el-table-column>
          <el-table-column prop="com" label="评论内容" align="center"></el-table-column>
          <el-table-column prop="dian" label="用户点赞" align="center"></el-table-column>
          <el-table-column prop="time" label="评论时间" align="center"></el-table-column>
          <el-table-column prop="status" label="评论状态" align="center"></el-table-column>

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
    <div class="bgContant2" v-show="showZM==2">
      <div class="noticeT">
        <span class="name">评论详情</span>
        <el-button size="small" @click="showZM=1">返回</el-button>
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
        :class="['list',index==4?'border':'']"
        v-for="(item,index) in comDetail2"
        :key="index"
      >
        <span class="name">{{item.name}}</span>
        <span class="val">
          <el-input
            disabled="true"
            v-model="item.val"
            :type="index==0||index==5?'textarea':''"
          ></el-input>
       
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
      showZM: 0,
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
          detail: "元邦小区防疫科普,终结疫情从你我做起",
          fab: "50",
          com: "26",
          time: "2020-06-12 14:30",
          publisher: "王瑶",
          status: "启用",
        },
        {
          detail: "元邦小区防疫科普,终结疫情从你我做起",
          fab: "50",
          com: "26",
          time: "2020-06-12 14:30",
          publisher: "王瑶",
          status: "启用",
        },
      ],
      tableData2: [
        {
          xuhao: 1,
          name: "王瑶",
          com: "看来来电之前只能爬楼梯了",
          dian: "386",
          time: "2020-12-12  13:20",
          status: "启用",
        },
        {
          xuhao: 1,
          name: "王瑶",
          com: "看来来电之前只能爬楼梯了",
          dian: "386",
          time: "2020-12-12  13:20",
          status: "启用",
        },
      ],

      comDetail: [
        {
          name: "发布时间",
          val: "2020-12-12  13:20",
          data: "",
        },
        {
          name: "动态详情",
          val: "元邦小区防疫科普,终结疫情从你我做起",
          data: "",
        },
        {
          name: "发布人",
          val: "王瑶",
          data: "",
        },
      ],
       comDetail2: [
        {
          name: "评论内容",
          val: "看来来电之前只能爬楼梯了",
          data: "",
        },
        {
          name: "用户点赞",
          val: "280",
          data: "",
        },
        {
          name: "被评论数",
          val: "1",
          data: "",
        },
        {
          name: "评论时间",
          val: "2020-12-12  13:20",
          data: "",
        },
        {
          name: "评论人",
          val: "王瑶",
          data: "",
        },
        {
          name: "回复评论",
          val: "一样一样",
          data: "",
        },
    
      ],
      status: "",
      statusList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "黄金糕",
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
      this.showZM = 2;
      console.log(a, b);
    },
    seeTFN(a, b) {
      this.showZM = 1;
      console.log(a, b);
    },
  },
};
</script>

<style lang="less">
#fuRelease {
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
        border: 1px solid rgba(71, 153, 247, 1);
        color: #4799f7;
        font-size: 18px;
        width: 100px;
      }
    }
    .contantDet {
      display: flex;
      align-items: center;
      padding: 0 300px 0 90px;
      box-sizing: border-box;

      flex-wrap: wrap;
      .child {
        font-size: 16px;
        width: 60%;
        margin: 0 10px 30px;
        display: flex;
        align-items: baseline;
        .name {
          text-align: right;
          width: 80px;
        }
        .val {
          color: #909399;
          font-weight: bold;
          width: 70%;
          margin-left: 20px;
          padding: 5px 10px;
          background: rgba(242, 242, 242, 1);
        }
        .noBg {
          background: none;
          padding: 0;
        }
      }
      

      .mini {
        // flex: 1;
        width: calc(40% - 40px);
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
    .border{
        padding-bottom: 20px;
        border-bottom: 1px dotted rgb(196, 196, 196);
    }
    .imgList {
      display: flex;
      align-items: center;
      margin: 0 300px 0 90px;
      box-sizing: border-box;
      font-size: 16px;
      border-bottom: 1px dashed rgb(189, 189, 189);
      .name {
        text-align: right;
        width: 80px;
      }
      .img {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        flex: 1;
        margin-left: 30px;

        > img {
          margin-right: 10px;
          margin-bottom: 18px;

          height: 50px;
        }
      }
    }
  }
  //
  .comTop {
    display: flex;
    align-items: center;
    margin: 0 300px 0 90px;

    .child {
      font-size: 16px;
      width: 60%;
      margin: 10px 10px 30px;
      display: flex;
      align-items: baseline;
      .name {
        text-align: right;
        width: 80px;
      }
      .val {
        color: #909399;
        font-weight: bold;
        width: 50%;
        margin-left: 20px;
        padding: 5px 10px;
        background: rgba(242, 242, 242, 1);
      }
    }
  }

  .hui {
    background: rgba(174, 183, 193, 1);
  }
}
</style>