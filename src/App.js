import React, {Component} from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import userService from './userService';
import { ajax } from './helpers/AJAX';
import { appRotes, APIUrls, APIMethods } from './constants';
import './App.css';


const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

const initialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: appRotes.signIn,
    isSignedIn: false,
    isProfileOpen: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        age: 0,
        pet: ''
    }
};

class App extends Component {
    constructor (props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount () {
        userService.authorize()
            .then(user => {
                if(user.name && user.email) {
                    this.loadUser(user);
                    this.onRouteChange(appRotes.home);
                }
            })
            .catch(() => this.onRouteChange(appRotes.signIn));
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    };

    calculateFaceLocations = (data) => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        return data.outputs[0].data.regions.map(region => {
            const clarifaiFace = region.region_info.bounding_box;

            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height)
            };
        });
    };

    displayFaceBoxes = boxes => {
        this.setState({ boxes });
    };

    onInputChange = event => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        ajax.makeRequest(APIUrls.imageUrl, APIMethods.post,{ input: this.state.input })
            .then(response => {
                if (response) {
                    ajax.makeRequest(APIUrls.image, APIMethods.put,{ id: this.state.user.id })
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }));
                        })
                        .catch(console.log);

                }
                this.displayFaceBoxes(this.calculateFaceLocations(response));
            })
            .catch(err => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === appRotes.signOut) {
            ajax.token = '';
            return this.setState(initialState);
        } else if (route === appRotes.home) {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route });
    };

    toggleModal = () => {
        this.setState(previousState => ({
            ...previousState,
            isProfileOpen: !previousState.isProfileOpen
        }));
    };

    render () {
        const { isSignedIn, imageUrl, route, boxes, user, isProfileOpen } = this.state;
        return (
            <div className="App">
                <Particles className="particles"
                           params={ particlesOptions }/>
                <Navigation isSignedIn={ isSignedIn }
                            onRouteChange={ this.onRouteChange }
                            toggleModal={ this.toggleModal }/>
                { isProfileOpen &&
                    <Modal>
                        <Profile toggleModal={ this.toggleModal } user={ user } loadUser={ this.loadUser }/>
                    </Modal> }
                {route === appRotes.home
                    ? <div>
                        <Logo/>

                        <Rank
                            name={ user.name }
                            entries={ user.entries }
                        />
                        <ImageLinkForm
                            onInputChange={ this.onInputChange }
                            onButtonSubmit={ this.onButtonSubmit }
                        />
                        <FaceRecognition boxes={ boxes } imageUrl={ imageUrl }/>
                    </div>
                    : (
                        route === appRotes.signIn
                            ? <Signin loadUser={ this.loadUser } onRouteChange={ this.onRouteChange }/>
                            : <Register loadUser={ this.loadUser } onRouteChange={ this.onRouteChange }/>
                    )
                }
            </div>
        );
    }
}

export default App;
