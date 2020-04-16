import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {Table,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {CartChange} from './../redux/actions'
import { changetoRupiah } from '../supports/changeToRp';

const MySwal = withReactContent(Swal)

class Cart extends Component {
    state = {
        isicart:[],
        transaksi:[],
        modalOpen:false,
        selectedoption:'',
        cc:''
    }

    componentDidMount(){
        this.getdata()
    }

    getdata=()=>{
        console.log(this.props.User.id)
        Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`)
        .then((res)=>{
            console.log(res)
            // console.log(res.data[0].transactiondetails)
            var newarrforprod=[]
            res.data[0].transactiondetails.forEach(element => {
               newarrforprod.push(Axios.get(`${API_URL}/products/${element.productId}`)) 
            });
            // console.log(newarrforprod)
            Axios.all(newarrforprod)
            .then((res2)=>{
                // console.log(res2)
                res2.forEach((val,index)=>{
                    res.data[0].transactiondetails[index].dataprod=val.data
                })
                console.log(res.data[0].transactiondetails)
                this.props.CartChange(res.data[0].transactiondetails.length)
                this.setState({isicart:res.data})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderisidata=()=>{
        if(this.state.isicart.length===0){
            return null
        }
        return this.state.isicart[0].transactiondetails.map((val,index)=>{
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.dataprod.name}</td>
                    <td ><img src={val.dataprod.image} height='200' alt=""/></td>
                    <td >{changetoRupiah(val.dataprod.harga*val.qty)}</td>
                    <td >{val.qty}</td>
                    <td><button className='btn btn-danger' onClick={()=>this.deleteconfirm(index,val.id)}>Delete</button></td>
                </tr>
            )
        })
    }
    deleteconfirm=(index,id)=>{
        MySwal.fire({
            title: `Are you sure wanna delete ${this.state.isicart[0].transactiondetails[index].dataprod.name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Axios.delete(`${API_URL}/transactiondetails/${id}`)
              .then((res)=>{
                  MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then((result)=>{
                      if(result.value){
                          this.getdata()
                      }
                  })
              }).catch((err)=>{
                  console.log(err)
              }) 
            }
          })
    }
    rendertotalbelanja=()=>{
        if(this.state.isicart.length){
            var harga=0
            this.state.isicart[0].transactiondetails.forEach((val)=>{
                harga+=(val.dataprod.harga*val.qty)
            })
            return changetoRupiah(harga)
        }
    }
    onBayarClick=()=>{
        console.log(this.state.isicart)
        if(this.state.selectedoption==='1'){
            var obj={
                status: "waitingpayment",
                userId: this.props.User.id,
                metode:'cc'              
            }
            Axios.put(`${API_URL}/transactions/${this.state.isicart[0].id}`,obj)
            .then((res)=>{
                this.props.CartChange(0)
                this.setState({
                    isicart:[],
                    transaksi:[],
                    modalOpen:false,
                    selectedoption:'',
                    cc:''
                })
            })
        }
    }
    render() { 
        console.log(this.state.isicart)
        return (
            <div className='paddingatas'>
                <Modal toggle={()=>this.setState({modalOpen:false})} isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={()=>this.setState({modalOpen:false})}>
                        Pembayaran            
                    </ModalHeader>
                    <ModalBody>
                        <select className='form-control mb-2' onChange={(e)=>this.setState({selectedoption:e.target.value})}>
                            <option value="" hidden>Pilih pembayaran</option>
                            <option value="1" className='form-control mb-2'>Credit Card</option>
                            <option value="2" className='form-control'>Konvensional</option>
                        </select>
                        {
                            this.state.selectedoption==='1'?
                            <input type="text" className='form-control' value={this.state.cc} onChange={(e)=>this.setState({cc:e.target.value})} placeholder='masukkan No. Kartu Credit'/>
                            :
                            this.state.selectedoption==='2'?
                            <input type="text" className='form-control' placeholder='masukkan bukti pembayaran'/>
                            :
                            null
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-danger'>Cancel</button>
                        <button className='btn btn-success' onClick={this.onBayarClick}>Bayar</button>
                    </ModalFooter>
                </Modal>
                <Table striped>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nama</th>
                            <th>foto</th>
                            <th>Harga</th>
                            <th>qty</th>
                            <th>Hapus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderisidata()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='font-weight-bold'>
                                Total Belanja
                            </td>
                            <td className='font-weight-bold'>
                                {
                                    this.rendertotalbelanja()
                                }
                            </td>
                            <td>
                                <button className='btn btn-default' onClick={()=>this.setState({modalOpen:true})}>Checkout</button>
                            </td>

                        </tr>
                    </tfoot>
                </Table>
            </div>
          );
    }
}
const MapstatetoProps=(state)=>{
    return{
        User:state.Auth
    }
}
export default connect(MapstatetoProps,{CartChange}) (Cart);
