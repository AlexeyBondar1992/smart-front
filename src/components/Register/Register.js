import React from 'react';
import { ajax } from '../../helpers/AJAX';
import { APIUrls, APIMethods, appRotes } from '../../constants'

const inputTypes = {
    email: 'email',
    password: 'password',
    name:'text'
};

class Register extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        };
    }

    onInputChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmitSignIn = () => {
        ajax.makeRequest(APIUrls.register, APIMethods.post, { ...this.state })
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange(appRotes.home);
                }
            });
    };

    render () {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            {
                                Object.entries(inputTypes).map(([name, type]) =>
                                    <div className="mt3" key={ name }>
                                        <label className="db fw6 lh-copy f6" htmlFor={ name }>{name}</label>
                                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                               type={ type }
                                               name={ name }
                                               id={ name }
                                               onChange={ this.onInputChange }/>
                                    </div>
                                )
                            }
                        </fieldset>
                        <div className="">
                            <input onClick={ this.onSubmitSignIn }
                                   className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit"
                                   value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;