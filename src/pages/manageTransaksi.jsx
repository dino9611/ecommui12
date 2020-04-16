import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../supports/ApiUrl';
import { Table } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
class ManageTransaksi extends Component {
    state = {
        isitransaksi:[]
    }
    componentDidMount(){
        Axios.get(`${API_URL}/transactions`,{
           params:{
            "status": "waitingpayment"
           }
        }).then((res)=>{
            this.setState({isitransaksi:res.data})
        })
    }
    rendertransaksi=()=>{
        return this.state.isitransaksi.map((val,index)=>{
            return (
                <tr key={index}>
                    <td>{val.id}</td>
                    <td>{val.userId}</td>
                    <td>{val.metode}</td>
                    <td><button className='btn btn-success' onClick={()=>this.onclickYakin(val.id)}>Accept</button></td>
                </tr>
            )
        })
    }
    onclickYakin=(Id)=>{
        MySwal.fire({
            title: `Are you sure want to procees transasction id = ${Id}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Accept!'
          }).then((result) => {
            if (result.value) {
                Axios.patch(`${API_URL}/transactions/${Id}`,{
                    status:'confirmed'
                }).then((res1)=>{
                    Axios.get(`${API_URL}/transactions`,{
                        params:{
                         "status": "waitingpayment"
                        }
                     }).then((res)=>{
                         MySwal.fire(
                           'Sukses',
                           'sukses meneruskan',
                           'success'
                         )
                         this.setState({isitransaksi:res.data})
                     })
                }).catch((err)=>{
                    MySwal.fire(
                        'Gagal',
                        'sukses meneruskan',
                        'warning'
                      )
                })
            }
          })
    }
    render() {
        return (
            <div className='paddingatas'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Transaction Id</th>
                            <th>Name</th>
                            <th>userId</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rendertransaksi()}
                    </tbody>
                </Table>
            </div>
          );
    }
}
 
export default ManageTransaksi;