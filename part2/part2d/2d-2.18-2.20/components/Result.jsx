const Result = ({ results, btnOnClick }) => {
    console.log(results)
    if (results === null) {
        return null
    }
    else if (results === "text"){
        return <p>Too many matches, specify another filter</p>
    }

    return (
        <ul>
            {results.map(result => (
                <li key={result}>
                    {result} <button onClick={() => btnOnClick(result)}>Show</button>
                </li>
            ))}
        </ul>
    )
}

export default Result