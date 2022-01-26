import React from 'react'
import { Link } from 'react-router-dom'


const MenuItem = ({ menuItem }) => {
    return (
        <li><Link to={menuItem.link}>{menuItem.title}</Link></li>
    )
}


const MenuList = ({ menuItems }) => {
    return (
        <nav>
            <ul>
                {menuItems.map((menuItem) => <MenuItem menuItem={menuItem} />)}
            </ul>
        </nav>
    )
}


export default MenuList 