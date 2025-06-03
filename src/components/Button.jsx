function Button ({isDisabled}) {
    return (
        <div className="button">
            <button disabled={isDisabled} className="bg-gray-600">検索</button>
        </div>
)
}

export default Button