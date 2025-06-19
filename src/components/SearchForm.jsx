import Button from "./Button";
import TypeCheckBoxes from "./TypeCheckboxes";

function SearchForm({ text, handleText, types, handleTypes }) {
  return (
    <form action="">
      <h2>名前検索</h2>
      <input className="border border-gray-500" type="text" value={text} onChange={handleText} />
      <h2>タイプ検索</h2>
      <TypeCheckBoxes
        types={types}
        handleTypes={handleTypes}
      />
    </form>
  );
}

export default SearchForm;
