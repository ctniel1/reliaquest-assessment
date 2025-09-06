import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { ListItem } from '../ListItem';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  console.log(useGetPokemons());

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      {pokemons.map((pkmn) => (
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
  },
  { name: 'PokemonList' }
);
