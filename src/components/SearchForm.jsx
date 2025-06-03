import { useState } from "react";
import Button from "./Button"

function SearchForm() {
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true)
  const handleChanges = (e) => {
    e.preventDefault()
    const inputVal = e.target.value;
    setValue(inputVal)
    if(inputVal === "") {
        setIsDisabled(true)
    } else {
        setIsDisabled(false)
    }
  }
  return (
    <form action="">
      <input type="text" value={value} onChange={handleChanges} />
      <Button isDisabled={isDisabled} />
    </form>
  );
}

export default SearchForm;
