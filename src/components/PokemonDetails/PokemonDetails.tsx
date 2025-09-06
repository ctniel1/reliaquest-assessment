import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { PokemonBasic } from 'src/hooks/useGetPokemons';

type PokemonDetailsProps = {
  selectedPokemon: PokemonBasic;
  onClose: () => void;
};

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({ selectedPokemon, onClose, ...props }) => {
  const classes = useStyles();
  const { pokemon, loading } = useGetPokemon(selectedPokemon.id, selectedPokemon.name);
  const { name, image, number, types, weight, height, classification, resistant, weaknesses, maxHP, maxCP } = pokemon;
  const { minimum: minWeight, maximum: maxWeight } = weight || {};
  const { minimum: minHeight, maximum: maxHeight } = height || {};

  return (
    <div className={classes.backdrop}>
      <div {...props} className={classes.modal}>
        <button onClick={onClose} className={classes.closeButton}>X</button>
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <h2>{`${number} - ${name}`}</h2>
            <img src={image} alt={name} className={classes.image} />
            <div className={classes.info}>
              <p><strong>Classification:</strong> {classification}</p>
              <p><strong>Types:</strong> {types?.join(', ')}</p>
              <p><strong>Weight:</strong> {minWeight} - {maxWeight}</p>
              <p><strong>Height:</strong> {minHeight} - {maxHeight}</p>
              <p><strong>Resistant:</strong> {resistant?.join(', ')}</p>
              <p><strong>Weaknesses:</strong> {weaknesses?.join(', ')}</p>
              <p><strong>Max HP:</strong> {maxHP}</p>
              <p><strong>Max CP:</strong> {maxCP}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      background: '#333',
      borderRadius: 8,
      boxShadow: '0 4px 32px rgba(0,0,0,0.2)',
      padding: 32,
      textAlign: 'center',
      minWidth: 320,
      maxWidth: 400,
      position: 'relative',
      zIndex: 1001,
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      background: 'transparent',
      border: 'none',
      fontSize: 18,
      cursor: 'pointer',
      color: '#fff',
    },
    image: {
      width: 200,
      height: 200,
      objectFit: 'contain',
    },
    info: {
      textAlign: 'left',
      marginTop: 16,
      '& p': {
        margin: '4px 0',
      },
    },
  },
  { name: 'PokemonDetails' }
);
