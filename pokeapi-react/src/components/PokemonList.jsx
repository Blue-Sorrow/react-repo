import {useContext} from "react";
import {PokemonContext} from "../context/PokemonContext.jsx";
import {CardPokemon} from "./CardPokemon.jsx";

export const PokemonList = () => {
    const {pokemons} = useContext(PokemonContext)
    return (
        <>
            <div className="card-list-pokemon container">
                {pokemons.map(pokemon => (<CardPokemon pokemon={pokemon} key={pokemon.id}/>))}
            </div>
        </>
    )
}
