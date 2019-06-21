import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';


const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ProfileIcon src={'https://news-24.ru/wp-content/uploads/2019/04/photo_2019-04-08_10-10-38.jpg'}
                             onRouteChange={ onRouteChange }
                             toggleModal={ toggleModal }/>
            </nav>
        );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')}
                   className="f3 link dim black underline pa3 pointer">
                    Sign In
                </p>
                <p onClick={() => onRouteChange('register')}
                   className="f3 link dim black underline pa3 pointer">
                    Register
                </p>
            </nav>
        );
    }
};

export default Navigation;