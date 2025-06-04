import Button from "./Button"

function SearchForm({value, changeVal}) {

  const handleChanges = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    const inputVal = e.target.value;
    changeVal(inputVal)
  }
  return (
    <form action="">
      <input type="text" value={value} onChange={handleChanges} />
      <Button value={value} />
    </form>
  );
}

export default SearchForm;
