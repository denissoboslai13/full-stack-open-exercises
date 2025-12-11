const Header = ({ name }) => {
    if (name === null) {
        return null
    }

    return (
        <h1>{name}</h1>
    )
}

export default Header