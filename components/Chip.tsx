import Avatar from "@material-ui/core/Avatar";
import MuiChip, { ChipProps } from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { AutocompleteGetTagProps } from "@material-ui/lab/Autocomplete";

interface Props extends ChipProps {
    tagProps?: AutocompleteGetTagProps | Record<string, unknown>;
}

const useStyles = makeStyles({
    root: {
        maxHeight: "50px",
    },
});

export default function Chip({
    label,
    tagProps,
    ...props
}: Props): JSX.Element {
    const classes = useStyles();

    return (
        <MuiChip
            className={classes.root}
            avatar={<Avatar alt="chip icon" src="/assets/svg-flat.svg" />}
            label={label}
            {...tagProps}
            {...props}
        />
    );
}
