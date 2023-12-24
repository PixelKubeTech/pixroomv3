import React from 'react'

function Button({text , className, handleClick} : any) {
  return (
   <button 
   className={`bg-[#58968b] rounded-md 
   w-fit h-[40px] p-1 px-2 text-white ${className}`}
   onClick={handleClick}
   >
    {text}
    </button>
  )
}

export default Button