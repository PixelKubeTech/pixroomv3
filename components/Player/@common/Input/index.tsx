import React from 'react'

function Input({fillWidth,placeholder,register} : any) {
  return (
    <input 
  
    type={'text'}
    className={`rounded-md bg-white h-[40px] p-2 ${fillWidth ? 'w-full' : 'w-[50px]'}`}
    {...register}
    placeholder={placeholder}
    />
  )
}

export default Input