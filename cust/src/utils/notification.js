import { Modal } from 'antd';
import { ExclamationCircleFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import styles from '../assets/css/modal/Modal.module.css'

export const confirm = (title, content, func) => {
  const { confirm } = Modal;
  
  confirm({
    title: title,
    icon: <ExclamationCircleFilled style={{ color: 'var(--main)' }}/>,
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

export const error = (title, content) => {
  const { error } = Modal;

  error({
    title: title,
    icon: <CloseCircleFilled  style={{ color: 'var(--main)' }}/>,
    content: content,
    okButtonProps: {
      className: `button ${styles.confirmBtn}`,
    },
    okText: '확인'
  });
}

export const success = (title, content) => {
  const { success } = Modal;

  success({
    title: title,
    icon: <CheckCircleFilled  style={{ color: 'var(--main)' }}/>,
    content: content,
    okButtonProps: {
      className: `button ${styles.confirmBtn}`,
    },
    okText: '확인'
  });
}