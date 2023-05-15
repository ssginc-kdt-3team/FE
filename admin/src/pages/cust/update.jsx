import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const UpdateCustForm = ({ cust, onUpdate }) => {
  const [name, setName] = useState(cust.name);
  const [address, setAddress] = useState(cust.address);
  // 다른 필드를 수정하기 위한 상태 변수들을 추가하세요

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정한 필드들을 반영하여 업데이트된 고객 객체를 생성합니다
    const updatedCust = {
      ...cust,
      name: name,
      address: address,

      // 다른 필드들도 필요에 따라 업데이트하세요
    };

    // onUpdate 함수를 호출하여 업데이트된 고객 객체를 전달합니다
    onUpdate(updatedCust);
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item label="이름">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="주소">
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </Form.Item>
      {/* 다른 필드를 수정하기 위한 Form.Item들을 추가하세요 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          수정
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCustForm;