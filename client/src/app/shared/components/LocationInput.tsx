import {Box, List, ListItemButton, TextField, Typography} from "@mui/material";
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";
import { useMap } from "../../../lib/hooks/useMap";

type Props<T extends FieldValues> = {
    label: string
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const { fieldState, field } = useController({ ...props });
    const { loading, suggestions, inputValue, handleChange, handleSelect } = useMap({
        value: field.value,
        onChange: field.onChange,
    });

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 && (
                <List sx={{border: 1}}>
                    {suggestions.map(suggestion => (
                        <ListItemButton
                            divider
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}>
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    );
}