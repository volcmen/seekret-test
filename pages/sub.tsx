import FormDialog from "@components/FormDialog";
import Layout from "@components/Layout";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Head from "next/head";
import { Fragment, useState } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        placeContent: "center",
        placeItems: "center",
        textAlign: "center",
    },
});

export default function SubscibePage(): JSX.Element {
    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <Fragment>
            <Head>
                <title>Subscribtion page</title>
            </Head>
            <Layout>
                <Container className={classes.root}>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleDialogOpen}>
                        Subscribe to our channel
                    </Button>
                </Container>

                <FormDialog open={dialogOpen} onClose={handleDialogClose} />
            </Layout>
        </Fragment>
    );
}
