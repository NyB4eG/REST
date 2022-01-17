import React from 'react'


const MenuItem = ({ menuItem }) => {
    return (
        <li><a href={menuItem.link}>{menuItem.title}</a></li>
    )
}


const MenuList = ({ menuItems }) => {
    return (
        <ul>
            {menuItems.map((menuItem) => <MenuItem menuItem={menuItem} />)}
        </ul>
    )
}


export default MenuList 