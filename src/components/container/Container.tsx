import React from 'react'

function Container(props:{children:React.ReactNode,className?:string}) {
  return (
    <div style={{width:"90%",margin:"0 auto"}}  className={`my-component ${props.className}`}>
        {props.children}
    </div>
  )
}

export default Container