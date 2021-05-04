import AppBar from "@material-ui/core/AppBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function TopMenu(): JSX.Element {
    const classes = useStyles();

    const CompName = process.env.NEXT_PUBLIC_COMPANY_NAME;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Image src="/assets/logo.svg" width={70} height={70} />

                    <Typography variant="h5" noWrap>
                        {CompName}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
