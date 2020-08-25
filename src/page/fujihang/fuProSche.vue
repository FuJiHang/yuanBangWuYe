<!--
 * @Author: fujihang
 * @Date: 2020-07-23 14:29:09
 * @LastEditors: your name
 * @LastEditTime: 2020-08-03 17:40:11
 * @Description: 物业排班
--> 
<template>
  <div id="fuProSche">
    <div class="bgContant" v-show="showDoor" @click="showIndex=-1">
      <div class="navTop">
        <span class="child">排班日历</span>
        <span class="flex">
          <el-date-picker v-model="timeVal" type="month" placeholder="选择月"></el-date-picker>
        </span>
        <span class="child"></span>
      </div>
      <!--  -->
      <div class="funtion">
        <el-button size="small" type="primary" @click="showDoor=false">新增排班</el-button>
        <el-button size="small" type="primary" class="hui" >修改</el-button>
        <el-button size="small" type="primary" class="hui">删除</el-button>
      </div>
      <!--  -->
      <div class="timeList">
        <div class="nav">
          <span class="child" v-for="(item,index) in navList" :key="index">{{item}}</span>
        </div>
        <div class="contant">
          <span class="child" v-for="(item,index) in 40" :key="index" v-show="index<35">
            <div class="day">
              <span :class="['num',index==20?'color':'']">{{item}}</span>
            </div>
            <div
              :class="['people',index>=13?'org':'']"
              v-show="index<20"
              @click.stop="showIndex=index"
            >
              <img :class="[index<20?'opt':'']" src="/static/xiugai-2.png" />
              <span class="i">拿去 阿斯顿</span>
              <img src="/static/arrow.png" class="arrow" />
              <span :class="['alertSP',index>14?'alertSPB':'alertSPT']" v-show="index==showIndex">
                <div class="title">值班人员：</div>
                <div class="list" v-for="item in 3" :key="item">
                  <img src="/static/bg.jpg" />
                  <span class="detail">
                    <div class="name">
                      完好
                      <span class="type">物业经理</span>
                    </div>
                    <div class="job">部门：物业部</div>
                    <div class="phone">
                      <img src="/static/phone.png" />
                      1555525555
                    </div>
                  </span>
                </div>
              </span>
            </div>
            <div class="add" v-show="index>=20"  @click="dialogVisible=true">
              <img src="/static/add.png" />
            </div>
          </span>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="bgContant2" v-show="!showDoor">
      <div class="noticeT">
        <span class="name">新增排班</span>
        <el-button size="small" @click="showDoor=true">返回</el-button>
      </div>
      <div class="timeChoose">
        <span class="name">日期</span>
        <el-date-picker
          v-model="timeChoose"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <!--  -->
      <div class="work">
        <span class="child" v-for="(item,index) in 5" :key="index">
          <div class="list">
            <span class="name">日期</span>
            <span class="val">
              <el-input></el-input>
            </span>
          </div>
          <div class="list">
            <span class="name">值班人员</span>
            <span class="val">
              <el-input></el-input>
              <img src="/static/add.png" />
            </span>
          </div>
          <div class="list border" v-show="false">
            <span class="name">部门</span>
            <span class="val">
              <el-date-picker v-model="chooseTime" type="date" placeholder="选择日期"></el-date-picker>
            </span>
          </div>
          <div class="list" v-show="false">
            <span class="name">姓名</span>
            <span class="val">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
          </div>
        </span>
      </div>
      <!--  -->
      <div class="btn">
        <el-button size="small" type="primary">确认添加</el-button>
      </div>
    </div>

    <!--  -->
    <el-dialog title="新增排班" :visible.sync="dialogVisible">
      <div class="list">
        <span class="name">日期</span>
        <span class="val">
          <el-date-picker v-model="chooseTime" type="date" placeholder="选择日期"></el-date-picker>
        </span>
      </div>
      <div class="list">
        <span class="name">值班人员</span>
        <span class="val">
          <el-input val></el-input>
        </span>
      </div>
      <div class="list border">
        <span class="name">部门</span>
        <span class="val">
          <el-date-picker v-model="chooseTime" type="date" placeholder="选择日期"></el-date-picker>
        </span>
      </div>
      <div class="list">
        <span class="name">姓名</span>
        <span class="val">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div class="btn">
        <el-button size="small" type="primary">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeChoose: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      showDoor: false,
      timeVal: new Date(),
      navList: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      showIndex: -1,
      dialogVisible: false,
      chooseTime: ""
    };
  },
  methods: {}
};
</script>

