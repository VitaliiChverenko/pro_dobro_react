const initialState = {
    email: '',
    phone: '',
    address: {
      address: '',
      coords:{
        lat: '',
        lng: ''
      }
    }
  }; 
  
export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return action.payload
    default:
      return state
  }
}
