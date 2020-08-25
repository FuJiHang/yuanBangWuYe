<!--
 * @Author: fujihang
 * @Date: 2020-07-24 11:45:36
 * @LastEditors: your name
 * @LastEditTime: 2020-08-03 18:13:54
 * @Description: 社区实事
--> 
<template>
  <div id="fuComFactTwo">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">关键词</span>
          <el-input v-model="keyWord" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">评论者</span>
          <el-input v-model="people" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">评论状态</span>
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
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
        <span class="name">
          社区实事评论
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small">批量禁用</el-button>
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
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="detail" label="评论内容" align="center"></el-table-column>
          <el-table-column prop="dian" label="用户点赞" align="center"></el-table-column>
          <el-table-column prop="com" label="被评论" align="center"></el-table-column>
          <el-table-column prop="time" label="评论时间" align="center"></el-table-column>
          <el-table-column prop="person" label="评论者" align="center"></el-table-column>
          <el-table-column prop="status" label="评论状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="showDoor=false">详情</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <div class="bgContant2" v-show="!showDoor">
      <div class="noticeT">
        <span class="name">评论详情</span>
        <el-button size="small" @click="showDoor=true">返回</el-button>
      </div>
      <div class="list">
        <span class="name">评论状态</span>
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
          <el-input v-model="item.val" :type="index==1||index==2||index==7?'textarea':''"></el-input>
        </span>
      </div>
      <!--  -->
      <div class="list btn">
        <el-button type="primary" size="small">确认回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDoor: true,
      keyWord: "",
      people: "",
      status: "",
      statusT: "",
      multipleSelection: [],
      currentPage4: 1,
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
      tableData: [
        {
          title: "元邦山清水秀1栋停电通知...",
          detail: "看来来电之前只能爬楼梯了",
          dian: 555,
          com: 444,
          time: "2020-12-12  13:20",
          person: "王瑶",
          status: "启用",
        },
        {
          title: "元邦山清水秀1栋停电通知...",
          detail: "看来来电之前只能爬楼梯了",
          dian: 555,
          com: 444,
          time: "2020-12-12  13:20",
          person: "王瑶",
          status: "启用",
        },
      ],
      comDetail: [
        {
          name: "评论文章类型",
          val: "",
          data: "",
        },
        {
          name: "评论文章标题",
          val: "",
          data: "",
        },
        {
          name: "评论内容",
          val: "",
          data: "",
        },
        {
          name: "总点赞",
          val: "",
          data: "",
        },
        {
          name: "被评论数",
          val: "",
          data: "",
        },
        {
          name: "评论时间",
          val: "",
          data: "",
        },
        {
          name: "评论人",
          val: "",
          data: "",
        },
        {
          name: "回复评论",
          val: "",
          data: "",
        },
      ],
    };
  },
  methods: {
    handleEdit(a, b) {
      console.log(a, b);
    },
    handleDelete(a, b) {
      console.log(a, b);
    },
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
#fuComFactTwo {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  //
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
    margin: 19px;
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
    .btn{
      margin-top: 20px;
      .el-button{
        margin-left: 250px;
        width: 110px;
      }
    }
  }
}
</style>