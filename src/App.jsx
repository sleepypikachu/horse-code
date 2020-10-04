import React, {useReducer, useRef} from 'react';
import './App.css';
import {HORSE_TO_ASCII, ASCII_TO_HORSE, asciiToHorse, horseToAscii} from './translate';
import {Button, Grid, Container, ButtonGroup} from "@material-ui/core";
import ForkMeOnGithub from 'fork-me-on-github';
import TextField from "@material-ui/core/TextField";
import AboutDialog from "./components/AboutDialog";
import useClippy from "use-clippy";
import {Assignment, Bathtub, Cached, FileCopy} from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import withStyles from "@material-ui/core/styles/withStyles";
import withWidth from "@material-ui/core/withWidth";
import Hidden from "@material-ui/core/Hidden";

const TOGGLE = 'TOGGLE';
const PASTE_TEXT = 'PASTE_TEXT';
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
            case PASTE_TEXT:
                const first = action.value.trimStart().slice(0, 2);
                return {
                    ...state,
                    text: action.value,
                    direction: (first === '🐎' || first === '🐴') ? HORSE_TO_ASCII : ASCII_TO_HORSE,
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

const ContentButton = withStyles(theme => ({
    root: {
        color: green[500],
        '&:hover': {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
        },
    },
}))(Button);

const SmXsButton = withWidth()((props) => {
    const {width} = props;
    return (width === 'sm' || width === 'xs') && <Button {...props}/>
})

function App() {

    const [clipboard, setClipboard] = useClippy();
    const [{direction, text, showAbout}, dispatch] = useReducer(reducer, initialState);
    const ref = useRef(null);

    const toggle = () => dispatch({type: TOGGLE});

    const translationFunction = direction === HORSE_TO_ASCII ? horseToAscii : asciiToHorse;
    const translation = translationFunction(text);

    const copy = () => setClipboard(translation);

    const paste = () => dispatch({type: PASTE_TEXT, value: clipboard});

    const clear = () => dispatch({type: CHANGE_TEXT, value: ''});

    const onPaste = (evt) => {
        evt.preventDefault();
        dispatch({type: PASTE_TEXT, value: evt.clipboardData.getData("text")});
    }

    return (
    <div className="App">
        <ForkMeOnGithub repo={"https://github.com/sleepypikachu/horse-code"}/>
        <Container>
            <h1>Horse Code</h1>
            <Grid container spacing={2} direction={"column"}>
                <Grid item>
                    <TextField inputRef={ref} fullWidth={true} label={direction === HORSE_TO_ASCII ? "Horse Code" : "Text"} value={text} onChange={(evt) => dispatch({type: CHANGE_TEXT, value: evt.target.value})} onPaste={onPaste}/>
                </Grid>
                <Grid item>
                    <TextField fullWidth={true} label={direction === HORSE_TO_ASCII ? "Text": "Horse Code"} value={translation}/>
                </Grid>
                <Grid item container justify={"space-between"}>
                    <Hidden smDown={true}>
                        <Button variant={"outlined"} onClick={() => dispatch({type: OPEN_DIALOG})}>About</Button>
                    </Hidden>
                    <Grid item sm={12} xs={12} md={"auto"}>
                        <ButtonGroup variant={"outlined"}>
                            <SmXsButton variant={"outlined"} onClick={() => dispatch({type: OPEN_DIALOG})}>About</SmXsButton>
                            <ContentButton onClick={copy} startIcon={<FileCopy/>}>Copy</ContentButton>
                            {(clipboard && clipboard.length > 0) && <ContentButton onClick={e => paste(e)} startIcon={<Assignment/>}>Paste</ContentButton>}
                            <ContentButton onClick={clear} startIcon={<Bathtub/>}>Clear</ContentButton>
                            <Button color={"primary"} onClick={toggle} startIcon={<Cached/>}>Toggle</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        <AboutDialog open={showAbout} close={() => dispatch({type: CLOSE_DIALOG})}/>
    </div>
    );
}

export default App;
