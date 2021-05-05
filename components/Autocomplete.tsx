import Chip from "@components/Chip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import {
    ChangeEvent,
    FocusEvent,
    Fragment,
    KeyboardEvent,
    MouseEvent,
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        list: {
            position: "absolute",
            listStyleType: "none",
            margin: 0,
            padding: 0,
            overflow: "auto",
        },
        popper: {
            zIndex: theme.zIndex.modal,
        },
        startAdornment: {
            flexWrap: "wrap",
            padding: "10px",
            paddingRight: "45px",
        },
        endAnd: {
            top: "calc(50% - 25px)",
            right: 0,
            position: "absolute",
            display: "none",
        },
        endAndOpen: {
            display: "initial",
        },
    }),
);

interface Props {
    options: any[];
    onChange: (values: string[]) => void;
}

interface ShowChipProps {
    selected: string[];
    onDelete: (title: string) => void;
    anchorEl?: any;
}

const ShowChips = (props: ShowChipProps) => {
    const handleDelete = (title: string) => () => {
        props.onDelete(title);
    };

    return (
        <Fragment>
            {props.anchorEl ? (
                props.selected.map((str, idx) => (
                    <Chip key={idx} onDelete={handleDelete(str)} label={str} />
                ))
            ) : (
                <Fragment>
                    {props.selected.slice(0, 3).map((str, idx) => (
                        <Chip
                            key={idx}
                            onDelete={handleDelete(str)}
                            label={str}
                        />
                    ))}
                    {props.selected.length >= 4 && (
                        <Chip label={`${props.selected.length - 3} more`} />
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default function Autocomplete(props: Props): JSX.Element {
    const classes = useStyles();

    const [selectedValues, setSelectedValues] = useState([]);

    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        let sameArSearch = false;

        let filtered = props.options.filter((elm) => {
            if (selectedValues.includes(elm.title)) {
                return false;
            }

            if (search !== "") {
                if (!sameArSearch) {
                    sameArSearch = elm.title === search;
                }
                return elm.title.includes(search);
            }
            return true;
        });

        if (
            !sameArSearch &&
            search !== "" &&
            !selectedValues.includes(search)
        ) {
            filtered.unshift({ title: `Add "${search}"`, inputText: search });
        }

        filtered = filtered.slice(0, 3);

        setFilteredData(filtered);
    }, [search, selectedValues]);

    useEffect(() => {
        props.onChange(selectedValues);
    }, [selectedValues]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearch(value);
    };

    const handleClearSearch = () => {
        setSearch("");
        setAnchorEl(null);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        // laggy
        // if (
        //     anchorEl !== null &&
        //     document.activeElement === anchorEl.parentElement
        // ) {
        //     anchorEl.focus();
        //     return;
        // }
        // setAnchorEl(null);
    };

    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
        if (event.currentTarget !== event.target) {
            return;
        }

        setAnchorEl(event.currentTarget);
    };

    const handleInputKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            if (!selectedValues.includes(search) && search !== "") {
                setSelectedValues((prevState) => [...prevState, search]);
                setSearch("");
            }
        }
    };

    const handleClickElm = (value) => () => {
        setSelectedValues((prevState) => [
            ...prevState,
            value.inputText || value.title,
        ]);
    };

    const handleDeleteElm = (value: string) => {
        const tmpArr = [...selectedValues];
        tmpArr.splice(tmpArr.indexOf(value), 1);

        setSelectedValues(tmpArr);
    };

    const listOpen = Boolean(anchorEl);

    return (
        <div>
            <TextField
                fullWidth
                label="Subs"
                variant="outlined"
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleClick}
                value={search}
                onKeyPress={handleInputKeyPress}
                InputProps={{
                    "aria-autocomplete": "list",
                    // ref: setAnchorEl,
                    className: classes.startAdornment,
                    startAdornment: (
                        <ShowChips
                            anchorEl={anchorEl}
                            selected={selectedValues}
                            onDelete={handleDeleteElm}
                        />
                    ),

                    endAdornment: (
                        <IconButton
                            onClick={handleClearSearch}
                            className={clsx(classes.endAnd, {
                                [classes.endAndOpen]: listOpen,
                            })}>
                            <CloseIcon />
                        </IconButton>
                    ),
                    role: "presentation",
                }}
            />

            <Popper
                open={listOpen}
                anchorEl={anchorEl}
                className={classes.popper}
                style={{
                    ...(anchorEl && { width: anchorEl.clientWidth }),
                }}>
                <ul className={classes.list}>
                    {filteredData.map((opt, idx) => (
                        <li key={idx}>
                            <Button onClick={handleClickElm(opt)}>
                                {opt.title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </Popper>
        </div>
    );
}
