import React from 'react';
import { Spin } from 'antd';

import 'antd/lib/spin/style/index.css';

import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spin}>
      <Spin tip="Loading..." />
    </div>
  );
};

export default Spinner;
