import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import SearchTickets from '../../services/services';
import * as actions from '../../store/actions';
import { TransferBox } from '../TransferBox';
import { Tabs } from '../Tabs';
import { Airlines } from '../Airlines';
import { ButtonNext } from '../ButtonNext';
import logo from '../../img/logo.png';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

import styles from './App.module.scss';

const App = ({ error, showSpiner, endTicketShow, ticketsLength, getTickets, setError }) => {
  const searchTickets = new SearchTickets();

  const [searchId, setSearchId] = useState(null);
  let flag = useRef(true);

  useEffect(() => {
    if (flag.current) {
      flag.current = false;
      searchTickets
        .getSearchId()
        .then((data) => {
          if (data.searchId) {
            setSearchId(data.searchId);
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, []);

  useEffect(() => {
    if (searchId === null) {
      return;
    } else {
      getTickets(searchId);
    }
  }, [searchId]);

  return (
    <>
      <div className={styles['top-logo']}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={styles.content}>
        <div>
          <TransferBox />
        </div>
        <div>
          {error && <ErrorMessage message={error} />}
          <Tabs />
          <Airlines />
          {!showSpiner && endTicketShow < ticketsLength && <ButtonNext />}
          {showSpiner && <Spinner />}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showSpiner: state.showSpiner,
    endTicketShow: state.endTicketShow,
    error: state.error,
    ticketsLength: state.tickets.length,
  };
};

/*
const mapDispatchToProps = (dispatch) => {
  setShowSpiner: (flag) => dispatch({type: 'SHOW_SPINER', flag});
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
*/
export default connect(mapStateToProps, actions)(App);
