import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useFood } from 'food';
import { fetchIngredients, postIngredient } from 'requests';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    marginRight: '12px',
  },
});

const IngredientsPanel = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');

  const { ingredients, setIngredients } = useFood();

  const refreshIngredients = () =>
    fetchIngredients().then((newIngredients) => setIngredients(newIngredients));

  useEffect(() => {
    refreshIngredients();
  }, []); // eslint-disable-line

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Ingredients
        </Typography>
        <Typography variant="body2" component="span">
          <ul>
            {ingredients.map(({ name, emoji }) => (
              <li key={name}>
                {name} {emoji}
              </li>
            ))}
          </ul>
        </Typography>
      </CardContent>

      <CardActions>
        <form
          className={classes.form}
          onSubmit={(ev) => {
            ev.preventDefault();
            postIngredient({ name, emoji }).then(() => {
              refreshIngredients();
              setName('');
              setEmoji('');
            });
          }}
        >
          <TextField
            className={classes.name}
            size="small"
            label="Name"
            variant="outlined"
            required
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <TextField
            size="small"
            label="Emoji"
            variant="outlined"
            required
            value={emoji}
            onChange={(ev) => setEmoji(ev.target.value)}
          />
          <Button color="primary" type="submit">
            Add
          </Button>
        </form>
      </CardActions>
    </Card>
  );
};

export default IngredientsPanel;
