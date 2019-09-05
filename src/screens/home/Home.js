import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/header.css'
import { getallitem, inputitem } from '../../redux/actions/items'
import { addcart, getallcart, quantityplush, quantityminus, removecart } from '../../redux/actions/carts'
import { getcategory } from '../../redux/actions/categorys'
import { timingSafeEqual } from 'crypto';
import swal from 'sweetalert'
import { compose } from 'redux';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: null,
            name_item: "",
            price: "",
            id_category: ""
        }
    }
    getAllItem = () => {
        this.props.dispatch(getallitem())
    }
    getAllcart = () => {
        this.props.dispatch(getallcart(this.props.id_user))
    }
    handleClikItem = async (id_item) => {
        await this.props.dispatch(addcart({
            id_item: id_item,
            id_user: this.props.id_user,
        }))
            .then(() => {
                this.getAllItem()
                this.getAllcart()
            })
    }
    handlegeraser = async (id_item) => {
        let cart = this.props.cart.find((item) => {
            return item.id_item === id_item
        })
        if (cart) {
            await this.props.dispatch(removecart(cart.id_cart))
                .then(() => {
                    this.getAllItem()
                    this.getAllcart()
                })
        }
    }
    componentDidMount = () => {
        this.getAllItem()
        this.getAllcart()
        this.getcategory()
    }
    handlepluscart = async (item) => {
        await this.props.dispatch(quantityplush(item.id_cart))
            .then(() => {
                this.getAllcart()
            })
    }
    handlerChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeFile = (e) => {
        console.log(e.target.files[0])
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0,
        })
    }
    prosesInput = async () => {
        const dataFile = new FormData()
        console.log(this.state.selectedFile)
        dataFile.append('image', this.state.selectedFile)
        dataFile.append('name_item', this.state.name_item)
        dataFile.append('price', this.state.price)
        dataFile.append('id_category', this.state.id_category)
        console.log(this.state)
        await this.props.dispatch(inputitem(dataFile))
            .then((response) => {
                swal({
                    title: "Insert !",
                    text: "Insert Success !!",
                    icon: "success",
                    button: "oke"

                });
                this.getAllItem()
            })
            .catch(() => {
                swal({
                    title: "Insert",
                    text: "Insert Failed!",
                    icon: "warning",
                    buttons: "oke",
                })
            })
    }
    handleminuscart = async (item) => {
        if (item.quantity === 1) {
            return false
        }
        await this.props.dispatch(quantityminus(item.id_cart))
            .then(() => {
                this.getAllcart()
            })
    }
    getcategory = async () => {
        await this.props.dispatch(getcategory())
    }
    handleInputItem = () => {
        console.log(this.state)
    }
    render() {
        let totalCart = 0;
        return (
            <div className="body-home">
                <div className="row">
                    <div className="col-md-9 bg-white">
                        <div className="header-left">
                            <div className="row">
                                <div className="col-md-1 text-center">
                                    <i class="fas fa-bars bars"></i>
                                </div>
                                <div className="col-md-10 text-center">
                                    <h3>Food Items</h3>
                                </div>
                                <div className="col-md-1">
                                    <i class="fas fa-search bars"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-3 bg-white">
                        <div className="header-right text-center">
                            <h3>Cart <span class="badge badge-pill badge-info">{this.props.cart.length}</span> </h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-1">
                                <div className="menu-left bg-white">
                                    <div className="menu-food">
                                        <i class="fas fa-utensils"></i>
                                    </div>
                                    <div className="menu-history">
                                        <i class="far fa-clipboard"></i>
                                    </div>
                                    <div className="menu-add">
                                        <a href="#" data-toggle="modal" data-target=".bd-add-modal-lg"><i class="fas fa-plus"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-11">
                                <div className="body-card mt-4">
                                    <div className="row">
                                        {this.props.item.map((item) =>

                                            <div className="col-md-4">
                                                <div className="cart-item">
                                                    {(!this.props.cart.find((item2) => {
                                                        return item2.id_item === item.id_item
                                                    })) ?
                                                        <div className="cart-header" onClick={() => this.handleClikItem(item.id_item)}>
                                                            <img src={item.image} alt="" />
                                                        </div> :
                                                        <div className="cart-header-not" onClick={() => this.handlegeraser(item.id_item)}>
                                                            <img src={item.image} alt="" />
                                                            <i class="far fa-check-circle checklish"></i>
                                                        </div>
                                                    }
                                                    <div className="cart-body">
                                                        <p className="title-item">{item.name_item}</p>
                                                        <p className="category-item">{item.name_category}</p>
                                                        <h4> Rp. {item.price}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="col-md-3">
                        <div className="body-right bg-white">
                            <div className="container-cart">
                                {(this.props.cart.length === 0) ?
                                    <div className="empty">
                                        <img src={require('../../assets/images/food-and-restaurant.png')} alt="" />
                                        <h3>You Cart is Empty</h3>
                                    </div> :
                                    <div>
                                        {this.props.cart.map((item) =>

                                            <div className="row mb-3">
                                                <div className="display-none">{totalCart += item.quantity * item.price}</div>
                                                <div className="col-md-3">
                                                    <div className="img-cart">
                                                        <img src={item.image} alt="" />
                                                    </div>

                                                </div>
                                                <div className="col-md-9">
                                                    <h5>{item.name_item}</h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <button className="btn btn-min" onClick={() => this.handleminuscart(item)}>-</button><input type="text" className="quantity" value={" " + item.quantity} /><button className="btn btn-plus" onClick={() => this.handlepluscart(item)}>+</button>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="price-card">Rp. {item.price * item.quantity}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                            <div className="container-checkout p-4">

                                <div className="row">
                                    <div className="col-md-7">
                                        <h5>Total :</h5>
                                    </div>
                                    <div className="col-md-5">
                                        <h5 className="total">Rp. {totalCart}</h5>
                                    </div>

                                </div>
                                <p>*Belum termasuk PPN</p>
                                <button type="button" class="btn btn-checkout btn-lg btn-block" data-toggle="modal" data-target=".bd-payment-modal-lg">Checkout</button>
                                <button type="button" class="btn btn-cencel btn-lg btn-block">Cencel</button>
                            </div>

                        </div>

                    </div>
                </div>
                {/* modal add */}
                <div class="modal fade bd-add-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add Menu</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body p-4">
                                <form action="">
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">name</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="name_item" name="name_item" value={this.state.name_item} onChange={this.handlerChange} placeholder="Name" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Image</label>
                                        <div class="col-sm-9">
                                            <input type="file" id="image" name="image" onChange={this.onChangeFile} />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Price</label>
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control" value={this.state.price} onChange={this.handlerChange} id="price" name="price" placeholder="Rp ." />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Category</label>
                                        <div class="col-sm-4">
                                            <select class="custom-select" name="id_category" value={this.state.id_category} onChange={this.handlerChange}>
                                                {this.props.category.map((item) =>
                                                    <option value={item.id_category}>{item.name_category}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-cencel" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-checkout" data-dismiss="modal" onClick={() => this.prosesInput()}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end add item */}
                {/* modal payment */}
                <div class="modal fade bd-payment-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add Menu</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body p-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Checkout</h6>


                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-cencel" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-checkout" data-dismiss="modal">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end payment */}
            </div>


        )
    }
}
const mapStateToProps = state => {
    return {

        token: state.users.token,
        id_user: state.users.id_user,
        item: state.items.item,
        cart: state.carts.cart,
        category: state.categorys.category,
        isRejectedinput: state.items.isRejected
    }

}

export default connect(mapStateToProps)(Home)