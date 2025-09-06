import React from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';

type ListItemProps = {
  pokemon: Pokemon;
};

export const ListItem: React.FC<ListItemProps> = ({ pokemon, ...props }) => {
  const classes = useStyles();
  const { id, name, image, number, types } = pokemon;

  return (
    
        <div {...props} className={classes.item}>
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
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      '&:hover': { backgroundColor: '#f9f9f9' }
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
    },
  },
  { name: 'ListItem' }
);
