import { FilterOptionsState } from "@material-ui/lab";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

export interface OptionType {
    inputValue?: string;
    title: string;
}

const filter = createFilterOptions<OptionType>({ limit: 3 });

export const getOptionLabel = (option: OptionType): string => {
    // Value selected with enter, right from the input
    if (typeof option === "string") {
        return option;
    }
    // Add new option that created dynamically
    if (option.inputValue) {
        return option.inputValue;
    }
    // Regular select.
    return option.title;
};

export const filterOptions = (
    options: OptionType[],
    params: FilterOptionsState<OptionType>,
): OptionType[] => {
    const filtered = filter(options, params);

    // Create new option on top.
    if (params.inputValue !== "") {
        filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
        });
    }

    return filtered;
};
