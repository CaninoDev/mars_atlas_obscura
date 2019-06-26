import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        width: 345
    },
    media: {
        height: 140
    }
}

const ImageComponent = props => {
    const { classes, data } = props
    const { img_src, sol } = data;

    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <CardMedia className={classes.media} image={img_src} />
                    <Typography variant='caption' gutterBottom>Sol Days Since Mission Start: {sol}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default withStyles(styles)(ImageComponent);