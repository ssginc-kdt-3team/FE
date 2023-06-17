import { Table, Tag, Radio, Input } from "antd";
import { Link } from "react-router-dom";
import { axiosWithBaseUrl } from "App";
import { useEffect, useState } from "react";
import Paging from "components/pagination/paging";

// ==============================|| CustDetail - 고객 목록||============================== //

const { Search } = Input;

const CustList = () => {
  const [custList, setCustList] = useState([]);          //  고객 목록을 저장
  const [loading, setLoading] = useState(false);         // 데이터를 불러오는 동안의 로딩 상태를 저장
  const [currentPage, setCurrentPage] = useState(1);     // 현재 페이지 번호를 저장
  const [totalItems, setTotalItems] = useState(0);       // 전체 고객 수를 저장
  const [itemsPerPage, setItemsPerPage] = useState(10);  // 한 페이지에 보여줄 고객 수 저장
  const [filter, setFilter] = useState("default");       // 필터링을 위한 상태 변수
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchCustomerList();                 // 함수를 호출하여 페이지가 변경될 때마다 고객 목록을 가져옴
  }, [currentPage, filter, searchText]); // currentPage와 filter가 변경될 때마다 fetchCustomerList 함수가 호출

  const fetchCustomerList = () => {
    setLoading(true);
    axiosWithBaseUrl
      .get(`/admin/customer/findAll/${currentPage}`, {
        params: {
          filter,
          searchText,
        },
      })
      .then((response) => {
        let filteredList = response.data.content;
        if (filter !== "default") {
          filteredList = filteredList.filter((cust) => cust.grade === filter);
        }
        setCustList(filteredList);
        setTotalItems(response.data.totalElements);
        setItemsPerPage(response.data.numberOfElements);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };
  // 테이블 column 
  const columns = [ 
    {
      title: "고객 등급",  // column 제목
      dataIndex: "grade", // data 속성키
      key: "grade",       // column 식별자
      align: 'center',
      render: (text) => {
        // 태그 설정
        let color;
        if (text === "Gold") {
          color = "gold";
        } else if (text === "Green") {
          color = "green";
        } else if (text === "Welcome") {
          color = "blue";
        } else { 
          color = "default";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "고객명",
      dataIndex: "name",
      width: 300,
      key: "name",
      align: 'center',
      render: (text, record) => (
        <Link to={`/cust/detail/${record.id}`} style={{ color: 'black' }}>{text}</Link>
      ),
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      align: 'center',
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      align: 'center',
      render: (text) => {
      let color = text === "ACTIVE" ? "green" : "volcano";
      return <Tag color={color}>{text}</Tag>;
        },
    },
  ];

return (
      <>
      {/* 등급별 필터 */}
        <Radio.Group value={filter} onChange={handleFilterChange}>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="Gold">Gold</Radio.Button>
        <Radio.Button value="Green">Green</Radio.Button>
        <Radio.Button value="Welcome">Welcome</Radio.Button>
        </Radio.Group>
        <Search
        placeholder="email"
        onSearch={handleSearch}
        style={{
          width: 200,
          marginLeft:50
        }}
      />
        <Table
          columns={columns}
          dataSource={custList}
          pagination={false}
          loading={loading}
          align="center"
        />
        <Paging
          page={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          setPage={setCurrentPage}
   />
</>
);
};


export default CustList;