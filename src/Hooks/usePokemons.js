// import { useState, useEffect } from "react"

// export const usePokemon = () => {
//   const [pokemons, setPokemons] = useState()
//   const [text, setText] = useState()
//   const [types, setTypes] = useState([])

//   const handleType = (e) => {
//     const isChecked = e.target.checked;
//     const value = e.target.value;
//     console.log(isChecked)
//     setSelectedTypes((prev) => 
//         isChecked === true
//         ? [...prev, value]
//         : prev.filter((type) => type !== value)
//     );
//   };


//   /**
//    * 全てのポケモンを取得
//    */
//   useEffect(() => {
//     fetche("https://hogehoge.com").then((res) => res.json()).then((data) => {
//       setPokemons(data)
//     })
//   }, [])


//   /**
//    * typesでfilter
//    */
//   useEffect(() => {
//     setPokemons((prevPokemons) => {
//       prevPokemons.filter((pokemon) => pokemonのtypeがtypesに含まれている場合true)
//     })
//   }, [types])


//   /**
//    * ポケモンをtextでfilter
//    */
//   useEffect(() => {
//     setPokemons((prevPokemons) => {
//       prevPokemons.filter((pokemon) => pokemonのnameにtextが含まれている場合true)
//     })
//   }, [text])


//   return {
//     pokemons,
//     text,
//     setText,
//     types,
//     setTypes,
//     handleType
//   }
// }