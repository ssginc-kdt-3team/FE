import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Postcode = ({ onChange }) => {
  //다음 우편번호 서비스 스크립트 url
  const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'; 
  // 우편번호 검색 팝업
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    onChange({ 
      zonecode: data.zonecode, 
      address: data.address, 
      extraAddress: data.buildingName,  
      
    });
    console.log(fullAddress);   // 예: '서울 성동구 왕십리로2길 20 (성수동1가)'
    console.log(data.address); 
    console.log(extraAddress);  
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type='button' onClick={handleClick}>
      주소 검색
    </button>
  );
};

export default Postcode;