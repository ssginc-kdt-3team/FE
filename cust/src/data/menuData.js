const menuData = [
  {
    id: 1,
    name: "예약하기",
    link: "/resv/add"
  },
  {
    id: 2,
    name: "예약 내역",
    link: "/resv",
    subMenu : [
      {
        id: 1,
        name: '전체 예약 내역',
        link: "/resv"
      },
      {
        id: 2,
        name: '현재 예약 내역',
        link: "/resv/active"
      }
    ]
  },
  {
    id: 3,
    name: "매장 안내",
    link: "/branch"

  },
  {
    id: 4,
    name: "이용 안내",
    link: "/",
    subMenu : [
      {
        id: 1,
        name: '예약 서비스 안내',
        link: "/"
      },
      {
        id: 2,
        name: '리워드 안내',
        link: "/"
      }
    ]
  },
  {
    id: 5,
    name: "이벤트",
    link: "/event"
  }
]

export default menuData;