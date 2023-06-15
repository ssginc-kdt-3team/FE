const menuData = [
  {
    id: 1,
    name: "예약하기",
    link: "/resv/add",
    icon: 'calendar',
    needLogin: true
  },
  {
    id: 2,
    name: "예약 내역",
    link: "/resv",
    icon: 'albums',
    needLogin: true,
    subMenu : [
      {
        id: 1,
        name: '전체 예약 내역',
        link: "/resv",
        needLogin: true
      },
      {
        id: 2,
        name: '현재 예약 내역',
        link: "/resv/active",
        needLogin: true
      }
    ]
  },
  {
    id: 3,
    name: "매장 안내",
    link: "/branch",
    icon: 'fast-food',
    needLogin: false
  },
  // {
  //   id: 4,
  //   name: "이용 안내",
  //   link: "/",
  //   icon: 'information-circle',
  //   subMenu : [
  //     {
  //       id: 1,
  //       name: '예약 서비스 안내',
  //       link: "/"
  //     },
  //     {
  //       id: 2,
  //       name: '리워드 안내',
  //       link: "/"
  //     }
  //   ]
  // },
  {
    id: 4,
    name: "이벤트",
    link: "/event",
    icon: 'gift',
    needLogin: false
  }
]

export default menuData;