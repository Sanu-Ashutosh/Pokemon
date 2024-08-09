import { useEffect, useState } from "react";
import "./index.css"
import Loading from "./Loading";
import { PokemonCards } from "./PokemonCards";
export let Pokemon = () => {
    let [pokemon, setPokemon] = useState([]);
    let [loading, setloading] = useState(true);
    let [error, setError] = useState("");
    let [search, setSearch] = useState("");


    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    //fetch api
    let fetchPokemon = async () => {
        try {
            let res = await fetch(API);
            let data = await res.json();
            console.log(data);

            let detailedpokemonData = data.results.map(async (curPokemon) => {
                let res = await fetch(curPokemon.url);
                let data = await res.json();
                // console.log(data);
                return data;
            });

            // console.log(detailedpokemonData)
            // let detailedResponse=Promise.all(detailedpokemonData)
            // .then((value)=>{
            //     console.log(value)
            // })

            let detailedResponse = await Promise.all(detailedpokemonData);
            setPokemon(detailedResponse);
            setloading(false);
            console.log(detailedResponse)

        } catch (error) {
            setloading(false);
            setError(error);
            console.log(error)
        }
    }

    useEffect(() => {
        //    setTimeout(() => {
        //     fetchPokemon();
        //    }, 1000);
        fetchPokemon();
    }, [])

    //Search Functionality
    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase()));

    if (loading) {
        return <Loading />
    }

    if (error) {
        <div>
            <h1>Error : {error.message}</h1>
        </div>
    }

    return <>
        <section className="container">
            <header>
                <h1>Lets Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                <input type="text" placeholder="Search pokemon" value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
            <div>
                <ul className="cards">
                    {
                        // pokemon.map((curPokemon) => {
                        searchData.map((curPokemon) => {
                            return (
                                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                            )
                        })
                    }
                </ul>
            </div>
            <section>
                <footer className="footer">
                    <p>CopyRight@sanu_ashutosh.com</p>
                </footer>
            </section>
        </section>
    </>
}