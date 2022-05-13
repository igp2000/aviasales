import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import { _tabItems } from '../../vars';

import styles from './Tabs.module.scss';

const Tabs = ({ tabActive, tabActiveClick }) => {
  const [tabStyles, setTabStyles] = useState(_tabItems.styles);

  // устанвливаем активную вкладку
  const setActivTab = (id) => {
    tabActiveClick(id);
    let arr = JSON.parse(JSON.stringify(_tabItems.styles));
    arr[id - 1].push(styles['tab-active']);
    setTabStyles(arr);
  };

  // клик по вкладке
  const onClick = (event) => {
    if (event.target.id === tabActive) {
      let arr = JSON.parse(JSON.stringify(_tabItems.styles));
      setTabStyles(arr);
      tabActiveClick(0);
      return;
    }
    setActivTab(event.target.id);
  };

  const items = _tabItems.titles.map((item, ind) => {
    return (
      <div className={tabStyles[ind].join(' ')} id={ind + 1} key={ind}>
        {item}
      </div>
    );
  });

  return (
    <div className={['box', styles.tabs].join(' ')} onClick={onClick}>
      {items}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tabActive: state.tabActive,
  };
};

export default connect(mapStateToProps, actions)(Tabs);
