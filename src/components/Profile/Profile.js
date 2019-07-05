import React from 'react';
import './Profile.css';
import { ajax } from '../../helpers/AJAX';
import { APIMethods, APIUrls } from '../../constants';

const controls = {
    userName: 'name',
    userAge: 'age',
    userPet: 'pet'

};
const placeholders = {
    userName: 'Adam',
    userAge: '55',
    userPet: 'Dragon'
};

export default class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            pet: this.props.user.pet,
            age: this.props.user.age
        };
    }

    onFormChange = event => {
        if (this.state.hasOwnProperty(event.target.name)) {
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    onProfileUpdate = () => {
        ajax.makeRequest(`${ APIUrls.profile }/${ this.props.user.id }`, APIMethods.post, { formInput: this.state })
            .then(() => {
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...this.state });
            })
            .catch(console.log)
    };

    render () {
        const { toggleModal, user } = this.props;
        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <img src={ 'http://tachyons.io/img/logo.jpg' }
                             className="h3 w3 dib"
                             alt="avatar"/>
                        <h1>{ this.state.name }</h1>
                        <h4>Images Submitted: { user.entries }</h4>
                        <p>Member since: { new Date(user.joined).toLocaleDateString() }</p>
                        <hr/>
                        {
                            Object.entries(controls).map(([key, control]) =>
                                <div key={key}>
                                    <label className="mt2 fw6" htmlFor={ control }>{control}: </label>
                                    <input
                                        className="pa2 ba w-100"
                                        placeholder={ this.state[control] || placeholders[key] }
                                        onChange={ this.onFormChange }
                                        type="text"
                                        name={ control }
                                        id={ control }/>
                                </div>
                            )
                        }
                        <div className="buttons-wrapper">
                            <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                                    onClick={ this.onProfileUpdate }>
                                Save
                            </button>
                            <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                                    onClick={ toggleModal }>
                                Exit
                            </button>
                        </div>
                        <div className="modal-close"  onClick={ toggleModal }>&times;</div>
                    </main>
                </article>
            </div>
        );
    }
}