const Capital = ({ name }) => {
    if (name === null) {
        return null
    }

    return (
        <p>capital: {name}</p>
    )
}

export default Capital