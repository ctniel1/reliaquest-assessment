import React from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonBasic } from '../../hooks/useGetPokemons';

type ListItemProps = {
  pokemon: PokemonBasic;
  handleClick: () => void;
};

export const ListItem: React.FC<ListItemProps> = ({ pokemon, handleClick, ...props }) => {
  const classes = useStyles();
  const { id, name, image, number, types } = pokemon;

  return (
    <div {...props} className={classes.item} onClick={handleClick}>
      <img src={image} alt={name} className={classes.image} />
      <div className={classes.name}>{`${number} - ${name}`}</div>
      <div className={classes.types}>
        {types.map((type) => (
          <span key={type} className={classes.type}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      margin: '40px auto',
      width: '50%',
      gap: 16,
      boxSizing: 'border-box',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#a0a0a0',
        cursor: 'pointer',
      },
    },
    image: {
      width: 100,
      height: 100,
    },
    name: {
      fontWeight: 'bold',
      marginTop: 8,
    },
    types: {
      marginTop: 4,
    },
    type: {
      display: 'inline-block',
      backgroundColor: '#eee',
      borderRadius: 4,
      padding: '2px 6px',
      marginRight: 4,
      fontSize: 12,
      color: '#555',
    },
  },
  { name: 'ListItem' }
);
