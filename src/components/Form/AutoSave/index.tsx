import { useCallback, useEffect } from 'react'
import { useFormikContext } from 'formik'
import debounce from 'just-debounce-it'

interface Props {
  debounceMs: number
}

export default function AutoSave({ debounceMs }: Props) {
  const formik = useFormikContext()

  const debouncedSubmit = useCallback(
    () => debounce(() => formik.submitForm(), debounceMs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounceMs, formik.submitForm]
  )

  useEffect(() => {
    debouncedSubmit()
  }, [debouncedSubmit, formik.values])

  return <></>
}