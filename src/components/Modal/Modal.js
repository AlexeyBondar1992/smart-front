import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends React.Component {
    constructor (props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount () {
        modalRoot.append(this.el);
    }

    componentWillUnmount () {
        this.el.remove();
    }

    render () {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}