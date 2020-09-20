import {
  FormFieldWrapper,
  Label,
  ErrorMessage,
  LabelText,
  Input,
  ColorWheel,
} from './styles';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  error?: string[];
  suggestions?: string[];
  onBlur: (
    event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  error,
  onBlur,
  onChange,
  suggestions,
}) => {
  const fieldId = `id_${name}`;
  const tag = type === 'textarea' ? 'textarea' : 'input';
  const isColor = type === 'color';
  const hasValue = Boolean(value && value.length);
  const hasSuggestions = Boolean(suggestions && suggestions.length);

  return (
    <FormFieldWrapper>
      <Label htmlFor={fieldId}>
        <Input
          as={tag}
          id={fieldId}
          value={value}
          type={type}
          name={name}
          hasValue={hasValue}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete={hasSuggestions ? 'off' : 'on'}
          list={hasSuggestions ? `suggestionFor_${fieldId}` : undefined}
        />
        {isColor && <ColorWheel />}
        <LabelText>{label}</LabelText>
        {hasSuggestions && (
          <datalist id={`suggestionFor_${fieldId}`}>
            {suggestions &&
              suggestions.map(suggestion => (
                <option
                  value={suggestion}
                  key={`suggestionFor_${fieldId}_option${suggestion}`}
                >
                  {suggestion}
                </option>
              ))}
          </datalist>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Label>
    </FormFieldWrapper>
  );
};

export default FormField;
