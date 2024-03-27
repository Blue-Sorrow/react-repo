import {PokemonContext} from "./PokemonContext.jsx";
import {useEffect, useState} from "react";
import {useForm} from "../hooks/useForm.js";

const baseUrl = "https://pokeapi.co/api/v2/"
export const PokemonProvider = ({children}) => {
    const [offset, setOffset] = useState(0);
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);

    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch: ''
    })

    const getPokemons = async (limit = 50) => {
        const res = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        })

        const results = await Promise.all(promises);
        setPokemons([
            ...pokemons,
            ...results
        ]);
        setLoading(false);
    }

    const getAllPokemons = async () => {
        const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
        const data = await res.json();

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        })

        const results = await Promise.all(promises);
        setAllPokemons(results);
        setLoading(false);
    }

    const getPokemonById = async (id) => {
        const res = await fetch(`${baseUrl}pokemon/${id}`);
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        getPokemons()
    }, [])

    useEffect(() => {
        getAllPokemons()
    }, [])

    return (<PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetForm,
        pokemons,
        allPokemons,
        getPokemonById
    }}>
        {children}
    </PokemonContext.Provider>)
}
