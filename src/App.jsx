import React, {useReducer, useRef} from 'react';
import './App.css';
import {HORSE_TO_ASCII, ASCII_TO_HORSE, asciiToHorse, horseToAscii} from './translate';
import {Button, Grid, Container, ButtonGroup} from "@material-ui/core";
import ForkMeOnGithub from 'fork-me-on-github';
import TextField from "@material-ui/core/TextField";
import AboutDialog from "./components/AboutDialog";

const TOGGLE = 'TOGGLE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const OPEN_DIALOG = 'OPEN_DIALOG';
const CLOSE_DIALOG = 'CLOSE_DIALOG';

const reducer = (state, action) => {
    const {direction, text} = state;
    if (action && action.type) {
        switch (action.type) {
            case TOGGLE:
                return {
                    ...state,
                    direction: direction === HORSE_TO_ASCII ? ASCII_TO_HORSE : HORSE_TO_ASCII,
                    text: direction === ASCII_TO_HORSE ? asciiToHorse(text) : horseToAscii(text),
                }
            case CHANGE_TEXT:
                return {
                    ...state,
                    text: action.value,
                }
            case OPEN_DIALOG:
                return {
                    ...state,
                    showAbout: true,
                }
            case CLOSE_DIALOG:
                return {
                    ...state,
                    showAbout: false,
                }
            default:
                return state;
        }
    }
    return state;
};

const initialState = {
    direction: ASCII_TO_HORSE,
    text: 'A horse, of course!',
    showAbout: false,
};

function App() {

    const [{direction, text, showAbout}, dispatch] = useReducer(reducer, initialState);
    const ref = useRef(null);

    const toggle = () => dispatch({type: TOGGLE});

    const translationFunction = direction === HORSE_TO_ASCII ? horseToAscii : asciiToHorse;
    const translation = translationFunction(text);

    const copy = () => {
        navigator.clipboard.writeText(translation)
            .catch(console.error);
    }

    return (
    <div className="App">
        <ForkMeOnGithub repo={"https://github.com/sleepypikachu/horse-code"}/>
        <Container>
            <h1>Horse Code</h1>
            <Grid container spacing={2} direction={"column"}>
                <Grid item>
                    <TextField fullWidth={true} label={direction === HORSE_TO_ASCII ? "Horse Code" : "Text"} value={text} onChange={(evt) => dispatch({type: CHANGE_TEXT, value: evt.target.value})}/>
                </Grid>
                <Grid item>
                    <TextField inputRef={ref} fullWidth={true} label={direction === HORSE_TO_ASCII ? "Text": "Horse Code"} value={translation}/>
                </Grid>
                <Grid item container justify={"flex-end"}>
                    <ButtonGroup variant={"contained"}>
                        <Button onClick={() => dispatch({type: OPEN_DIALOG})}>About</Button>
                        <Button onClick={copy} color={"secondary"}>Copy</Button>
                        <Button color={"primary"} onClick={toggle}>Toggle</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Container>
        <AboutDialog open={showAbout} close={() => dispatch({type: CLOSE_DIALOG})}/>
    </div>
    );
}

export default App;
