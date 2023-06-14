import { Button } from 'antd';

function ChargeResult() {
  // 창 닫기
  window.close();  

  // const path = new URL(window.opener.location.href).pathname; // /cash
  // console.log(path);
  // if(path === '/cash') { // /cash에서 충전한 경우에만 새로고침
  //   // 부모창 새로고침
  //   window.opener.location.reload();
  // }
  
  window.opener.location.reload();

  return (
    <></>
    // <div>
    //   결제가 완료되었습니다.
    //   <Button onClick={() => window.close()}>닫기</Button>
    // </div>
  );
}

export default ChargeResult;