import { useToast, UseToastOptions } from '@chakra-ui/react'

export const useErrorToast = (props?: UseToastOptions) => {
  const errorToast = useToast({
    ...props,
    status: 'error',
    description: props?.description ?? 'An error ocurred',
    position: props?.position ?? 'bottom-right',
  })

  return {
    errorToast,
  }
}
