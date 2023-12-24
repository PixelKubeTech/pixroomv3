export default function Button({ children , onClick, style}: any) {
   return( 
    <button onClick={onClick} className={"btn btn-primary " + style}>
        {children}
    </button>
   )
}