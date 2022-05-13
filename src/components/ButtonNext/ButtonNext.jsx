import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import styles from './ButtonNext.module.scss';

const ButtonNext = ({ flagButton, endTicketShow, setEndTicketShow }) => {
  const onClick = () => {
    if (!flagButton) {
      return;
    }
    setEndTicketShow(endTicketShow + 5);
  };

  return (
    <button className={['box', styles['button-next']].join(' ')} onClick={onClick}>
      {flagButton ? 'Показать еще 5 билетов!' : 'Рейсов, подходящих под заданные фильтры, не найдено'}
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
    endTicketShow: state.endTicketShow,
    flagButton: state.flagButton,
  };
};

export default connect(mapStateToProps, actions)(ButtonNext);
