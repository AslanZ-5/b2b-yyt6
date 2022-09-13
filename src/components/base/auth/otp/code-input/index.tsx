import { OutlinedInput } from '@material-ui/core'
import React, { useState, useRef, FC, useEffect } from 'react'

interface ICodeInput {
  onChange: (value: string) => void
  className?: string
  isError?: boolean
}
const initialValues = ['', '', '', '', '', '']
export const CodeInput: FC<ICodeInput> = ({
  onChange,
  className,
  isError,
}) => {
  const inputsRef = useRef<{ [x: string]: HTMLInputElement }>({})
  const [inputValues, setInputValues] = useState(initialValues)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value

    if (value.length === inputValues.length && !/[^0-9]/.test(value)) {
      setInputValues([...value.split('')])
      onChange(value)
      inputsRef.current[inputValues.length - 1].focus()
    }
  }
  const onKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let inputId = +e.currentTarget.id
    const isBackspace = e.keyCode === 8
    const value = isBackspace ? '' : e.nativeEvent.key
    const isValue = value !== ''
    const isExit = /[^0-9]/.test(value) && isValue

    if (isExit) return

    const isFirstValue = !inputValues.filter(Boolean).length

    let newInputValues = [...inputValues]

    if (isFirstValue || isError) {
      inputId = 0
      newInputValues = [...initialValues]
    }

    newInputValues[inputId] = value

    const isNextInput =
      newInputValues[inputId] !== '' &&
      isValue &&
      inputId !== inputValues.length - 1

    if (isNextInput) inputId = inputId + 1

    const isPrevValue =
      isBackspace && inputValues[inputId] === '' && inputId !== 0

    if (isPrevValue) inputId = inputId - 1

    onChange(newInputValues.join(''))
    setInputValues(newInputValues)

    inputsRef.current[inputId].focus()
  }

  useEffect(() => {
    inputsRef.current[0].focus()
  }, [])

  return (
    <div className={className}>
      {inputValues.map((val, index) => {
        const id = index.toString()

        return (
          <OutlinedInput
            placeholder=' - '
            onKeyUp={onKeyUp}
            onChange={handleInputChange}
            value={val}
            key={index}
            inputProps={{ inputMode: 'numeric' }}
            id={id}
            inputRef={(ref: HTMLInputElement) => {
              if (ref) inputsRef.current[id] = ref
            }}
            style={{ width: '40px', height:"48px" }}
          />
        )
      })}
    </div>
  )
}
