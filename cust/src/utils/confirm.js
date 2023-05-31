import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from '../assets/css/modal/Modal.module.css'

export const confirm = (title, content, func) => {
  const { confirm } = Modal;
  
  confirm({
    title: title,
    icon: <ExclamationCircleOutlined style={{ color: 'var(--main)' }}/>,
    content: content,
    okButtonProps: {
      className: `button ${styles.confirmBtn}`,
    },
    cancelButtonProps: {
      className: `button buttonReverse ${styles.confirmBtn}`,
    },
    okText: '확인',
    cancelText: '취소',
    onOk() {
      // console.log('OK');
      func();
    }
  });

}