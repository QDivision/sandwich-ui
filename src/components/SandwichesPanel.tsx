import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchSandwiches, postSandwich } from 'requests';
import { useFood } from 'food';

const isNonNullish = <T extends any>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    margin: '32px',
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const SandwichesPanel = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [bread, setBread] = useState<string>('');
  const [condiments, setCondiments] = useState<string[]>(['']);
  const [layers, setLayers] = useState<string[]>(['']);

  const { ingredients, sandwiches, setSandwiches } = useFood();

  const findIngredient = (name: string) =>
    ingredients.find((ingredient) => ingredient.name === name);

  const refreshSandwiches = () =>
    fetchSandwiches().then((newSandwiches) => setSandwiches(newSandwiches));

  useEffect(() => {
    refreshSandwiches();
  }, []); // eslint-disable-line

  const ingredientMenuItems = [
    <MenuItem key="none" value="">
      <em>None</em>
    </MenuItem>,
    ...ingredients.map(({ name, emoji }, idx) => (
      <MenuItem key={name} value={name}>
        {name} {emoji}
      </MenuItem>
    )),
  ];

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Sandwiches
        </Typography>
        <Typography variant="body2" component="span">
          <ul>
            {sandwiches.map(({ name, bread, condiments, layers }) => (
              <li key={name}>
                {name} - {bread.name} {bread.emoji}
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
            postSandwich({
              name,
              bread: findIngredient(bread)!,
              condiments: condiments.map(findIngredient).filter(isNonNullish),
              layers: layers.map(findIngredient).filter(isNonNullish),
            }).then(() => {
              refreshSandwiches();
              setName('');
              setBread('');
              setCondiments(['']);
              setLayers(['']);
            });
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <TextField
              size="small"
              label="Name"
              variant="outlined"
              required
              style={{ flex: 1 }}
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />

            <div style={{ width: '16px' }} />

            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <InputLabel id="bread-label">Bread</InputLabel>
              <Select
                id="bread"
                label="Bread"
                labelId="bread-label"
                value={bread}
                onChange={(ev) => setBread(ev.target.value as any)}
                variant="outlined"
              >
                {ingredientMenuItems}
              </Select>
            </FormControl>
          </div>

          <div style={{ height: '16px' }} />

          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              {condiments.map((condiment, idx) => (
                <FormControl
                  key={`condiment-${idx}`}
                  variant="outlined"
                  size="small"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  <InputLabel id={`condiment-${idx}-label`}>
                    Condiment {idx}
                  </InputLabel>
                  <Select
                    id={`condiment-${idx}`}
                    label={`Condiment ${idx}`}
                    labelId={`condiment-${idx}-label`}
                    value={condiment}
                    onChange={(ev) => {
                      const condimentName = ev.target.value as string;

                      const newCondiments = condiments.map((c, cIdx) =>
                        cIdx === idx ? condimentName : c,
                      );

                      if (idx === condiments.length - 1) {
                        setCondiments(newCondiments.concat(''));
                      } else {
                        setCondiments(newCondiments);
                      }
                    }}
                    variant="outlined"
                  >
                    {ingredientMenuItems}
                  </Select>
                </FormControl>
              ))}
            </div>

            <div style={{ width: '16px' }} />

            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              {layers.map((layer, idx) => (
                <FormControl
                  key={`layer-${idx}`}
                  variant="outlined"
                  size="small"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  <InputLabel id={`layer-${idx}-label`}>Layer {idx}</InputLabel>
                  <Select
                    id={`layer-${idx}`}
                    label={`Layer ${idx}`}
                    labelId={`layer-${idx}-label`}
                    value={layer}
                    onChange={(ev) => {
                      const layerName = ev.target.value as string;

                      const newLayers = layers.map((l, lIdx) =>
                        lIdx === idx ? layerName : l,
                      );

                      if (idx === layers.length - 1) {
                        setLayers(newLayers.concat(''));
                      } else {
                        setLayers(newLayers);
                      }
                    }}
                    variant="outlined"
                  >
                    {ingredientMenuItems}
                  </Select>
                </FormControl>
              ))}
            </div>
          </div>

          <Button color="primary" type="submit">
            Add
          </Button>
        </form>
      </CardActions>
    </Card>
  );
};

export default SandwichesPanel;
