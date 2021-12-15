import React from 'react'
import { connect } from 'react-redux' 
//import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const mapDispatchToProps = {
  filterChange,
}

const Filter = (props) => {
  
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(null,mapDispatchToProps)(Filter)

export default ConnectedFilter