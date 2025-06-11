import Button from "./Button"
import TypeCheckBoxes from "./TypeCheckboxes"

function SearchForm({value, changeVal, selectedTypes, setSelectedTypes}) {

  const handleChanges = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    const inputVal = e.target.value;
    changeVal(inputVal)
  }
  return (
    <form action="">
      <input type="text" value={value} onChange={handleChanges} />
      <h2>タイプ検索</h2>
      <TypeCheckBoxes selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      <Button value={value} />
    </form>
  );
}

export default SearchForm;
