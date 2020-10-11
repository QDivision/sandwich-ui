import React from 'react';
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
  name: {},
}));

const SandwichesPanel = () => {
  const classes = useStyles();
  const [bread, setBread] = React.useState('');
  const [condiments, setCondiments] = React.useState<string[]>([]);
  const [layers, setLayers] = React.useState<string[]>([]);

  const handleChange = (event: any) => {
    setBread(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Sandwiches
        </Typography>
        <Typography variant="body2" component="span">
          <ul>
            {[
              {
                name: 'BLT',
                bread: { name: 'sourdough', emoji: '🍞' },
                condiments: [
                  { name: 'ketchup', emoji: '🍅' },
                  { name: 'mustard', emoji: '🌭' },
                ],
                layers: [
                  { name: 'bacon', emoji: '🥓' },
                  { name: 'lettuce', emoji: '🥬' },
                  { name: 'tomato', emoji: '🍅' },
                ],
              },
              {
                name: 'French Dip',
                bread: { name: 'baguette', emoji: '🥖' },
                condiments: [{ name: 'beef broth', emoji: '🐄' }],
                layers: [
                  { name: 'onion', emoji: '😢' },
                  { name: 'cheese', emoji: '🧀' },
                  { name: 'beef', emoji: '🥩' },
                ],
              },
            ].map(({ name, bread, condiments, layers }) => (
              <li key={name}>
                {name} - {bread.name} {bread.emoji}
              </li>
            ))}
          </ul>
        </Typography>
      </CardContent>

      <CardActions>
        <form className={classes.form} onSubmit={(ev) => ev.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <TextField
              className={classes.name}
              size="small"
              label="Name"
              variant="outlined"
              required
              style={{ flex: 1 }}
            />

            <div style={{ width: '16px' }} />

            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <InputLabel id="bread-label">Bread</InputLabel>
              <Select
                labelId="bread-label"
                value={bread}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
              {condiments.concat('').map((condiment, idx) => (
                <FormControl
                  key={`condiment-${idx}`}
                  variant="outlined"
                  size="small"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  <InputLabel id={`condiment-label-${idx}`}>
                    Condiment {idx}
                  </InputLabel>
                  <Select
                    labelId={`condiment-label-${idx}`}
                    value={condiment}
                    onChange={() => {
                      if (idx === condiments.length) {
                        setCondiments(condiments.concat(''));
                      }
                    }}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
              {layers.concat('').map((layer, idx) => (
                <FormControl
                  key={`layer-${idx}`}
                  variant="outlined"
                  size="small"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  <InputLabel id={`layer-label-${idx}`}>Layer {idx}</InputLabel>
                  <Select
                    labelId={`layer-label-${idx}`}
                    value={layer}
                    onChange={() => {
                      if (idx === layers.length) {
                        setLayers(layers.concat(''));
                      }
                    }}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
