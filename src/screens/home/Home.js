import React, { Component,forwardRef } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/header.css'
import { getallitem, inputitem } from '../../redux/actions/items'
import { addcart, getallcart, quantityplush, quantityminus, removecart } from '../../redux/actions/carts'
import { getcategory } from '../../redux/actions/categorys'
import { checkoutpayment, getAllPayment } from '../../redux/actions/payments'
import { timingSafeEqual } from 'crypto';
import swal from 'sweetalert'
import moment from 'moment'
import jsPDF from 'jspdf';
import { compose } from 'redux';
import { get } from 'http';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from "material-table";
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
 


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: null,
            name_item: "",
            price: "",
            id_category: "",
            historypayment: []
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
    endcheckoutprint = () => {
        this.printpdf()
        this.getAllItem()
        this.getAllcart()
    }
    printpdf = () => {
        var doc = new jsPDF()
        doc.setFontSize(10);
        let baris = 60;
        doc.text('Receipt # ' + this.props.id_payment, 20, 5, null, null, 'center');
        doc.setFontSize(30);
        doc.text('Yamyam Cafe', 105, 20, null, null, 'center');
        doc.setFontSize(22);
        doc.setTextColor(0, 0, 255);
        doc.text('Selamat Makan dan Selamat Menikmati', 105, 30, null, null, 'center');
        doc.setLineWidth(1.5);
        doc.setTextColor(100);
        doc.setFontSize(10);
        doc.text('Jln. Seserah Dah, Brontokusuman, Mergangsan, Yogyakarta City, Special Region of Yogyakarta 55153 ', 20, 37);
        doc.line(20, 41, 200, 41);
        doc.setFontSize(15);
        doc.setTextColor(0, 0, 0);

        this.props.cart.map((item) => {
            doc.text(item.quantity + 'x ' + item.name_item, 20, baris);
            doc.text((item.price * item.quantity).toString(), 200, baris, 'right');
            baris = baris + 10
        })
        doc.setLineDash([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2], 7.5)
        doc.line(20, baris + 3, 200, baris + 3)

        doc.setLineDash([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2])
        doc.line(50, baris + 20, 200, baris + 20)
        doc.text("PPN 10%", 50, baris + 30);
        doc.text(this.props.ppn.toString(), 180, baris + 30, 'right');
        doc.setFontSize(17);
        doc.text("TOTAL HARGA", 50, baris + 40);
        doc.text(this.props.total_payment.toString(), 180, baris + 40, 'right');
        doc.setLineDash([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2])
        doc.line(50, baris + 46, 200, baris + 46)
        doc.autoPrint()


        // doc.setFontSize(22);
        // doc.text('This is a title', 20, 20);
        // doc.setFontSize(16);
        // doc.text('This is some normal sized text underneath.', 20, 30);

        doc.save('two-by-four.pdf')
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
    handleChekcout = () => {
        this.props.dispatch(checkoutpayment(this.props.id_user))
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
    getallpayment=()=>{
       this.props.dispatch(getAllPayment())
       .then(()=>{
           let data =[]
           this.props.paymentall.map((item)=>{
               let hasil = item
               hasil.created_at = moment(item.created_at).format('ll')
               data.push(hasil)
           })
           this.setState({
               historypayment : data
           })
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
                                <div className="col-md-1" onClick={() => this.testpdf()}>
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
                                        <a href="#" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={()=>this.getallpayment()}>
                                        <i class="far fa-clipboard"></i>
                                        </a>
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
                                <button type="button" class="btn btn-checkout btn-lg btn-block" data-toggle="modal" data-target="#paymentModal" onClick={() => this.handleChekcout()}>Checkout</button>
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
                <div class="modal fade" id="paymentModal" tabindex="-1" role="dialog" aria-labelledby="paymentModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="paymentModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>Checkout</h4>
                                        <h6>Cashir : </h6>
                                        <h6>{this.props.fullname}</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Receipt no {this.props.id_payment}</h5>
                                    </div>
                                </div>
                                <br />
                                <div className="detail-item">
                                    {this.props.cart.map((item) =>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <p className="font-payment">{item.name_item} {item.quantity}x</p>
                                            </div>
                                            <div className="col-md-4 text-right">
                                                <p className="font-payment">{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="detail-button-payment">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className="font-payment">Ppn 10%</p>
                                        </div>
                                        <div className="col-md-4 text-right">
                                            <p className="font-payment">{this.props.ppn}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="font-payment"></p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="font-payment">Total : {this.props.total_payment}</p>
                                        </div>
                                    </div>
                                    <p className="font-payment">Payment: Cast</p>
                                </div>
                            </div>
                            <div class="button-payment text-center">
                                <button type="button" class="btn btn-checkout btn-lg btn-block" data-dismiss="modal" onClick={() => this.endcheckoutprint()}>Print</button>
                                <h5>Or</h5>
                                <button type="button" class="btn btn-cencel btn-lg btn-block">Send Email</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end payment */}

                {/* history */}
     <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
    
        <MaterialTable
         icons={tableIcons}
          columns={[
            { title: "#id", field: "id_payment" },
            { title: "Name Item", field: "name_item" },
            { title: "Total", field: "total_payment" },
            { title: "Caser", field: "name" },
            {
              title: "Date",
              field: "created_at",
            }
          ]}
         
          data={this.state.historypayment}
          title="History Payment"
        />
    
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
                {/* end history */}

            </div>


        )
    }
}
const mapStateToProps = state => {
    return {

        token: state.users.token,
        id_user: state.users.id_user,
        item: state.items.item,
        fullname: state.users.fullname,
        cart: state.carts.cart,
        ppn: state.payments.ppn,
        total_price: state.payments.total_price,
        total_payment: state.payments.total_payment,
        id_payment: state.payments.id_payment,
        category: state.categorys.category,
        isRejectedinput: state.items.isRejected,
        paymentall: state.payments.paymentall
    }

}

export default connect(mapStateToProps)(Home)