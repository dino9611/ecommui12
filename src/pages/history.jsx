import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {Table,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
class History extends Component {
    state = {
        isicart:[],
        modalopen:false,
        indexselect:0,
        datadetail:[]
    }
    componentDidMount(){
        this.getdata()
    }

    getdata=()=>{
        console.log(this.props.User.id)
        Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=confirmed`)
        .then((res)=>{
            
            console.log(res.data)
            this.setState({isicart:res.data})
 
        }).catch((err)=>{
            console.log(err)
        })
    }
    renderisidata=()=>{
        return this.state.isicart.map((val,index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.metode}</td>
                    <td>{val.id}</td>
                    <td><button className='btn btn-default' onClick={()=>{
                        Axios.get(`${API_URL}/transactiondetails?_expand=product&&transactionId=${val.id}`)
                        .then((res)=>{
                            this.setState({modalopen:true,datadetail:res.data})
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                    }>Details</button></td>
                </tr>
            )
        })
    }
    renderisimodal=()=>{
       return this.state.datadetail.map((val,index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.product.name}</td>
                    <td>{val.product.harga}</td>
                    <td>{val.qty}</td>
                </tr>
            )
        })
    }
    render() { 
        return (
            <div className='paddingatas'>
                {
                    this.state.isicart.length?
                    <Modal isOpen={this.state.modalopen} toggle={()=>this.setState({modalopen:false})}>
                        <ModalHeader toggle={()=>this.setState({modalopen:false})} >
                            Details {this.state.isicart[this.state.indexselect].id}
                        </ModalHeader>
                        <ModalBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama barang</th>
                                        <th>Harga</th>
                                        <th>QTY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.renderisimodal()
                                    }
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={()=>this.setState({modalopen:false})} className='btn btn-danger' >Close</button>
                        </ModalFooter>
                    </Modal>
                    :
                    null
                }

                <Table striped>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Metode</th>
                            <th>Transaction Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderisidata()
                        }
                    </tbody>
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
export default connect(MapstatetoProps) (History);