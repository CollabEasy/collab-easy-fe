
const initialState = [
  { name: "Atul", id: 1 }, { name: "Rahul", id: 2 }
];
const home = (state = initialState, action) => {
  switch (action.type) {
    case 'home':
      return [{ name: "Atul", id: 1 }, { name: "Rahul", id: 3 }, { name: 'Ekta', id: 2 }];
    default:
      return state;
  }
};


export default home