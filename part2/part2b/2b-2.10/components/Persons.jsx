const Persons = ({ arr }) => {
  return(
    arr.map(people =>
      <div key={people.id}>{people.name} {people.number}</div>
    )
  )
}

export default Persons