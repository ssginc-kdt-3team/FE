import { Button } from 'antd';

function ChargeResult() {
  // 창 닫기
  window.close();
  
  // 부모창 새로고침
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