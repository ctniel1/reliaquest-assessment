import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { ListItem } from '../ListItem';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  const [filteredPokemons, setFilteredPokemons] = React.useState(pokemons);

  React.useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  

  return (
    <div className={classes.root}>
      <input className={classes.searchInput} placeholder="Search Pokemon" onChange={(e) => {
        const search = e.target.value.toLowerCase();
        setFilteredPokemons(
          pokemons.filter((p) => p.name.toLowerCase().includes(search))
        );
      }} />
      {loading && <div>Loading...</div>}
      {filteredPokemons.map((pkmn) => (
        <ListItem pokemon={pkmn} key={pkmn.id} />
      ))}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    searchInput: {
      padding: '8px 16px',
      fontSize: 16,
      width: '100%',
      maxWidth: 400,
      marginBottom: 24,
      borderRadius: 8,
      border: '1px solid #ddd',
      boxSizing: 'border-box',
      color: '#333',
    },
  },
  { name: 'PokemonList' }
);
