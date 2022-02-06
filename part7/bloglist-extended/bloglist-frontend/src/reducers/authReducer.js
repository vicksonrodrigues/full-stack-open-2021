export const loginUser =(user) => {
  return {
    type:'USER_LOGIN',
    payload:
      user
  }
}

export const logoutUser = () => {
  return{
    type:'USER_LOGOUT',
    payload:{
      user:null
    }
  }
}

const authReducer = (state=null,action) => {
  switch(action.type){
  case 'USER_LOGIN' :
    return action.payload
  case 'USER_LOGOUT':
    return action.payload.user
  default:
    return state
  }

}

export default authReducer