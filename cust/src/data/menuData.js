const menuData = [
  {
    id: 1,
    name: "점포소개",
    link: "/"
  },
  {
    id: 2,
    name: "이용안내",
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
    id: 3,
    name: "매장안내",
    link: "/"
  },
  {
    id: 4,
    name: "이벤트",
    link: "/"

  },
  {
    id: 5,
    name: "FAQ",
    link: "/"
  }
]

export default menuData;