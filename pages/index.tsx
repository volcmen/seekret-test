import Layout from "@components/Layout";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    root: {
        placeItems: "center",
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        gap: "1rem",
    },
    grow: {
        flexGrow: 1,
    },
});

export default function Home(): JSX.Element {
    const classes = useStyles();

    const [userSubCount, setUserSubCount] = useState<number | null>(null);

    useEffect(() => {
        const count = localStorage.getItem("num-sub");
        if (count && count !== "") {
            const parsedNum = Number.parseInt(count, 10);

            // Check if parsed successfully.
            if (isNaN(parsedNum)) {
                localStorage.removeItem("num-sub");
                return;
            }

            setUserSubCount(parsedNum);
        }
    }, []);

    return (
        <Layout>
            <Container className={classes.root}>
                {userSubCount ? (
                    <div>
                        <Typography variant="h1">
                            user&apos;s selected: {userSubCount}
                        </Typography>
                        <Typography variant="h2">user subscribed</Typography>
                    </div>
                ) : (
                    <Typography variant="h1">Welcome</Typography>
                )}

                <div className={classes.grow} />

                <Link href="/sub">
                    <Button color="primary" variant="contained">
                        Go To subscribe page
                    </Button>
                </Link>
            </Container>
        </Layout>
    );
}
