<!--
 * @Author: fujihang
 * @Date: 2020-07-21 11:59:45
 * @LastEditors: your name
 * @LastEditTime: 2020-08-22 11:27:03
 * @Description: 业主用户信息
--> 

<template>
  <div id="fuUserInfo">
    <div class="bgContant" v-show="showUser">
      <div class="chooseList">
        <span class="child">
          <span class="name">业主姓名</span>
          <el-input v-model="name" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">电话号码</span>
          <el-input v-model="account" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">身份</span>
          <span class="val">
            <el-select v-model="identity" placeholder="请选择" clearable>
              <el-option
                v-for="item in identityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </span>
        <span class="child">
          <span class="name">已绑定账户状态</span>
          <span class="val">
            <el-select v-model="status" placeholder="请选择" clearable>
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </span>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          业主用户管理
          <span class="mini">
            共
            <span class="blue">{{total}}</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" @click="getData()" />
        </span>
        <span class="val">
          <el-button type="primary" size="small" plain>批量禁言</el-button>
          <el-button type="primary" size="small" plain>黑名单</el-button>
        </span>
      </span>
      <!--  -->

      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <!-- <el-table-column type="index" :index="indexMethod" label="序号" align="center"></el-table-column> -->

          <el-table-column prop="name" label="业主姓名" align="center"></el-table-column>
          <!-- <el-table-column prop="acct" label="账号" align="center"></el-table-column> -->
          <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
          <el-table-column prop="floor" label="楼盘" align="center"></el-table-column>
          <!-- <el-table-column prop="tung" label="楼栋" align="center"></el-table-column> -->
          <!-- <el-table-column prop="unit" label="单元" align="center"></el-table-column> -->
          <!-- <el-table-column prop="order" label="房号" align="center"></el-table-column> -->
          <el-table-column prop="relationship" label="身份" align="center"></el-table-column>
          <el-table-column prop="createTime" label="注册时间" align="center"></el-table-column>
          <el-table-column label="已绑定账户状态" align="center">
            <template slot-scope="scope">
              <span
                :class="[scope.row.state==0?'greed':scope.row.state==1?'yell':scope.row.state==2?'':'red']"
              >{{scope.row.state==0?'正常':scope.row.state==1?'禁言':scope.row.state==2?'锁定':'黑名单'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
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
    <div class="bgContant2" v-show="!showUser">
      <div class="noticeT">
        <span class="name">用户详情</span>
        <span class="status">账户状态</span>
        <span class="val">
          <el-select v-model="jin" placeholder="请选择">
            <el-option
              v-for="item in jinList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="time">
          <img src />
          倒计时：25：50：50
        </span>
        <el-button size="small" @click="showUser=true">返回</el-button>
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
      <!--  -->
      <div class="noticeT">
        <span class="name">绑定信息</span>
      </div>
      <el-tabs v-model="activeInfo" type="card" @tab-click="tabFN">
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
            <!--  -->
            <!-- <div v-show="activeName=='index0'">
              <div class="btnAdd">
                <el-button size="small">新建工单</el-button>
              </div>
              <div class="workOrder">
                <img src />
                <span class="contant">
                  <span class="left">
                    <div class="name">室内报修</div>
                    <div class="det">洗手池堵塞,无法下水</div>
                    <div class="val">
                      报事人:
                      <span class="color">王鸿</span>
                      于 2020年6月30日 14:30
                      <span class="color">提交工单</span>
                    </div>
                  </span>
                  <span class="right">
                    <div class="child">
                      <span class="hui">处理人:</span>
                      <span class="black">李强</span>
                    </div>
                    <div class="child mid">
                      <span class="hui">状态:</span>
                      <span class="black red">已到场</span>
                    </div>
                    <div class="child">
                      <span class="hui">优先级:</span>
                      <span class="black">加急</span>
                    </div>
                  </span>
                </span>
              </div>
            </div>-->
            <!--  -->
            <!-- <div v-show="activeName=='index1'||activeName=='index2'">
              <div class="btnAdd">
                <el-button size="small">{{activeName=='index1'?'新增房产':'新增商铺'}}</el-button>
              </div>
              <div class="housePro">
                <img src />
                <span class="contant">
                  <div class="name">元邦山清水秀花园1栋0205</div>
                  <div class="val">
                    身份:
                    <span class="blue">业主</span>
                  </div>
                </span>
                <el-button type="primary" size="small">查看详情</el-button>
              </div>
            </div>-->
            <!--  -->
            <!-- <div v-show="activeName=='index3'||activeName=='index5'"> -->
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

              <!-- <span class="flex long">
                <el-button type="primary" size="small">新增</el-button>
                <el-button type="primary" class="hui" size="small">修改</el-button>
                <el-button type="primary" class="hui" size="small">删除</el-button>
              </span>-->
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
            <!-- </div> -->
            <!--  -->
            <!-- <div v-show="activeName=='index4'">
              <div class="btnAdd">
                <el-button size="small">新增车位</el-button>
              </div>
              <div class="housePro">
                <img src />
                <span class="contant">
                  <div class="name">
                    元邦山清水秀花园1栋地下车库A区101
                    <span class="buy">已购</span>
                  </div>
                  <div class="val">
                    绑定车牌号:
                    <span class="blue">粤A 888888</span>
                  </div>
                </span>
                <el-button type="primary" size="small">查看详情</el-button>
              </div>
            </div>-->
            <!--  -->
            <!-- <div v-show="activeName=='index5'"></div> -->
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
      edit: true,
      activeName: "index0",
      activeInfo: "index0",
      multipleSelection: [],
      currentPage4: 1,
      total: 0,
      name: "",
      account: "",
      room: "",
      vill: "",
      dateChoose: "",
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
      statusList: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "禁言",
        },
        {
          value: "2",
          label: "锁定",
        },
        {
          value: "3",
          label: "黑名单",
        },
      ],
      identity: "",
      identityList: [
        {
          value: "业主",
          label: "业主",
        },
        {
          value: "家人",
          label: "家人",
        },
        {
          value: "租客",
          label: "租客",
        },
      ],
      jinList: [
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
      jin: "",
      status: "",

      tableData: [],
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
          val: "",
          data: "name",
        },
        {
          name: "身份证号:",
          val: "",
          data: "idcard",
        },
        {
          name: "手机:",
          val: "",
          data: "phone",
        },
        {
          name: "注册时间:",
          val: "",
          data: "createTime",
        },

        {
          name: "身份:",
          val: "",
          data: "relationship",
        },
        {
          name: "预存款:",
          val: "",
          data: "balance",
        },
        {
          name: "积分:",
          val: "",
          data: "integral",
        },
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
              det: [],
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
  mounted() {
    this.getData();
  },
  methods: {
    //
    getData() {
      this.getFN({
        url: "/systemmanager/proprietoruser/page",
        data: {
          currentPage: this.currentPage4,
          name: this.name || null,
          pageSize: 10,
          phone: this.account || null,
          relationship: this.identity || null,
          state: this.status || null,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.tableData = r.data.data.records;
           r.data.data.total ? (this.total = r.data.data.total) : "";
        } else this.eFN(r.data.message);
        console.log(r);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, data) {
      this.info.forEach((s) => {
        s.val = data[s.data];
      });
      this.getFN({
        url: "/systemmanager/proprietoruser/" + data.userId,
        data: {},
      }).then((r) => {
        if (r.data.status == "OK") {
          this.info.forEach((s) => {
            s.val ? "" : (s.val = r.data.data[s.data]);
          });
        } else this.eFN(r.data.message);
      });
      this.info.forEach((s) => {
        s.val = data[s.data];
      });
      this.infoList[0].list = [];
      this.infoList[1].list = [];
      this.infoList[2].list = [];
      this.infoList[2].post = data.proprietorUserId;
      // 房屋的
      this.getFN({
        url:
          "/assetsservice/housemessage/houseMessage?proprietorId=" +
          data.proprietorUserId,
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
                  name: "购买日期",
                  val: s.tradeDate,
                },
                {
                  name: "房屋面积",
                  val: s.area + "平方米",
                },
              ],
            });
          });
        } else this.eFN(r.data.message);
      });

      this.showUser = false;
    },

    //
    tabFN(data) {
      console.log(data);
      data.index == 2 ? this.getPack() : data.index == 1 ? "" : "";
    },
    // 车位
    getPack() {
      if (this.infoList[2].finsh) return;
      this.getFN({
        url:
          "/assetsservice/parkingmessage/proprietor?proprietorId=" +
          this.infoList[2].post,
      }).then((r) => {
        if (r.data.status == "OK") {
          this.infoList[2].finsh = true;
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    ss() {},
    openFN(row, column, cell, event) {
      console.log(row, column, cell, event);
    },
  },
};
</script>

<style lang="less">
#fuUserInfo {
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
    .greed {
      color: #67c23a;
    }
    .red {
      color: #f56c6c;
    }
    .yell {
      color: #e6a23c;
    }
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
    .status {
      margin: 0 15px;
      font-weight: bold;
    }
    .time {
      margin: 0 15px;
      flex: 1;
      > img {
        margin: 0 5px;
        height: 20px;
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
          font-weight: bold;
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
  //
  // .workOrder {
  //   display: flex;
  //   align-items: center;
  //   > img {
  //     height: 80px;
  //   }
  //   .contant {
  //     flex: 1;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     padding-bottom: 15px;
  //     border-bottom: 1px solid rgb(209, 209, 209);
  //     .left {
  //       .name {
  //         font-size: 18px;
  //       }
  //       .det {
  //         color: #4799f7;
  //         margin: 3px 0;
  //       }
  //       .val {
  //         color: #686868;
  //         .color {
  //           font-weight: bold;
  //         }
  //       }
  //     }
  //     .right {
  //       .mid {
  //         margin: 3px 0;
  //       }
  //       .hui {
  //       }
  //       .black {
  //         font-weight: bold;
  //       }
  //       .red {
  //         color: #fd2e2e;
  //       }
  //     }
  //   }
  // }
  // //
  // .btnAdd {
  //   margin-bottom: 20px;
  //   .el-button {
  //     color: #4799f7;
  //     border-color: #4799f7;
  //     font-size: 16px;
  //   }
  // }
  //
  // .housePro {
  //   display: flex;
  //   align-items: center;
  //   border-bottom: 1px solid rgb(209, 209, 209);
  //   > img {
  //     height: 80px;
  //   }
  //   .contant {
  //     flex: 1;

  //     .name {
  //       font-weight: bold;
  //       margin-bottom: 8px;
  //       .buy {
  //         color: #4799f7;
  //         background: rgba(234, 234, 234, 1);
  //         font-size: 15px;
  //         padding: 1px 5px;
  //         margin-left: 10px;
  //       }
  //     }
  //     .val {
  //       .blue {
  //         color: #4799f7;
  //       }
  //     }
  //   }
  //   .el-button {
  //     width: 100px;
  //     font-size: 14px;
  //   }
  // }
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
  .bgContant2 {
    height: 100%;
    overflow: auto;
  }
}
</style>