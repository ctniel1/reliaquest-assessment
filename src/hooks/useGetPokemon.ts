import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  types: string[];
  image: string;
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

export const useGetPokemon = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || {}, [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => [pokemon].map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemon]
  );

  return {
    pokemon,
    pokemonOptions,
    ...queryRes,
  };
};
