function Button ({value}) {
    return (
        <div className="button">
            <button disabled={value === ""} className="bg-gray-600">検索</button>
        </div>
)
}

export default Button