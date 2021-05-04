import TopMenu from "@components/TopMenu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "100vw",
            maxHeight: "100vh",
            overflow: "hidden",
        },
        main: {
            overflow: "auto",
            height: "calc(100vh - 70px)",
            padding: theme.spacing(0, "8vw"),
        },
    }),
);

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopMenu />
            <main className={classes.main}>{children}</main>
        </div>
    );
}
