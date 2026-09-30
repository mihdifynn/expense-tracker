import TextField, { type TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";



type Props = Omit<TextFieldProps, 'value' | 'onChange' | 'type'> & {
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  decimal?: boolean;
}


export default function NumberTextField(props: Props) {

  const {
    value,
    onChange,
    min,
    max,
    decimal = false,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    const pattern = decimal ? /^\d*\.?\d*$/ : /^\d*$/;
    if (!pattern.test(val)) return

    onChange(val);
  }

  const numericValue = value === "" ? undefined : Number(value);

  const outOfRange = numericValue !== undefined && (
    (min !== undefined && numericValue < min) ||
    (max !== undefined && numericValue > max)
  );

  return (
    <TextField
      {...rest}
      value={value}
      onChange={handleChange}
      error={rest.error  || outOfRange}
      slotProps={{
        htmlInput: {
          inputMode: decimal ? 'decimal' : 'numeric',
          min,
          max,
          ...rest.slotProps?.htmlInput
        },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              Rp.
            </InputAdornment>
          )
        },
        ...rest.slotProps
      }}
    />
  )
}