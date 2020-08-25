export default [{
    path: '/fuIndex',
    name: 'fuIndex',
    component: resolve => require(['../page/fujihang/fuIndex.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: '首页',
    },
  },
  {
    path: '/',
    name: '',
    component: resolve => require(['../page/fujihang/fuIndex.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: '首页',
    },
  },
  {
    path: '/fuTest',
    name: 'fuTest',
    component: resolve => require(['../page/fujihang/fuTest.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: '首页',
    },
  },
  {
    path: '/fuTestT',
    name: 'fuTestT',
    component: resolve => require(['../page/fujihang/fuTestT.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: '首页',
    },
  },
  {
    path: '/fuLogin',
    name: 'fuLogin',
    component: resolve => require(['../page/fujihang/fuLogin.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: '登录',
    },
  },
  {
    path: '/workbench',
    name: 'workbench',
    component: resolve => require(['../page/fujihang/workbench.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 工作台 ',
    },
  },
  {
    path: '/fuNewWorkOrder',
    name: 'fuNewWorkOrder',
    component: resolve => require(['../page/fujihang/fuNewWorkOrder.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 工作台 > 最新工单',
    },
  },
  {
    path: '/fuLeaseApply',
    name: 'fuLeaseApply',
    component: resolve => require(['../page/fujihang/fuLeaseApply.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 工作台 > 租赁详情',
    },
  },
  {
    path: '/fuOnlinePay',
    name: 'fuOnlinePay',
    component: resolve => require(['../page/fujihang/fuOnlinePay.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 工作台 > 线上缴费',
    },
  },
  {
    path: '/fuHouseMana',
    name: 'fuHouseMana',
    component: resolve => require(['../page/fujihang/fuHouseMana.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 房屋管理',
    },
  },
  {
    path: '/fuUserMana',
    name: 'fuUserMana',
    component: resolve => require(['../page/fujihang/fuUserMana.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 用户管理',
    },
  },
  {
    path: '/fuIndoorRepair',
    name: 'fuIndoorRepair',
    component: resolve => require(['../page/fujihang/fuIndoorRepair.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 工单管理 > 室内报修',
    },
  },
  {
    path: '/fuOnlinePayT',
    name: 'fuOnlinePayT',
    component: resolve => require(['../page/fujihang/fuOnlinePayT.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 线上缴费',
    },
  },
  {
    path: '/fuProperNotice',
    name: 'fuProperNotice',
    component: resolve => require(['../page/fujihang/fuProperNotice.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 信息发布 > 物业通知',
    },
  },
  {
    path: '/fuRealTime',
    name: 'fuRealTime',
    component: resolve => require(['../page/fujihang/fuRealTime.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 信息发布 > 实时资讯',
    },
  },
  {
    path: '/fuComFact',
    name: 'fuComFact',
    component: resolve => require(['../page/fujihang/fuComFact.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 信息发布 > 社区实事',
    },
  },
  {
    path: '/fuFestActivit',
    name: 'fuFestActivit',
    component: resolve => require(['../page/fujihang/fuFestActivit.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 信息发布 > 节日活动',
    },
  },
  {
    path: '/fuOnlineCon',
    name: 'fuOnlineCon',
    component: resolve => require(['../page/fujihang/fuOnlineCon.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 线上合同',
    },
  },
  {
    path: '/fuGateRele',
    name: 'fuGateRele',
    component: resolve => require(['../page/fujihang/fuGateRele.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 预约管理 > 门岗放行',
    },
  },
  {
    path: '/fuParkReser',
    name: 'fuParkReser',
    component: resolve => require(['../page/fujihang/fuParkReser.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 预约管理 > 车位预约',
    },
  },
  {
    path: '/fuProSche',
    name: 'fuProSche',
    component: resolve => require(['../page/fujihang/fuProSche.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 物业排班',
    },
  },
  {
    path: '/fuParkLot',
    name: 'fuParkLot',
    component: resolve => require(['../page/fujihang/fuParkLot.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 车位管理',
    },
  },
  {
    path: '/fuRealTimeInfor',
    name: 'fuRealTimeInfor',
    component: resolve => require(['../page/fujihang/fuRealTimeInfor.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 评论反馈 > 实时资讯',
    },
  },
  {
    path: '/fuComFactTwo',
    name: 'fuComFactTwo',
    component: resolve => require(['../page/fujihang/fuComFactTwo.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 评论反馈 > 社区实事',
    },
  },
  {
    path: '/fuFeedBack',
    name: 'fuFeedBack',
    component: resolve => require(['../page/fujihang/fuFeedBack.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 评论反馈 > 意见反馈',
    },
  },
  {
    path: '/fuEstateMana',
    name: 'fuEstateMana',
    component: resolve => require(['../page/fujihang/fuEstateMana.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 物业管理',
    },
  },
  {
    path: '/fuDefaultInfo',
    name: 'fuDefaultInfo',
    component: resolve => require(['../page/fujihang/fuDefaultInfo.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 业主管理 > 业主基本信息',
    },
  },
  {
    path: '/fuUserInfo',
    name: 'fuUserInfo',
    component: resolve => require(['../page/fujihang/fuUserInfo.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 业主管理 > 业主用户信息',
    },
  },
  {
    path: '/fuLastDeve',
    name: 'fuLastDeve',
    component: resolve => require(['../page/fujihang/fuLastDeve.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 直售广告 > 最新楼盘',
    },
  },
  {
    path: '/fuDirSale',
    name: 'fuDirSale',
    component: resolve => require(['../page/fujihang/fuDirSale.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 直售广告 > 直售车位',
    },
  },
  {
    path: '/fuRoleMana',
    name: 'fuRoleMana',
    component: resolve => require(['../page/fujihang/fuRoleMana.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 物业管理 ',
    },
  },
  {
    path: '/fuResiMana',
    name: 'fuResiMana',
    component: resolve => require(['../page/fujihang/fuResiMana.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 住宅管理 ',
    },
  },
  {
    path: '/fuBindPro',
    name: 'fuBindPro',
    component: resolve => require(['../page/fujihang/fuBindPro.vue'], resolve),
    meta: {
      keeyAlive: true,
      name: ' 工作台 >  用户绑定房产',
    },
  },
  {
    path: '/fuShopMana',
    name: 'fuShopMana',
    component: resolve => require(['../page/fujihang/fuShopMana.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 商铺管理 ',
    },
  },
  {
    path: '/fuIdleResa',
    name: 'fuIdleResa',
    component: resolve => require(['../page/fujihang/fuIdleResa.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 用户发布 > 闲置转卖',
    },
  },
  {
    path: '/fuRelease',
    name: 'fuRelease',
    component: resolve => require(['../page/fujihang/fuRelease.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 用户发布 > 动态发布',
    },
  },
  {
    path: '/fuDirRen',
    name: 'fuDirRen',
    component: resolve => require(['../page/fujihang/fuDirRen.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 用户发布 > 车位出租',
    },
  },
  {
    path: '/fuDirBuy',
    name: 'fuDirBuy',
    component: resolve => require(['../page/fujihang/fuDirRen.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 用户发布 > 车位转卖',
    },
  },
  {
    path: '/fuContract',
    name: 'fuContract',
    component: resolve => require(['../page/fujihang/fuContract.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 线上合同 ',
    },
  },
  {
    path: '/fuBonusPoint',
    name: 'fuBonusPoint',
    component: resolve => require(['../page/fujihang/fuBonusPoint.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 积分管理 >  积分赠送规则',
    },
  },
  {
    path: '/fuRedeem',
    name: 'fuRedeem',
    component: resolve => require(['../page/fujihang/fuRedeem.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 积分管理 >  积分兑换物品',
    },
  },
  {
    path: '/fuPiontDet',
    name: 'fuPiontDet',
    component: resolve => require(['../page/fujihang/fuPiontDet.vue'], resolve),
    meta: {
      keeyAlive: false,
      name: ' 积分管理 >  物品兑换详情',
    },
  },
  

]
