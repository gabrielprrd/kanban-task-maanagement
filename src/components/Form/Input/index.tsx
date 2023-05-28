import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { FieldHookConfig, useField } from 'formik'
import { FC } from 'react'

interface Props {
  label: string
  name: string
}

const FieldWrapper: FC<Props & FieldHookConfig<string>> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props.name)

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel
        id={`${props.id}-${props.name}-label`}
        htmlFor={`${props.id}-${props.name}-input`}
        color="#828FA3"
        fontSize="small"
      >
        {label}
      </FormLabel>
      {props.children}
      <Input
        {...field}
        id={`${props.id}-${props.name}-input`}
        focusBorderColor="#635FC7"
      />
      <FormErrorMessage>{meta.error as string}</FormErrorMessage>
    </FormControl>
  )
}

export default FieldWrapper
