import { Container, createStyles, Grid } from '@mantine/core';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useGeneralSearch } from '../API/generalSearch';

const useStyles = createStyles(() => ({
  wrapper: {
    maxWidth: 1200,
    width: '100%',
    height: '100%',
  },
  child: {
    minHeight: 450,
    maxWidth: 250,
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    minHeight: 300,
    objectFit: 'cover',
  },
}));

export function Results() {
  const { searchTerm } = useParams();
  const { classes } = useStyles();

  const { data: searchResult } = useGeneralSearch(searchTerm);

  useEffect(() => console.log(searchResult), [searchResult]);

  return (
    <Grid className={classes.wrapper} gutter={20} columns={4}>
      {searchResult?.artObjects.map((item) => (
        <Grid.Col className={classes.child}>
          <img
            src={item.headerImage.url}
            alt="artwork"
            className={classes.image}
          />
          <div>{item.title}</div>
        </Grid.Col>
      ))}
    </Grid>
  );
}
