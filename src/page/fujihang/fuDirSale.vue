<!--
 * @Author: fujihang
 * @Date: 2020-07-25 16:21:25
 * @LastEditors: your name
 * @LastEditTime: 2020-08-08 15:50:09
 * @Description: 业主基本信息
--> 

<template>
  <div id="fuDirSale">
    <div class="bgContant" v-show="!showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">关键字</span>
          <el-input v-model="people" clearable></el-input>
        </span>

        <span class="child">
          <span class="name">区域</span>
          <el-select v-model="roomId" placeholder="请选择">
            <el-option
              v-for="item in roomList"
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
          直售车位
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small" @click="showDoor=1">新增</el-button>
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
          <el-table-column label="车位图" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="shouye" />
            </template>
          </el-table-column>
          <el-table-column prop="id" label="楼号" align="center"></el-table-column>
          <el-table-column prop="name" label="楼层" align="center"></el-table-column>
          <el-table-column prop="idCard" label="车位号" align="center"></el-table-column>
          <el-table-column prop="phone" label="价格" align="center"></el-table-column>
          <el-table-column prop="root" label="发布状态" align="center"></el-table-column>
          <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
          <el-table-column prop="lou" label="车位状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" min-width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">隐藏</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
    <div class="bgContant2" v-show="showDoor==1">
      <!--  -->
      <div class="nationT">
        <el-checkbox v-model="checked"></el-checkbox>
        <span class="name">发布车位</span>
        <i class="el-icon-circle-plus" @click="addFN"></i>
        <el-button size="small" @click="showDoor=0" type="primary" plain>返回</el-button>
      </div>
      <!--  -->
      <div class="overAuto">
        <!--  -->
        <div class="list" v-for="(item,index) in releaPark" :key="index">
          <el-checkbox v-model="item.choose"></el-checkbox>
          <span class="contant">
            <div class="conFlex">
              <div class="img flex">
                <span class="name">车位图</span>
                <el-input placeholder="请上传图片" v-model="item.info[0].val">
                  <template slot="append">.jpg</template>
                </el-input>
                <i class="el-icon-circle-plus"></i>
              </div>
              <span class="flex">
                <template v-for="(itemc,indexc) in item.info">
                  <span
                    :class="['child',indexc==1||indexc==5?'childBig':'']"
                    :key="indexc"
                    v-if="indexc"
                  >
                    <span class="name">{{itemc.name}}</span>
                    <span class="tabList" v-if="itemc.tags">
                      <el-tag
                        v-for="tag in itemc.tags"
                        :key="tag.name"
                        closable
                        :type="tag.type"
                      >{{tag.name}}</el-tag>
                    </span>
                    <el-input
                      v-model="itemc.val"
                      :placeholder="index==4?'元/平':'请输入'+itemc.name"
                      v-if="indexc!=2"
                    ></el-input>
                    <el-input v-model="itemc.detail" placeholder="价格描述" v-if="indexc==5"></el-input>
                  </span>
                </template>
              </span>
            </div>
            <i class="el-icon-remove"></i>
          </span>
        </div>
      </div>
      <!--  -->
      <div class="chaozuo">
        <el-button class="hui" size="small">保存</el-button>
        <el-button type="primary" size="small">确认发布</el-button>
      </div>
    </div>

    <!--  -->
    <div class="bgContant2" v-show="showDoor==2">
      <!--  -->
      <div class="nationT">
        <el-checkbox v-model="checked"></el-checkbox>
        <span class="name">车位详情</span>
        <span class="status">车位状态</span>
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <i class="el-icon-timer"></i>
        <span class="timeLost">
          倒计时
          {{lostTime}}
        </span>

        <el-button size="small" @click="showDoor=0" type="primary" plain>返回</el-button>
      </div>
      <!--  -->
      <div class="parkInfo">
        <div class="nav">
          <span class="name">房屋信息</span>
          <span class="val">
            <i class="el-icon-edit-outline"></i>
            编辑
          </span>
        </div>
        <div class="contant">
          <span class="child big">
            <span class="name">{{parkInfo[0].name}}</span>
            <span class="val img">
              <img :src="item" v-for="(item,index) in parkInfo[0].img" :key="index" />
            </span>
          </span>
          <template v-for="(item,index) in parkInfo">
            <span :class="['child',index==1||index==4?'childBig':'']" :key="index" v-if="index">
              <span class="name">{{item.name}}</span>
              <span class="tabList" v-if="item.tags">
                <el-tag
                  v-for="tag in item.tags"
                  :key="tag.name"
                  closable
                  :type="tag.type"
                >{{tag.name}}</el-tag>
              </span>
              <el-input
                v-model="item.val"
                :placeholder="index==4?'元/个':'请输入'+item.name"
                v-if="index!=2"
              ></el-input>
              <el-input v-model="item.detail" placeholder="价格描述" v-if="index==4"></el-input>
            </span>
          </template>
        </div>
      </div>
      <!--  -->
      <div class="nationT borderBlue">
        <span class="name">联系方式</span>
      </div>
      <div class="callContant">
        <span class="child" v-for="(item,index) in callList" :key="index">
          <span class="name">{{item.name}}</span>
          <el-input v-model="item.val"></el-input>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lostTime: "26 : 59 : 59",
      checked: false,
      showDoor: 2,
      people: "",
      roomId: "",
      multipleSelection: "",
      currentPage4: 1,
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
      status: "",
      statusList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      tableData: [
        {
          img: require("../../../static/bg.jpg"),
          id: "1栋",
          name: "负一层",
          idCard: 16,
          phone: "50000元/位",
          lou: "已发布",
          root: "已发布",
          time: "2020-06-12  12:30",

          room: "活动中",
        },
        {
          img: require("../../../static/bg.jpg"),
          id: "1栋",
          name: "负一层",
          idCard: 16,
          phone: "50000元/位",
          lou: "已发布",
          root: "已发布",
          time: "2020-06-12  12:30",

          room: "活动中",
        },
      ],
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
      releaPark: [
        {
          choose: false,
          info: [
            {
              name: "车位图",
              val: "",
              data: "",
            },
            {
              name: "车位标题",
              val: "",
              data: "",
            },
            {
              name: "标签",
              tags: [
                {
                  name: "标签一",
                  type: "",
                },
                {
                  name: "标签二",
                  type: "",
                },
              ],
            },
            {
              name: "楼号",
              val: "",
              data: "",
            },
            {
              name: "车位号",
              val: "",
              data: "",
            },
            {
              name: "价格",
              val: "",
              data: "",
              detail: "",
            },
            {
              name: "楼层",
              val: "",
              data: "",
            },
            {
              name: "微信号",
              val: "",
              data: "",
            },
            {
              name: "咨询电话",
              val: "",
              data: "",
            },
          ],
        },
      ],
      //
      parkInfo: [
        {
          name: "车位图",
          img: [
            require("../../../static/bg.jpg"),
            require("../../../static/bg.jpg"),
            require("../../../static/bg.jpg"),
          ],
        },
        {
          name: "车位标题",
          val: "元邦明月翡翠1栋地下停车场A区15",
          data: "",
        },
        {
          name: "标签",
          val: "",
          tags: [
            {
              name: "标签一",
              type: "",
            },
            {
              name: "标签二",
              type: "",
            },
          ],
          data: "",
        },
        {
          name: "小区",
          val: "元邦山清水秀",
          data: "",
        },
        {
          name: "价格",
          val: "50000",
          detail: "单独位,近电梯",
          data: "",
        },
        {
          name: "楼层",
          val: "负二楼",
          data: "",
        },
        {
          name: "车位号",
          val: "15",
          data: "",
        },
        {
          name: "车位类型",
          val: "单独车位",
          data: "",
        },
      ],
      callList: [
        {
          name: "咨询微信号",
          val: "13355558888",
          data: "",
        },
        {
          name: "咨询电话 ",
          val: "13355558888",
          data: "",
        },
      ],
    };
  },
  methods: {
    handleEdit(a, b) {
      this.showDoor = 2;
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
    addFN() {
      this.releaPark.push({
        choose: false,
        info: [
          {
            name: "车位图",
            val: "",
            data: "",
          },
          {
            name: "车位标题",
            val: "",
            data: "",
          },
          {
            name: "标签",
            tags: [
              {
                name: "标签一",
                type: "",
              },
              {
                name: "标签二",
                type: "",
              },
            ],
          },
          {
            name: "楼号",
            val: "",
            data: "",
          },
          {
            name: "车位号",
            val: "",
            data: "",
          },
          {
            name: "价格",
            val: "",
            data: "",
            detail: "",
          },
          {
            name: "楼层",
            val: "",
            data: "",
          },
          {
            name: "微信号",
            val: "",
            data: "",
          },
          {
            name: "咨询电话",
            val: "",
            data: "",
          },
        ],
      });
    },
  },
};
</script>

