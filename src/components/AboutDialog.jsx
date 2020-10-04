import React from 'react';
import {IconButton, Container, Grid, Dialog} from "@material-ui/core";
import {Cancel} from '@material-ui/icons';

export default (props) => {
    return <Dialog open={props.open} onClose={props.close}>
        <Container>
            <Grid container direction={"row"} alignItems={"center"} justify={"space-between"}>
                <Grid item>
                    <h2>Horse Code</h2>
                </Grid>
                <Grid item>
                    <IconButton onClick={props.close}>
                        <Cancel color={"secondary"}/>
                    </IconButton>
                </Grid>
            </Grid>
            <p>Horse code because:</p>
            <ul>
                <li>There are two horse emoji</li>
                <li>One is short <span role='img' aria-label='Horse Head Emoji'>🐴</span></li>
                <li>One is long <span role='img' aria-label='Horse Emoji'>🐎</span></li>
                <li>Horse rhymes with Morse</li>
            </ul>
            <p>Originally this project was to explore angularjs but I have re-written it in React for <a href={"https://hacktoberfest.digitalocean.com/"}>Hacktoberfest</a> 2020 to explore Material UI, React functional components and the useReducer hook.</p>
        </Container>
    </Dialog>;
}