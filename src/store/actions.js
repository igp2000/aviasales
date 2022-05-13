import SearchTickets from '../services/services';

const searchTickets = new SearchTickets();

export const setError = (error) => {
  return {
    type: 'ERROR',
    error,
  };
};

export const transferFilterClick = (flags) => {
  return {
    type: 'TRANSFER_FILTER',
    flags,
  };
};

export const tabActiveClick = (id) => {
  return {
    type: 'TAB_ACTIVE',
    id,
  };
};

export const setShowSpiner = (flag) => {
  return {
    type: 'SHOW_SPINER',
    flag,
  };
};

export const setTickets = (tickets) => {
  return {
    type: 'TICKETS',
    tickets,
  };
};

export const setEndTicketShow = (start) => {
  return {
    type: 'END_TICKET_SHOW',
    start,
  };
};

export const setFlagButton = (flag) => {
  return {
    type: 'FLAG_BUTTON',
    flag,
  };
};

export const getTickets = (searchId) => {
  return (dispatch, getState) => {
    return getPartTickets(searchId, dispatch, getState);
  };
};

// получаем пачки билетов
async function getPartTickets(id, dispatch, getState) {
  dispatch(setError(null));
  dispatch(setShowSpiner(true));

  let countError = 0;
  let stop = false;

  while (!stop) {
    await searchTickets.getTickets(id).then(
      (data) => {
        if (!data.tickets) {
          data.tickets = [];
        }
        dispatch(setTickets(data.tickets));
        if (getState().endTicketShow === null) {
          dispatch(tabActiveClick(0));
          dispatch(setEndTicketShow(5));
        }
        stop = data.stop;
        countError = 0;
      },
      (error) => {
        countError++;
        if (countError > 2) {
          // после трех ошибок подряд
          dispatch(setError(error));
          stop = true;
        }
      }
    );
  } //while
  dispatch(setShowSpiner(false));
}
