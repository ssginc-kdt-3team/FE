// //branch 만들어지면 확인하기

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DepositList from '../resv/deposit'
// import { Link  } from "react-router-dom";

// function BranchList() {
//   const [branchId, setBranchId] = useState(1);

//   useEffect(() => {
//     axios.get("http://localhost:8080/admin/branch/findAll")
//       .then((response) => {
//         setBranchList(response.data.content);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <>
//        <div>
//       <h1>고객 리스트</h1>
//       <ul>
//         {branchList.map((branch) => (
//           <li key={branch.id}>
//             <Link to={`/branch/detail/${branch.id}`}>{branch.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>

//       <input type="number" value={branchId} onChange={(e) => setBranchId(e.target.value)} />
//       <DepositList id={branchId} />
//     </>
//   );
// }

// export default BranchList;