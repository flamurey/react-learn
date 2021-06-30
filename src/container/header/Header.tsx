import React, {ReactElement} from 'react';


const Header: React.FC<{}> = (props: {}): ReactElement => {
    return (
        <header className="header__logo">
            <a href='/#'>TOOL SHOP </a>
        </header>
    );
};

export default Header;