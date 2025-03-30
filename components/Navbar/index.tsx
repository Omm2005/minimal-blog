import React from 'react'
import AvatarCard from './AvatarCard'
import { ModeToggle } from './ModeToggle'
import SearchBar from './SearchBar'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='w-screen py-4 z-50 flex flex-row justify-between items-center md:px-10 px-3 bg-background fixed gap-5' >
        <AvatarCard />
        <div className='flex flex-row justify-end items-center gap-3' >
            <SearchBar />
            <ModeToggle />
        </div>
    </nav>
  )
}

export default Navbar