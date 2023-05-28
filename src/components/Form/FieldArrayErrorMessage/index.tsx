import { FormErrorMessage } from '@chakra-ui/react'
import { Field, FieldProps, getIn } from 'formik'

interface Props {
  name: string
}

export default function FieldArrayErrorMessage({ name }: Props) {
  return (
    <Field name={name}>
      {({ form }: FieldProps) => {
        const error = getIn(form.errors, name)
        const touch = getIn(form.touched, name)
        return touch && error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : null
      }}
    </Field>
  )
}
