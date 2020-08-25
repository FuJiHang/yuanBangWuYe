<!--
 * @Author: fujihang
 * @Date: 2020-07-21 11:59:45
 * @LastEditors: your name
 * @LastEditTime: 2020-08-03 16:29:12
 * @Description: 用户管理
--> 

<template>
  <div id="fuUserMana">
    <div class="bgContant" v-show="showUser">
      <div class="chooseList">
        <span class="child">
          <span class="name">姓名</span>
          <el-input v-model="name" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">电话</span>
          <el-input v-model="phone" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">楼栋</span>
          <span class="val">
            <el-select v-model="room" placeholder="请选择">
              <el-option
                v-for="item in roomList"
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
          用户管理
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary" size="small" class="hui">修改</el-button>
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
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="val" label="账号" align="center"></el-table-column>

          <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
          <el-table-column prop="tung" label="楼盘" align="center"></el-table-column>
          <el-table-column prop="join" label="身份" align="center"></el-table-column>
          <el-table-column prop="time" label="注册时间" align="center"></el-table-column>
          <el-table-column prop="status" label="账户状态" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <i :class="[scope.row.suo?'el-icon-unlock':'el-icon-lock']"></i>
              <!-- el-icon-unlock -->
              <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
    <div class="bgContant2" v-show="!showUser">
      <div class="noticeT">
        <span class="name">用户详情</span>
        <span class="flex">
          账户状态
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in listStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
        </span>
        <el-button size="small" @click="showUser=true">返回</el-button>
      </div>
      <div class="info">
        <div class="nav">
          <span class="name">用户信息</span>
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
      <!--  -->
      <div class="noticeT">
        <span class="name">绑定信息</span>
      </div>
      <el-tabs v-model="activeInfo" type="card" @tab-click="handleClick">
        <el-tab-pane
          :label="item.name"
          :name="'index'+index"
          v-for="(item,index) in infoList"
          :key="index"
        >
          <!--  -->
          <div v-show="activeInfo=='index'+index">
            <div class="fcList" v-for="(itemc,indexc) in item.list" :key="indexc">
              <img :src="itemc.img" />
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
                    <span class="val">{{items.val}}</span>
                  </span>
                </div>
              </span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--  -->
      <div class="noticeT">
        <span class="name">个人记录</span>
      </div>
      <div class="detail">
        <span class="name"></span>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            :label="item.name"
            :name="'index'+index"
            v-for="(item,index) in funList"
            :key="index"
          >
            <div class="chooseList chooseMB">
              <span
                class="child"
                v-show="activeName=='index3'||activeName=='index0'||activeName=='index5'"
              >
                <span class="name">工单类型</span>
                <span class="val">
                  <el-select v-model="vill" placeholder="请选择">
                    <el-option
                      v-for="item in villList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </span>
              <span class="child">
                <span class="name">房号</span>
                <span class="val">
                  <el-select v-model="room" placeholder="请选择">
                    <el-option
                      v-for="item in roomList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </span>
              <el-date-picker v-model="dateChoose" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <!--  -->

            <div class="tableWork">
              <!-- 工单 -->
              <el-table
                v-show="activeName=='index0'"
                :data="orderList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="ser" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
                <el-table-column prop="roomId" label="房号" align="center"></el-table-column>
                <el-table-column prop="join" label="身份" align="center"></el-table-column>
                <el-table-column prop="order" label="工单类型" align="center"></el-table-column>
                <el-table-column prop="detail" label="事由" align="center"></el-table-column>
                <el-table-column prop="time" label="发起时间" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 预存记录 -->
              <el-table
                v-show="activeName=='index1'"
                :data="rewordList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="ser" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
                <el-table-column prop="roomId" label="房号" align="center"></el-table-column>
                <el-table-column prop="join" label="身份" align="center"></el-table-column>
                <el-table-column prop="money" label="预存金额" align="center"></el-table-column>
                <el-table-column prop="time" label="预存时间" align="center"></el-table-column>
                <el-table-column prop="pay" label="支付方式" align="center"></el-table-column>
              </el-table>
              <!-- 缴费记录 -->
              <el-table
                v-show="activeName=='index2'"
                :data="payList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="ser" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
                <el-table-column prop="roomId" label="房号" align="center"></el-table-column>
                <el-table-column prop="join" label="身份" align="center"></el-table-column>
                <el-table-column prop="money" label="缴纳金额" align="center"></el-table-column>
                <el-table-column prop="detail" label="缴纳费项" align="center"></el-table-column>
                <el-table-column prop="month" label="产生月份" align="center"></el-table-column>
                <el-table-column prop="time" label="缴纳时间" align="center"></el-table-column>
                <el-table-column prop="pay" label="支付方式" align="center"></el-table-column>
              </el-table>
              <!-- 预约记录 -->
              <el-table
                v-show="activeName=='index3'"
                :data="appList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="ser" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
                <el-table-column prop="roomId" label="房号" align="center"></el-table-column>
                <el-table-column prop="join" label="身份" align="center"></el-table-column>
                <el-table-column prop="project" label="预约项目" align="center"></el-table-column>
                <el-table-column prop="people" label="来访人数" align="center"></el-table-column>
                <el-table-column prop="car" label="车牌号码" align="center"></el-table-column>
                <el-table-column prop="muDi" label="来访目的" align="center"></el-table-column>
                <el-table-column prop="time" label="预约时间" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
              </el-table>
              <!-- 积分明细 -->
              <el-table
                v-show="activeName=='index4'"
                :data="inteList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="ser" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
                <el-table-column prop="roomId" label="房号" align="center"></el-table-column>
                <el-table-column prop="join" label="身份" align="center"></el-table-column>
                <el-table-column prop="inte" label="使用积分" align="center"></el-table-column>
                <el-table-column prop="good" label="兑换物品" align="center"></el-table-column>
                <el-table-column prop="time" label="兑换时间" align="center"></el-table-column>
              </el-table>
              <!-- 反馈/建议 -->
              <el-table
                v-show="activeName=='index5'"
                :data="feedList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="ser" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
                <el-table-column prop="roomId" label="房号" align="center"></el-table-column>
                <el-table-column prop="join" label="身份" align="center"></el-table-column>
                <el-table-column prop="type" label="反馈类型" align="center"></el-table-column>
                <el-table-column prop="feed" label="反馈内容" align="center"></el-table-column>
                <el-table-column prop="time" label="反馈时间" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
              </el-table>
              <!--  -->
              <el-pagination
                
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                
                
                layout="prev, pager, next, jumper"
                :total="400"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUser: true,
      activeName: "index5",
      edit: true,
      activeInfo: "index0",
      multipleSelection: [],
      currentPage4: 1,
      name: "",
      phone: "",
      room: "",
      vill: "",
      dateChoose: "",
      time: "",
      listStatus: [
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
      villList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "黄金糕",
        },
        {
          value: "选项3",
          label: "黄金糕",
        },
      ],
      roomList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "黄金糕",
        },
        {
          value: "选项3",
          label: "黄金糕",
        },
      ],
      tableData: [
        {
          name: "王鸿",
          val: "13344449999",
          phone: "13322228888",
          tung: "元邦山清水秀",
          join: "业主",
          time: "2020-06-12",
          status: "正常",
          suo: true,
        },
        {
          name: "王鸿",
          val: "13344449999",
          phone: "13322228888",
          tung: "元邦山清水秀",
          join: "业主",
          time: "2020-06-12",
          status: "正常",
          suo: false,
        },
        {
          name: "王鸿",
          val: "13344449999",
          phone: "13322228888",
          tung: "元邦山清水秀",
          join: "业主",
          time: "2020-06-12",
          status: "正常",
          suo: false,
        },
      ],
      orderList: [
        {
          ser: 1,
          name: "王鸿",
          phone: "13322228888",
          roomId: "1栋1单元0205",
          join: "业主",
          order: "室内报修",
          detail: "洗手池堵塞,无法下水",
          time: "2020-06-12",
          status: "待接单",
        },
      ],
      rewordList: [
        {
          ser: 1,
          name: "王鸿",
          phone: "13322228888",
          roomId: "1栋1单元0205",
          join: "业主",
          money: "￥100",
          time: "2020-06-12",
          pay: "微信支付",
        },
      ],
      payList: [
        {
          ser: 1,
          name: "王鸿",
          phone: "13322228888",
          roomId: "1栋1单元0205",
          join: "业主",
          money: "￥100",
          detail: "物业管理费250元;垃圾清理费0.45元",
          month: "6月",
          time: "2020-06-12",
          pay: "微信支付",
        },
      ],
      appList: [
        {
          ser: 1,
          name: "王鸿",
          phone: "13322228888",
          roomId: "1栋1单元0205",
          join: "业主",
          project: "车位预约",
          people: "3人",
          car: "粤A 888888",
          muDi: "探访",
          time: "2020-06-12",
          status: "进行中",
        },
      ],
      inteList: [
        {
          ser: 1,
          name: "王鸿",
          phone: "13322228888",
          roomId: "1栋1单元0205",
          join: "业主",
          inte: "-1000",
          good: "物业缴费10元抵扣",
          time: "2020-06-12",
        },
      ],
      feedList: [
        {
          ser: 1,
          name: "王鸿",
          phone: "13322228888",
          roomId: "1栋1单元0205",
          join: "业主",
          type: "反馈类型",
          feed: "反馈内容",
          time: "2020-06-12",
          status: "未查看",
        },
      ],
      info: [
        {
          name: "姓名:",
          val: "王鸿",
          data: "",
        },
        {
          name: "账号:",
          val: "1333333",
          data: "",
        },
        {
          name: "电话号码:",
          val: "13344449999",
          data: "",
        },
        // {
        //   name: "电话:",
        //   val: "020-44449999",
        //   data: "",
        // },
        {
          name: "注册时间:",
          val: "2020-06-12",
          data: "",
        },
        {
          name: "身份:",
          val: "业主",
          data: "",
        },
        {
          name: "楼盘:",
          val: "元邦山清水秀花园1栋205",
          data: "",
        },
        // {
        //   name: "邮箱:",
        //   val: "377789999@qq.com",
        //   data: "",
        // },
        // {
        //   name: "国籍:",
        //   val: "中国",
        //   data: "",
        // },
        {
          name: "预存款:",
          val: "¥2000",
          data: "",
        },
        {
          name: "积分:",
          val: "2000",
          data: "",
        },
        // {
        //   name: "身份证号:",
        //   val: "420122199001010226",
        //   data: "",
        // },
      ],

      funList: [
        {
          name: "工单",
        },
        {
          name: "预存记录",
        },
        {
          name: "缴费记录",
        },
        {
          name: "预约记录",
        },
        {
          name: "积分明细",
        },
        {
          name: "反馈/建议",
        },
      ],
      infoList: [
        {
          name: "房产信息",
          list: [
            {
              name: "1栋 1单元 0205",
              img: require("../../../static/20140816114432535.png"),
              show: false,
              det: [
                {
                  name: "地址",
                  val: "广州市花都山前大道1242号",
                  data: "",
                },
                {
                  name: "购买日期",
                  val: "2020年6月12日",
                  data: "",
                },
                {
                  name: "交房日期",
                  val: "2020年6月12日",
                  data: "",
                },
                {
                  name: "房屋面积",
                  val: "单独车位",
                  data: "",
                },
                {
                  name: "成交金额",
                  val: "86平方米",
                  data: "",
                },
                {
                  name: "产权期限",
                  val: "70年",
                  data: "",
                },
                {
                  name: "合同编号",
                  val: "111122223333",
                  data: "",
                },
                {
                  name: "经办人",
                  val: "王小二",
                  data: "",
                },
                {
                  name: "经办人电话",
                  val: "13344445555",
                  data: "",
                },
              ],
            },
          ],
        },
        {
          name: "商铺信息",
          list: [
            {
              name: "1栋 1单元 0205",
              img: require("../../../static/20140816114432535.png"),
              show: false,
              det: [
                {
                  name: "地址",
                  val: "广州市花都山前大道1242号",
                  data: "",
                },
                {
                  name: "购买日期",
                  val: "2020年6月12日",
                  data: "",
                },
                {
                  name: "交房日期",
                  val: "2020年6月12日",
                  data: "",
                },
                {
                  name: "房屋面积",
                  val: "单独车位",
                  data: "",
                },
                {
                  name: "成交金额",
                  val: "86平方米",
                  data: "",
                },
                {
                  name: "产权期限",
                  val: "70年",
                  data: "",
                },
                {
                  name: "合同编号",
                  val: "111122223333",
                  data: "",
                },
                {
                  name: "经办人",
                  val: "王小二",
                  data: "",
                },
                {
                  name: "经办人电话",
                  val: "13344445555",
                  data: "",
                },
              ],
            },
          ],
        },
        {
          name: "车位信息",
          list: [
            {
              name: "1栋15",
              img: require("../../../static/20140816114432535.png"),
              show: false,
              det: [
                {
                  name: "车牌号",
                  val: "粤A 888888",
                  data: "",
                },
                {
                  name: "购买日期",
                  val: "2020年6月12日",
                  data: "",
                },
                {
                  name: "楼层",
                  val: "负二层",
                  data: "",
                },
                {
                  name: "车位类型",
                  val: "单独车位",
                  data: "",
                },
                {
                  name: "成交金额",
                  val: "280万",
                  data: "",
                },
                {
                  name: "产权期限",
                  val: "70年",
                  data: "",
                },
                {
                  name: "合同编号",
                  val: "111122223333",
                  data: "",
                },
                {
                  name: "经办人",
                  val: "王小二",
                  data: "",
                },
                {
                  name: "经办人电话",
                  val: "13344445555",
                  data: "",
                },
              ],
            },
          ],
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
    handleEdit() {
      this.showUser = false;
    },
        handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less">
#fuUserMana {
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
        width: 70px;
      }
      .el-input__inner {
        font-size: 16px;
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
    thead tr th {
      background: rgba(246, 246, 246, 1);
    }
    .el-table {
      height: 100%;
      .el-icon-unlock,
      .el-icon-lock {
        font-size: 20px;
        margin-right: 10px;
      }
      .el-icon-lock {
        color: red;
      }
      .cell {
        display: flex;
        align-items: center;
        justify-content: center;
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
    margin: 20px 29px;
    border-left: 6px solid #4799f7;
    padding-left: 20px;
    .name {
      font-size: 22px;
      font-weight: bold;
    }
    .flex {
      flex: 1;
      margin-left: 30px;
      font-size: 16px;
      .el-select {
        margin: 0 20px;
      }
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
        margin: 0 21px 26px;
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
          font-weight: bold;
        }
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
  //
  .detail {
    display: flex;
    align-items: center;
    .is-disabled {
      font-size: 18px;
      color: #4799f7;
      // border-right: 1px solid rgb(218, 218, 218);
      font-weight: bold;
    }
    .is-disabled::after {
      content: "";
      position: absolute;
      right: 0;
      top: 10px;
      width: 1px;
      height: 20px;
      background: #e4e4e4;
    }
    .el-tabs {
      width: 100%;
      margin: 0 50px;
    }
  }
  .bgContant2 {
    height: 100%;
    overflow: auto;
  }
}
</style>