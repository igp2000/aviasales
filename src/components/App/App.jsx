import React, { useState, useEffect, useRef } from 'react';
//import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

//import SearchTickets from '../../services/services';
import { getSearchId } from '../../services/services';
import * as actions from '../../store/actions';
import { TransferBox } from '../TransferBox';
import { Tabs } from '../Tabs';
import { Airlines } from '../Airlines';
import { ButtonNext } from '../ButtonNext';
import logo from '../css/img/logo.png';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

import styles from './App.module.scss';

//const App = ({ error, showSpiner, endTicketShow, ticketsLength, getTickets, setError }) => {
const App = () => {
  //const searchTickets = new SearchTickets();

  const showSpiner = useSelector((state) => state.showSpiner);
  const endTicketShow = useSelector((state) => state.endTicketShow);
  const error = useSelector((state) => state.error);
  const ticketsLength = useSelector((state) => state.tickets.length);

  const dispatch = useDispatch();

  const [searchId, setSearchId] = useState(null);
  let flag = useRef(true);

  useEffect(() => {
    if (flag.current) {
      flag.current = false;
      //searchTickets
      getSearchId()
        .then((data) => {
          if (data.searchId) {
            setSearchId(data.searchId);
          }
        })
        .catch((err) => {
          dispatch(actions.setError(err));
        });
    }
  }, []);

  useEffect(() => {
    if (searchId === null) {
      return;
    } else {
      dispatch(actions.getTickets(searchId));
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
          {showSpiner && <Spinner />}
          <Airlines />
          {endTicketShow < ticketsLength && <ButtonNext />}
        </div>
      </div>
    </>
  );
};
/*
const mapStateToProps = (state) => {
  return {
    showSpiner: state.showSpiner,
    endTicketShow: state.endTicketShow,
    error: state.error,
    ticketsLength: state.tickets.length,
  };
};
*/
/*
const mapDispatchToProps = (dispatch) => {
  setShowSpiner: (flag) => dispatch({type: 'SHOW_SPINER', flag});
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
*/
//export default connect(mapStateToProps, actions)(App);

export default App;
