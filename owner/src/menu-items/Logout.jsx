import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from 'store/actions/authActions';
import { LogoutOutlined } from '@ant-design/icons';

const Logout = ({ handleLogout }) => {
  const handleClick = () => {
    handleLogout();
  };

  return (
    <div>
      <LogoutOutlined onClick={handleClick} style={{ cursor: 'pointer' }} />
      <span onClick={handleClick} style={{ cursor: 'pointer' }}>
        로그아웃
      </span>
    </div>
  );
};

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);