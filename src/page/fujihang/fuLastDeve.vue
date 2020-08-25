<!--
 * @Author: fujihang
 * @Date: 2020-07-24 16:23:36
 * @LastEditors: your name
 * @LastEditTime: 2020-08-05 11:01:52
 * @Description: 最新楼盘
--> 

<template>
  <div id="fuLastDeve">
    <div class="bgContant" v-show="showDoor==0">
      <div class="chooseList">
        <span class="child">
          <span class="name">楼盘</span>
          <el-select v-model="sale" placeholder="请选择">
            <el-option
              v-for="item in saleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="child">
          <span class="name">楼盘性质</span>
          <el-select v-model="nature" placeholder="请选择">
            <el-option
              v-for="item in natureList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="child">
          <span class="name">发布时间</span>
          <el-select v-model="time" placeholder="请选择">
            <el-option
              v-for="item in timeList"
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
          最新楼盘
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small" plain>新增</el-button>
          <el-button type="primary" size="small" plain>批量删除</el-button>
          <el-button type="primary" size="small" plain @click="showDoor=2">历史楼盘</el-button>
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
          <el-table-column label="首图" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="shouye" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="楼盘名称" align="center"></el-table-column>
          <el-table-column prop="depart" label="楼盘性质" align="center"></el-table-column>
          <el-table-column prop="status" label="发布状态" align="center"></el-table-column>
          <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                :type="scope.$index==0?'danger':''"
              >{{scope.$index==0?'取消置顶':'置顶'}}</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">查看</el-button>
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
    <div class="bgContant" v-show="showDoor==1">
      <div class="bgContant3">
        <div class="infoList">
          <span class="child" v-for="(item,index) in infoList" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="flex" v-if="index!=2&&index!=8">
              <span class="input">
                <input v-model="item.val" />
              </span>
              <span class="park">{{item.del}}</span>
            </span>
            <span class="flex2" v-if="index==2">
              <span class="contant">
                <el-tag
                  v-for="tag in item.tags"
                  :key="tag.name"
                  closable
                  :type="tag.type"
                >{{tag.name}}</el-tag>
              </span>
              <img src="/static/arrow.png" />
            </span>
            <el-date-picker v-if="index==8" v-model="item.val" type="date" placeholder="选择日期"></el-date-picker>
            <span class="flex3" v-if="index==10">
              <img src />
              {{item.val}}
            </span>
          </span>
        </div>
        <!--  -->
        <div class="news">
          <span class="name">楼盘动态资讯</span>
          <span class="contant">
            <div>
              <el-select v-model="classfiy" placeholder="请选择">
                <el-option
                  v-for="item in classfiyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="textarea">
              <el-input type="textarea " placeholder="编辑资讯内容…"></el-input>
            </div>
          </span>
        </div>
        <!--  -->
        <div class="intro">
          <span class="name">楼盘动态资讯</span>
          <span class="contant">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                :label="item.name"
                :name="'index'+index"
                v-for="(item,index) in introList"
                :key="index"
              >
                <div class="navTop">
                  <i class="el-icon-circle-plus" @click="addAlert=true"></i>
                  <span
                    :class="['tab',index==0?'flex1':'']"
                    v-for="(item,index) in navTop"
                    :key="index"
                  >{{item.name}}</span>
                </div>
                <div class="list" v-for="(item,index) in introData" :key="index">
                  <span
                    :class="['child',indexs=='id'?'flex1':'']"
                    v-for="(items,indexs) in item"
                    :key="indexs"
                  >{{items}}</span>
                  <span class="flex2">
                    修改
                    <i class="el-icon-remove"></i>
                  </span>
                </div>
              </el-tab-pane>
            </el-tabs>
          </span>
        </div>
        <!--  -->
        <div class="address">
          <span class="name">位置及周边配套</span>
          <span class="contant">
            <div class="list">
              <span class="child">
                <span class="name">位置</span>
                <span class="val">
                  <v-distpicker hide-area :province="select.province" :city="select.city"></v-distpicker>
                  <el-input></el-input>
                </span>
              </span>
              <span class="child">
                <span class="name">周边配套</span>
                <span class="val">
                  <el-input></el-input>
                </span>
              </span>
            </div>
            <div class="list">
              <span class="child">
                <span class="name">标签</span>
                <span class="val tabList">
                  <span class="tab" v-for="(item,index) in labelList" :key="index">{{item}}</span>
                  <i class="el-icon-circle-plus"></i>
                </span>
              </span>
            </div>
          </span>
        </div>
        <!--  -->
        <div class="tungView">
          <span class="name">楼盘实景</span>
          <span class="contant">
            <img src />

            <span class="add">+</span>
            <span class="val">0/9</span>
          </span>
        </div>
      </div>

      <!--  -->
      <div class="chaozuo">
        <el-button class="hui" size="small">保存</el-button>
        <el-button type="primary" size="small">确认修改</el-button>
      </div>
    </div>

    <!--  -->
    <div class="bgContant bgContant2" v-show="showDoor==2">
      <div class="chooseList">
        <span class="child">
          <span class="name">楼盘</span>
          <el-select v-model="sale" placeholder="请选择">
            <el-option
              v-for="item in saleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="child">
          <span class="name">楼盘性质</span>
          <el-select v-model="nature" placeholder="请选择">
            <el-option
              v-for="item in natureList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="child">
          <span class="name">发布时间</span>
          <el-select v-model="time" placeholder="请选择">
            <el-option
              v-for="item in timeList"
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
          历史楼盘
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
      </span>
      <!--  -->

      <div class="tableWork">
        <el-table
          :data="tableData2"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="首图" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="shouye" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="楼盘名称" align="center"></el-table-column>
          <el-table-column prop="depart" label="楼盘性质" align="center"></el-table-column>
          <el-table-column prop="status" label="发布状态" align="center"></el-table-column>
          <el-table-column prop="time" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
              >查看详情</el-button>
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
    <!--  -->
    <el-dialog title="添加进度" :visible.sync="addAlert">
      <div class="list">
        <span class="child">
          <span class="name">分类</span>
          <el-select v-model="jCChoose" placeholder="请选择">
            <el-option
              v-for="item in jCList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div class="list">
        <span class="child">
          <span class="name">资讯标题</span>
          <el-input v-model="jcTitle"></el-input>
        </span>
      </div>
      <div class="help">
        <span class="name">资讯内容</span>
        <textarea v-model="jcContant"></textarea>
      </div>
      <div class="btn">
        <el-button type="primary" size="small">确定发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  data() {
    return {
      addAlert: false,
      jcTitle: "",
      jcContant: "",
      jCChoose: "",
      jCList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      select: { province: "广东省", city: "广州市" },
      navTop: [
        {
          name: "序号",
        },
        {
          name: "格局",
        },
        {
          name: "建面",
        },
        {
          name: "朝向",
        },
        {
          name: "价格",
        },
        {
          name: "户型图",
        },
      ],
      activeName: "index0",
      introList: [
        {
          name: "一居室(3)",
        },
        {
          name: "二居室",
        },
        {
          name: "三居室",
        },
        {
          name: "四居室",
        },
      ],
      introData: [
        {
          id: 1,
          name: "一室一厅一卫",
          addr: "40平",
          fx: "北",
          price: "200万/套",
          img: "91894-8699.jpg",
        },
      ],
      showDoor: 1,
      multipleSelection: [],
      currentPage4: 1,
      seach: "",
      time: "",
      timeList: [
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
      ],
      classfiyList: [
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
      ],
      classfiy: "",
      tableData: [
        {
          img: require("../../../static/20140816114432535.png"),
          name: "元邦·明月翡翠",
          depart: "住宅",
          status: "已发布",
          time: "2020-5-5",
        },
        {
          img: require("../../../static/20140816114432535.png"),
          name: "元邦·明月翡翠",
          depart: "住宅",
          status: "已发布",
          time: "2020-5-5",
        },
      ],
      tableData2: [
        {
          img: require("../../../static/20140816114432535.png"),
          name: "元邦·明月翡翠",
          depart: "住宅",
          status: "已发布",
          time: "2020-5-5",
        },
        {
          img: require("../../../static/20140816114432535.png"),
          name: "元邦·明月翡翠",
          depart: "住宅",
          status: "已发布",
          time: "2020-5-5",
        },
      ],
      infoList: [
        {
          name: "楼盘名称",
          data: "",
          val: "",
          del: "",
        },
        {
          name: "楼盘描述",
          data: "",
          val: "",
          del: "",
        },
        {
          name: "标签",
          data: "",
          val: "",
          del: "",
          tags: [
            { name: "标签一", type: "" },
            { name: "标签二", type: "success" },
            { name: "标签三", type: "info" },
            { name: "标签四", type: "warning" },
            { name: "标签五", type: "danger" },
          ],
        },
        {
          name: "均价",
          data: "",
          val: "",
          del: "元/平",
        },
        {
          name: "总价",
          data: "",
          val: "",
          del: "元/平",
        },
        {
          name: "用途",
          data: "",
          val: "",
          del: "",
        },
        {
          name: "建面",
          data: "",
          val: "",
          del: "平",
        },
        {
          name: "户型",
          data: "",
          val: "",
          del: "居室",
        },
        {
          name: "开盘",
          data: "",
          val: "",
          del: "",
        },
        {
          name: "楼盘销量",
          data: "",
          val: "",
          del: "",
        },
        {
          name: "地址",
          data: "",
          val: "",
          del: "",
        },
        {
          name: "在线咨询电话",
          data: "",
          val: "",
          del: "",
        },
      ],
      sale: "",
      saleList: [
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
      ],
      nature: "",
      natureList: [
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
      ],
      labelList: ["地铁", "公交", "商场", "医院", "银行"],
    };
  },
  methods: {
    handleEdit(a, b) {
      this.showDoor = 1;
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSelected(data) {
      console.log(data, "========");
    },
  },
};
</script>

