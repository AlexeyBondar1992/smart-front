import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ProfileIcon extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    render () {
        const { onRouteChange, toggleModal } = this.props;
        return (
            <Dropdown className="pa4 tc" isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
                <DropdownToggle tag="span"
                                data-toggle="dropdown"
                                aria-expanded={ this.state.dropdownOpen }>
                    <img src={ this.props.src }
                         className="br-100 ba h3 w3 dib"
                         alt="avatar"/>
                </DropdownToggle>
                <DropdownMenu className="b--transparent shadow-5"
                              style={{
                                  backgroundColor: 'rgba(255 ,255, 255, 0.5)',
                                  left: '-70px',
                                  marginTop: '-20px'
                              }}>
                    <DropdownItem onClick={() => toggleModal()}>View Profile</DropdownItem>
                    <DropdownItem onClick={() => onRouteChange('signout')}>Sign out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}