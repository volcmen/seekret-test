import Chip from "@components/Chip";
import Button from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import { TransitionProps } from "@material-ui/core/transitions";
import Zoom from "@material-ui/core/Zoom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";
import { ChangeEvent, forwardRef, ReactElement, Ref, useState } from "react";

import { filterOptions, getOptionLabel, OptionType } from "./functions";

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>,
) {
    return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles({
    dialog: {
        height: "50%",
        width: "50%",
    },
    dialogActions: {
        placeContent: "center",
    },
    autoRoot: {
        maxHeight: "50px",
    },
    autoInput: {
        maxHeight: "50px",
    },
});

const limitTagsText = (more: number) => {
    return <Chip label={`${more} more`} />;
};

export default function FormDialog(props: DialogProps): JSX.Element {
    const router = useRouter();
    const classes = useStyles();

    const [selected, setSelected] = useState<string[]>([]);

    const handleChangeSub = (
        event: ChangeEvent<HTMLInputElement>,
        values: [OptionType],
    ) => {
        setSelected(
            values.map((elm: OptionType) => elm?.inputValue || elm.title),
        );
    };

    const handleSubscribe = () => {
        localStorage.setItem("num-sub", selected.length.toString());

        router.push("/");
    };

    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            classes={{ paper: classes.dialog }}
            {...props}>
            <DialogContent>
                <Autocomplete
                    onChange={handleChangeSub}
                    limitTags={3}
                    getLimitTagsText={limitTagsText}
                    classes={{
                        root: classes.autoRoot,
                        input: classes.autoInput,
                    }}
                    freeSolo
                    multiple
                    options={options}
                    getOptionLabel={getOptionLabel}
                    filterOptions={filterOptions}
                    filterSelectedOptions
                    renderOption={(option) => option.title}
                    renderTags={(tagValue, getTagProps) => {
                        return tagValue.map((option, idx) => (
                            <Chip
                                key={idx}
                                label={option?.inputValue || option.title}
                                tagProps={getTagProps({ index: idx })}
                            />
                        ));
                    }}
                    renderInput={(params) => (
                        <TextField
                            label="Subs"
                            variant="outlined"
                            placeholder="more"
                            {...params}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button onClick={handleSubscribe} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const options: OptionType[] = [
    { title: "consectetur" },
    { title: "esse" },
    { title: "enim" },
    { title: "non" },
    { title: "cupidatat" },
    { title: "deserunt" },
    { title: "mollit" },
    { title: "quis" },
    { title: "qui" },
    { title: "excepteur" },
    { title: "amet" },
    { title: "do" },
    { title: "non" },
    { title: "est" },
    { title: "irure" },
    { title: "dolor" },
    { title: "anim" },
    { title: "mollit" },
    { title: "culpa" },
    { title: "velit" },
    { title: "irure" },
    { title: "ut" },
    { title: "et" },
    { title: "est" },
    { title: "incididunt" },
    { title: "exercitation" },
    { title: "ad" },
    { title: "et" },
    { title: "ullamco" },
];
