import React, { useState, useEffect } from 'react';
//import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions';
import { tabItems } from '../../vars';

import styles from './Tabs.module.scss';

const Tabs = () => {
  const tabActive = useSelector((state) => state.tabActive);
  const dispatch = useDispatch();

  const [tabStyles, setTabStyles] = useState(tabItems.styles);

  useEffect(() => setActivTab(1), []);

  // устанвливаем активную вкладку
  const setActivTab = (id) => {
    dispatch(actions.tabActiveClick(id));
    let arr = JSON.parse(JSON.stringify(tabItems.styles));
    arr[id - 1].push(styles['tab-active']);
    setTabStyles(arr);
  };

  // клик по вкладке
  const onClick = (event) => {
    if (event.target.id === tabActive) {
      let arr = JSON.parse(JSON.stringify(tabItems.styles));
      setTabStyles(arr);
      dispatch(actions.tabActiveClick(0));
      return;
    }
    setActivTab(event.target.id);
  };

  const items = tabItems.titles.map((item, ind) => {
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
/*
const mapStateToProps = (state) => {
  return {
    tabActive: state.tabActive,
  };
};

export default connect(mapStateToProps, actions)(Tabs);
*/
export default Tabs;