<style lang="less">
#fuProSche {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .bgContant {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    margin: 19px;

    .navTop {
      padding: 20px 30px;
      display: flex;
      align-items: center;
      .child {
        width: 80px;
      }
      .flex {
        flex: 1;
        text-align: center;
      }
    }
    //
    .funtion {
      text-align: right;
      padding: 0 30px;
      .el-button {
        width: 100px;
        font-size: 14px;
      }
      .hui {
        background: #c0cedf;
        border-color: #c0cedf;
      }
    }
    //
    .timeList {
      margin: 15px 30px;
      .nav {
        border: 1px solid rgb(226, 226, 226);
        display: flex;
        .child {
          padding: 10px 0;
          text-align: center;
          flex: 1;
        }
      }
      .contant {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border-left: 1px solid rgb(226, 226, 226);
        .child {
          height: 130px;
          width: 14.28%;
          border-right: 1px solid rgb(226, 226, 226);
          border-bottom: 1px solid rgb(226, 226, 226);
          .day {
            font-size: 16px;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .num {
              display: block;
              height: 25px;
              width: 25px;
            }
            .color {
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background: #ffd094;
              color: #fff;
            }
          }
          .add {
            margin-top: 40px;
            text-align: right;
            padding: 0 10px;
          }
          .people {
            margin: 20px 10px 0;
            padding: 10px 10px;
            display: flex;
            align-items: center;
            background: rgba(246, 246, 246, 1);
            border-left: 4px solid #c6bfb6;
            position: relative;
            img {
              height: 15px;
            }
            .opt {
              opacity: 0;
            }
            .i {
              flex: 1;
              margin: 0 10px;
            }
            .arrow {
              height: 23px;
            }
            .alertSP {
              position: absolute;
              box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
              border: 1px solid rgba(228, 231, 237, 1);
              background: #fff;
              width: 250px;
              z-index: 2;
              padding: 10px 20px;
              left: -10px;

              max-height: 300px;
              overflow: auto;
              .title {
                font-weight: bold;
                margin-bottom: 10px;
              }
              .list {
                display: flex;
                align-items: flex-start;

                > img {
                  height: 40px;
                  width: 40px;
                  border-radius: 50%;
                  object-fit: cover;
                }
                .detail {
                  flex: 1;
                  margin-left: 10px;
                  padding: 10px 0;
                  border-bottom: 1px solid rgb(240, 240, 240);
                  .name {
                    .type {
                      padding: 2px 5px;
                      color: #4e8cee;
                      background: rgba(242, 244, 247, 1);
                      border: 1px solid rgba(166, 197, 246, 1);
                      margin-left: 5px;
                    }
                  }
                  .phone {
                    > img {
                      height: 20px;
                      margin-right: 5px;
                    }
                  }
                }
                .job {
                  padding: 10px 0;
                }
              }
            }
            .alertSPT {
              top: 45px;
            }
            .alertSPB {
              bottom: 45px;
            }
          }
          .org {
            background: #fff0dd;
            border-color: #f8af43;
          }
        }
      }
    }
  }

  //
  //
  .bgContant2 {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    margin: 19px;
    height: 100%;
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
    .timeChoose {
      display: flex;
      align-items: center;
      padding: 0 29px;
      .name {
        margin-right: 20px;
      }
    }
    .btn {
      text-align: center;
      margin-top: 80px;
      .el-button {
        width: 110px;
        background: rgba(248, 175, 67, 1);
        border-color: rgba(248, 175, 67, 1);
      }
    }
    //
    .work {
      padding: 17px;
      display: flex;
      flex-wrap: wrap;

      .child {
        margin: 12px;
        width: calc(25% - 24px);
        box-shadow: 0px 2px 20px 0px rgba(228, 228, 228, 0.5);
        border-radius: 10px;
        .border {
          padding-top: 20px;
          border-top: 1px dashed rgb(224, 224, 224);
        }
        .list {
          margin: 20px 20px;
          display: flex;
          align-items: center;
          .name {
            width: 70px;
            text-align: right;
            margin-right: 30px;
          }
          .val {
            flex: 1;
            border: 1px solid rgb(212, 212, 212);
            border-radius: 5px;
            overflow: hidden;
            .el-input__inner {
              border: none;
              width: 100%;
            }
            display: flex;
            align-items: center;
            > img {
              margin-right: 5px;
              height: 20px;
            }
          }

          .el-input {
            border: none !important;
            font-size: 16px;
            width: 200px;
          }
        }
      }
    }
  }

  //
  .el-dialog {
    .el-dialog__header {
      text-align: center;
      font-weight: bold;
    }
    .el-dialog__body {
      display: flex;
      align-items: center;
      flex-direction: column;
      .list {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        .name {
          width: 70px;
          text-align: right;
          margin-right: 30px;
        }
        .el-input {
          font-size: 16px;
          width: 200px;
        }
      }
      .border {
        padding-top: 20px;
        border-top: 1px dashed rgb(224, 224, 224);
      }
      .btn {
        .el-button {
          width: 110px;
        }
      }
    }
  }
}
</style>