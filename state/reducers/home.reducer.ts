const initialState = {
  homeDetails: {},
  loginModalDetails: {}
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME':
      return { ...state, homeDetails: {dummyData: [{ name: "Atul", id: 1 }, { name: "Rahul", id: 3 }, { name: 'Ekta', id: 2 }]} };
    case 'OPEN_LOGIN_MODAL':
      console.log("OPEN_LOGIN_MODAL reducer");
      return { ...state, loginModalDetails: {openModal: true} };
    case 'CLOSE_LOGIN_MODAL':
      return { ...state, loginModalDetails: {openModal: false} };
    default:
      return state;
  }
};


export default homeReducer
