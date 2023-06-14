import { Modal } from 'antd';
import { ExclamationCircleFilled, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import styles from '../assets/css/modal/Modal.module.css'

export const confirm = (title, func) => {
  const { confirm } = Modal;
  
  confirm({
    title: title,
    icon: <ExclamationCircleFilled style={{ color: 'var(--main)' }}/>,
    okButtonProps: {
      className: `button button-xs`,
    },
    cancelButtonProps: {
      className: `button buttonReverse button-xs`,
    },
    okText: '확인',
    cancelText: '취소',
    onOk() {
      // console.log('OK');
      func();
    }
  });

}

export const error = (title) => {
  const { error } = Modal;

  error({
    title: title,
    icon: <CloseCircleFilled  style={{ color: 'var(--main)' }}/>,
    okButtonProps: {
      className: `button button-xs`,
    },
    okText: '확인'
  });
}

export const success = (title) => {
  const { success } = Modal;

  success({
    title: title,
    icon: <CheckCircleFilled  style={{ color: 'var(--yellow)' }}/>,
    okButtonProps: {
      className: `button button-xs`,
    },
    okText: '확인'
  });
}