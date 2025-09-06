import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';

export type PokemonDetail = {
  id: string;
  number: string;
  name: string;
  types: string[];
  image: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export type PokemonOption = {
  value: PokemonDetail['id'];
  label: PokemonDetail['name'];
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

export const useGetPokemon = (id: string, name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id,
      name,
    },
  });

  const pokemon: PokemonDetail = useMemo(() => data?.pokemon || {}, [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => [pokemon].map((p: PokemonDetail) => ({ value: p.id, label: p.name })),
    [pokemon]
  );

  return {
    pokemon,
    pokemonOptions,
    ...queryRes,
  };
};