<style lang="less">
#fuLastDeve {
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
      }
      .el-input__inner {
        flex: 1;
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
      font-size: 16px;
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
      width: 120px;
    }
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
  //
  .bgContant3 {
    flex: 1;
    overflow: auto;

    .news {
      border-bottom: 2px dotted #e6e6e6;
      padding-bottom: 30px;
      margin: 0 60px;
      display: flex;
      align-items: baseline;
      font-weight: bold;
      .name {
        margin-left: 30px;
        margin-right: 35px;
      }
      .textarea {
        .el-input {
          width: 600px;
        }
      }
      .el-input {
        margin-top: 30px;
      }
    }
    .el-icon-circle-plus {
      color: #f8af43;
      font-size: 18px;
      margin-right: 20px;
    }
    .intro {
      margin: 10px 90px;
      display: flex;
      align-items: baseline;
      font-weight: bold;
      .name {
        margin-right: 35px;
      }
      .contant {
        flex: 1;

        .navTop {
          display: flex;
          align-items: center;
          color: #909399;
          border-bottom: 1px solid rgb(230, 230, 230);
          padding-bottom: 15px;
          .tab {
            flex: 2;
          }
        }
        .list {
          display: flex;
          align-items: center;
          margin-left: 40px;
          .child {
            padding: 10px 0;
            flex: 2;
            color: #606266;
          }
        }
        .flex2 {
          color: #e6a23c;
          display: flex;
          align-items: center;
        }
        .el-icon-remove {
          color: #f8af43;
          font-size: 18px;
          margin-left: 10px;
        }
        .flex1 {
          flex: 1 !important;
        }
      }
    }
    //
    .address {
      margin: 10px 80px;
      display: flex;
      align-items: baseline;
      .name {
        font-weight: bold;
      }
      .contant {
        flex: 1;
        margin-left: 30px;
        .distpicker-address-wrapper {
          display: flex;
          align-items: center;
        }
        .list {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .child {
          display: flex;
          align-items: center;
          width: 50%;
          .name {
            color: #1989fa;
          }
          .val {
            margin-left: 20px;
            display: flex;
            align-items: center;
          }
        }
        .tabList {
          padding: 10px 0;
          border-bottom: 1px solid rgb(236, 236, 236);
          .tab {
            padding: 0 20px;
          }
        }
      }
    }
    //
    .tungView {
      display: flex;
      // align-items: center;
      margin: 10px 120px;
      .name {
        font-weight: bold;
      }
      .contant {
        flex: 1;
        margin-left: 30px;
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        .add {
          text-align: center;
          line-height: 80px;
          font-size: 60px;
          height: 80px;
          width: 80px;
          border: 1px solid rgb(226, 226, 226);
          color: #999;
          margin-bottom: 20px;
        }
        .val {
          color: #66b44a;
          font-size: 16px;
          margin-left: 10px;
          margin-bottom: 20px;
        }
        > img {
          height: 80px;
          width: 80px;
          object-fit: cover;
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
    }

    //
    .infoList {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: 20px 60px 0;
      box-sizing: border-box;
      border-bottom: 2px dotted rgb(230, 230, 230);
      .child {
        margin: 0 20px 30px;
        width: calc(33.33% - 40px);
        display: flex;
        align-items: center;
        box-sizing: border-box;

        .name {
          font-weight: bold;
          width: 90px;
          text-align: right;
        }
        .flex {
          margin-left: 40px;
          flex: 1;
          border: 1px solid rgb(235, 235, 235);
          border-radius: 5px;
          display: flex;
          align-items: center;
          padding: 10px 20px;
          box-sizing: border-box;
          //   padding: 10px 0;
          .input {
            flex: 1;
            > input {
              width: 100%;
            }
          }

          .park {
            margin: 0 10px;
          }
        }
        .flex2 {
          margin-left: 40px;
          display: flex;
          align-items: center;
          flex: 1;
          border: 1px solid rgb(235, 235, 235);
          padding: 5px;
          .contant {
            flex: 1;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .el-tag {
              margin: 0 10px 10px 0;
            }
          }
          > img {
            margin: 0 5px;
            height: 20px;
            filter: grayscale(100%);
          }
        }
        .el-date-editor {
          flex: 1;
          margin-left: 40px;
        }
      }
    }
  }

  //
  .el-dialog {
    .name {
      text-align: right;
      width: 100px;
      margin-right: 20px;
    }
    .list {
      display: flex;

      margin-bottom: 20px;
      .child {
        display: flex;
        align-items: center;
      }
    }
    .el-input {
      flex: 1;
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
        font-size: 14px;
        width: 110px;
      }
    }
  }
}
</style>