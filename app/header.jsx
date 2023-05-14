import Link from 'next/link'
import React from 'react'
import {LogoutBtn} from '../components/Clients'

const Header = () => {
  return (
    <div className='header'>
    <div>
        <h2>Todo .</h2>
    </div>
    <article>
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        {/* We only create a specfically client side component of that element which ever has needed in the server side component  */}
        <LogoutBtn /> 
    </article>

    </div>
  )
}

export default Header