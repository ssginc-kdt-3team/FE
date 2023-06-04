import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../../store/reducers/loginSilce';
import { clearUser } from '../../../store/reducers/userSlice'; 
import { Modal } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);      

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(setLoggedIn(false));
    console.log(id);
    Modal.success({
      title: '로그아웃 성공',
      content: '로그아웃 되었습니다.',
      okText: "닫기"
    });

    navigate('/');
  };


  return (
    <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <LogoutOutlined />
       <span style={{ fontWeight: 'bold' }}>로그아웃</span>
    </div>
  );
};
export default Logout;

