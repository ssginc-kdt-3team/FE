import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../../store/lib/storage';
import { clearUser } from '../../../store/reducers/userSlice'; 
import { Modal } from 'antd';

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
    });

    navigate('/');
  };


  return (
    <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
      <span>로그아웃</span>
    </div>
  );
};
export default Logout;

