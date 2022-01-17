import React from 'react'


const FooterContent = ({ footerContent }) => {
    return (
        <span>Copyright &copy;
            {footerContent.owner}
            , 
            {footerContent.year}
        </span>
    )
}


export default FooterContent