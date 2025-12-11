const Area = ({ value }) => {
    if (value === null) {
        return null
    }

    return (
        <p>area: {value}</p>
    )
}

export default Area