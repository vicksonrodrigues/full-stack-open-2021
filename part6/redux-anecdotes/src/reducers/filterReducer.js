
export const filterChange = (newfilter) => {
    return {
      type: 'SET_FILTER',
      filter:newfilter,
    }
  }
  

const filterReducer=(state = null,action)=>{
    switch(action.type){
    
        case 'SET_FILTER':
            return action.filter

        default:
          return state
    }

}
export default filterReducer