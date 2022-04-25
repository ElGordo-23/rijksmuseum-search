import { createStyles, Grid, SimpleGrid } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useGeneralSearch } from '../API/generalSearch';

const useStyles = createStyles(() => ({
  wrapper: {
    maxWidth: 1200,
    width: '100%',
    height: '100%',
  },
  child: {
    minHeight: '3rem',
    maxWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#faf8e6',
    backgroundSize: 'cover',
    padding: 15,
  },
  image: {
    maxWidth: '100%',
    height: 300,
    objectFit: 'contain',
  },
}));

export function Results() {
  const { searchTerm } = useParams();
  const { classes } = useStyles();
  const navigate = useNavigate();

  const { data: searchResult } = useGeneralSearch(searchTerm);

  return (
    <div>
      <h2>{searchTerm}</h2>
      <SimpleGrid className={classes.wrapper} cols={3}>
        {searchResult?.artObjects.map((item) => (
          <div className={classes.child}>
            <img
              src={item.headerImage.url}
              alt="artwork"
              className={classes.image}
              onClick={() => navigate(`/artPiece/${item.objectNumber}`)}
            />
            <div>{item.longTitle}</div>
            <div>{item.principalOrFirstMaker}</div>
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}
