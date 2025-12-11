const Languages = ({ languages }) => {
    if (languages.length === 0){
        return null
    }

    return (
        <div>
            <h2>Languages</h2>
            <ul>
                {languages.map(([code, name]) => (
                    <li key={code}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Languages