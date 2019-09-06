import React, { Component } from 'react'
import '../../assets/css/register.css'
import { loginUser } from '../../redux/actions/users'
import { connect } from 'react-redux'
import { async } from 'q';
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    handerChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handlerLogin = async () => {
        console.log(this.state.email)
        console.log(this.state.password)
        await this.props.dispatch(loginUser({
            email: this.state.email,
            password: this.state.password
        }))
            .then((res) => {
                localStorage.setItem('id_user', JSON.stringify(res.action.payload.data.result.id_user));
                localStorage.setItem('token', JSON.stringify(res.action.payload.data.result.token));
                localStorage.setItem('role_id', JSON.stringify(res.action.payload.data.result.role_id));
                localStorage.setItem('name', JSON.stringify(res.action.payload.data.result.name));
                swal({
                    title: "Login !",
                    text: "Login Success !!",
                    icon: "success",
                    button: "oke"
                });


            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (

            <div className="bglogin">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a class="navbar-brand" href="#">Nyamnyam Cafe <span className="text-tra">Cafe Bintang 6 harga kaki 2</span></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">recruitment</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <h2 className="text-center">Selamat Datang di setting Titak-titak dididing</h2> */}
                <div class="container">
                    <div className="kotaklogin">
                        <h2 className="text-center mt-4">Form Login</h2>
                        <p className="text-center color-grey">Nyamnyamcafe</p>
                        <form>
                            <div class="form-group">
                                <label for="inputAddress">Email</label>
                                <input type="text" class="form-control" id="email" name="email" placeholder="Email" onChange={this.handerChange} value={this.state.email} />
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Password</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="Password" onChange={this.handerChange} value={this.state.password} />
                            </div>
                            <Link to="/Home" class="btn btn-primary btn-block mt-5" onClick={() => this.handlerLogin()}>Login</Link>
                            <button type="button" class="btn btn-secondary btn-block">Register</button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }

}

export default connect(mapStateToProps)(Login);