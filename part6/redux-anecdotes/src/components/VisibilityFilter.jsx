import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {

  const dispatch = useDispatch()

  const handleFilter = (event) => {
    const filter = event.target.value
    dispatch(filterChange(filter))
  }

  return (
    <div>
      <input onChange={handleFilter}/>
    </div>
  )
}

export default VisibilityFilter