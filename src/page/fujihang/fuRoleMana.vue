<!--
 * @Author: fujihang
 * @Date: 2020-07-24 11:45:36
 * @LastEditors: your name
 * @LastEditTime: 2020-08-17 17:07:21
 * @Description: 社区实事
--> 
<template>
  <div id="fuRoleMana">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">姓名</span>
          <el-input v-model="people" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">所属部门</span>
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
          物业管理
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small" @click="addAlert=true">新增</el-button>
          <el-button type="primary" size="small" class="hui">修改</el-button>
          <el-button type="primary" size="small" class="hui">删除</el-button>
        </span>
      </span>
      <!--  -->
      <!-- id: "1",
          name: "guanliyuan",
          det: '管理员角色处理物业日常事务…',
          power: '缴费处理权限;维修处理权限',
      time: "2020-12-12",-->

      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="序号" align="center"></el-table-column>
          <el-table-column prop="name" label="角色名" align="center"></el-table-column>
          <el-table-column prop="det" label="角色描述" align="center"></el-table-column>
          <el-table-column prop="power" label="权限" align="center"></el-table-column>
          <el-table-column prop="time" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" @click="parkAlert=true">分配</el-button>
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
    <el-dialog title="分配角色" :visible.sync="parkAlert">
      <div class="list" v-for="(item,index) in jueSe" :key="index">
        <span class="name">{{item.name}}</span>
        <el-select v-model="item.val" placeholder="请选择">
          <el-option
            v-for="item in item.data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button size="mini" type="primary">确定分配</el-button>
      </div>
    </el-dialog>
    <!--  -->
    <el-dialog title="新增角色" :visible.sync="addAlert">
      <div class="list" v-for="(item,index) in addJueSe" :key="index">
        <span class="name">{{item.name}}</span>

        <el-input v-model="item.val" v-if="index<2"></el-input>

        <span class="flex" v-else>
          <el-tag v-for="tag in item.tags" :key="tag.name" closable :type="tag.type">{{tag.name}}</el-tag>
        </span>
      </div>
      <div class="btn">
        <el-button size="mini" type="primary">确定分配</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDoor: true,
      people: "",
      status: "",
      statusT: "",
      multipleSelection: [],
      currentPage4: 1,
      parkAlert: false,
      addAlert: false,
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
          id: "1",
          name: "guanliyuan",
          det: "管理员角色处理物业日常事务…",
          power: "缴费处理权限;维修处理权限",
          time: "2020-12-12",
        },
        {
          id: "2",
          name: "guanliyuan",
          det: "管理员角色处理物业日常事务…",
          power: "缴费处理权限;维修处理权限",
          time: "2020-12-12",
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
      jueSe: [
        {
          name: "角色名",
          val: "",
          data: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
          ],
        },

        {
          name: "用户",
          val: "",
          data: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
          ],
        },
      ],
      addJueSe: [
        {
          name: "角色名",
          val: "",
          data: "",
        },
        {
          name: "角色描述",
          val: "",
          data: "",
        },
        {
          name: "权限",
          val: "",
          tags: [
            { name: "标签一", type: "" },
            { name: "标签二", type: "success" },
            { name: "标签三", type: "info" },
            { name: "标签四", type: "warning" },
            { name: "标签五", type: "danger" },
          ],
          data: "",
        },
      ],
    };
  },
  methods: {
    handleEdit(a, b) {
    },
    handleDelete(a, b) {
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
#fuRoleMana {
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
    .btn {
      margin-top: 20px;
      .el-button {
        margin-left: 250px;
        width: 110px;
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
    .list {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .name {
        width: 100px;
        text-align: right;
        margin-right: 20px;
      }
      .el-input {
        width: 200px;
      }
      .flex {
        padding: 5px;
        width: 200px;
        border: 1px solid rgb(223, 223, 223);
        border-radius: 5px;
        min-height: 40px;
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;
      .el-button {
        font-size: 16px;
      }
    }
  }
}
</style>