import Avatar from "@material-ui/core/Avatar";
import MuiChip, { ChipProps } from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        maxHeight: "50px",
    },
});

export default function Chip({
    label,
    onDelete,
    ...props
}: ChipProps): JSX.Element {
    const classes = useStyles();

    return (
        <MuiChip
            className={classes.root}
            avatar={<Avatar alt="chip icon" src="/assets/svg-flat.svg" />}
            label={label}
            {...(onDelete && { onDelete: onDelete })}
            {...props}
        />
    );
}