<style lang="less">
#fuDirSale {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);

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
  .bgContant2 {
    height: 100%;
    display: flex;
    // align-items: center;
    flex-direction: column;
    overflow: hidden;
    .overAuto {
      flex: 1;
      overflow: auto;
    }
    .chaozuo {
      border-top: 1px solid rgb(228, 228, 228);
      padding: 10px 0;
      text-align: center;
      .el-button {
        margin: 0 50px;
        width: 100px;
        font-size: 14px;
      }
      .hui {
        background: #aeb7c1;
        color: #fff;
      }
    }
    .el-icon-circle-plus {
      color: #f8af43;
      font-size: 22px;
      margin-right: 20px;
      flex: 1;
    }
    .nationT {
      display: flex;
      align-items: center;
      padding: 15px 40px;
      box-sizing: border-box;

      .name {
        font-size: 20px;
        font-weight: bold;
        // flex: 1;
        margin: 0 20px;
      }
      .el-button {
        border-radius: 6px;
        border: 1px solid rgba(71, 153, 247, 1);

        font-size: 16px;
        width: 100px;
      }
      .status {
        font-weight: bold;
        font-size: 16px;
        margin-right: 20px;
        margin-left: 30px;
      }
      .el-icon-timer {
        font-size: 22px;
        margin: 0 10px;
      }
      .timeLost {
        flex: 1;
        color: #666;
      }
    }
    .list {
      display: flex;
      align-items: center;
      padding: 10px 40px;
      .conFlex {
      }
      .el-icon-remove {
        font-size: 22px;
        color: rgba(207, 207, 207, 1);
        margin-left: 20px;
      }
      .contant {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
        flex: 1;
        margin-left: 20px;
        padding: 20px 20px 20px 0;
        display: flex;
        align-items: center;
        .flex {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .el-input {
            flex: 1;
          }
          .name {
            margin-right: 20px;
            width: 80px;
            text-align: right;
            font-weight: bold;
          }
          .child {
            width: 23%;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
          }
          .childBig {
            width: 31%;
          }
        }
        .tabList {
          border: 1px solid rgb(236, 236, 236);
          padding: 5px 10px;
          border-radius: 5px;
          flex: 1;
          .el-tag {
            margin-right: 10px;
          }
        }
        .img {
          margin-bottom: 20px;
          .el-input {
            margin-right: 20px;
            width: 300px !important;
            flex: none;
          }
        }
      }
    }
    //
    .borderBlue {
      .name {
        margin: 0;
        padding: 0 20px;
        border-left: 5px solid rgba(71, 153, 247, 1);
      }
    }
    //
    .callContant {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid rgb(240, 240, 240);
      margin: 0 35px;
      .child {
        width: 30%;
        padding: 20px 20px 0;
        display: flex;
        align-items: baseline;
        .el-input {
          flex: 1;
        }
        .name {
          width: 80px;
          text-align: right;
          margin-right: 20px;
        }
      }
    }
    //
    .parkInfo {
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
    }
    .contant {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-bottom: 20px;
      .child {
        display: flex;
        align-items: baseline;
        width: 30%;
        padding: 20px 20px 0;
        .img {
          > img {
            margin-right: 20px;
            height: 80px;
            margin-bottom: 20px;
          }
        }
        .el-input {
          flex: 1;
        }
        .name {
          width: 80px;
          text-align: right;
          margin-right: 20px;
        }
        .tabList {
          border: 1px solid rgb(236, 236, 236);
          padding: 5px 10px;
          border-radius: 5px;
          flex: 1;
          .el-tag {
            margin-right: 10px;
          }
        }
      }
      .childBig {
        width: 40%;
      }
      .big {
        width: 100%;
      }
    }
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
        // width: 100px;
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
      width: 110px;
    }
  }

  //
}
</style>