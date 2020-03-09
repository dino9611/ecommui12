import React, { Component } from 'react';
import { Table,Modal,ModalBody,ModalFooter,ModalHeader,Button } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../supports/ApiUrl';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class ManageAdmin extends Component {
    state = {
        products:[],
        isModaladdOpen:false,
        indexdelete:-1
    }

    componentDidMount(){
        Axios.get(`${API_URL}/products`)
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    toogleadd=()=>{
        this.setState({isModaladdOpen:!this.state.isModaladdOpen})
    }


    onSaveaddDataClick=()=>{
        var namaadd=this.refs.namaadd.value
        var imageadd=this.refs.imageadd.value
        var stokeadd=parseInt(this.refs.stokeadd.value)
        var categoryadd=parseInt(this.refs.categoryadd.value)
        var hargaadd=parseInt(this.refs.hargaadd.value)
        var deskripsiadd=this.refs.deskripsiadd.value
        var obj={
            name:namaadd,
            image:imageadd,
            stok:stokeadd,
            categoryId:categoryadd,
            harga:hargaadd,
            deskripsi:deskripsiadd
        }
        Axios.post(`${API_URL}/products`,obj)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${API_URL}/products`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data,isModaladdOpen:false})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    deleteconfirm=(index,id)=>{
        Swal.fire({
            title: `Are you sure wanna delete ${this.state.products[index].name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Axios.delete(`${API_URL}/products/${id}`)
              .then((res)=>{
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then((result)=>{
                      if(result.value){
                          Axios.get(`${API_URL}/products`)
                          .then((res1)=>{
                            this.setState({products:res1.data})
                          })
                      }
                  })
              }).catch((err)=>{
                  console.log(err)
              }) 
            }
          })
    }

    renderProducts=()=>{
        const {products} =this.state 
        return products.map((val,index)=>{
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{val.name}</td>
                    <td><img src={val.image} alt={val.name} width='150' height='200px'/></td>
                    <td>{val.stok}</td>
                    <td>{val.categoryId}</td>
                    <td>{val.harga}</td>
                    <td>{val.deskripsi}</td>
                    <td>
                        <button className='btn btn-primary'>Edit</button>
                        <button className='btn btn-danger' onClick={()=>this.deleteconfirm(index,val.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    render() { 
        return ( 
            <div>
                <Modal isOpen={this.state.isModaladdOpen} toggle={this.toogleadd}>
                    <ModalHeader toggle={this.toogleadd}>Add data</ModalHeader>
                    <ModalBody>
                        <input type="text" ref='namaadd' placeholder='Product name' className='form-control mt-2 '/>
                        <input type="text" ref='imageadd' placeholder='Url Image' className='form-control mt-2'/>
                        <input type="number" ref='stokeadd' placeholder='jumlah stok' className='form-control mt-2'/>
                        <select ref='categoryadd' className='form-control mt-2'>
                            <option value="" hidden>Pilih category</option>
                            <option value="1" >Category 1</option>
                            <option value="2" >Category 2</option>
                            <option value="3" >Category 3</option>
                        </select>
                        <input type="number" ref='hargaadd' placeholder='Harga ' className='form-control mt-2'/>
                        <textarea cols="20" rows="5" ref='deskripsiadd' className='form-control mt-2' placeholder='deskripsi' ></textarea>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSaveaddDataClick}>Save</Button>
                        <Button color="secondary" onClick={this.toogleadd}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <button className='btn btn-primary' onClick={this.toogleadd}>Add data</button>
                <Table striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>image</th>
                            <th>stok</th>
                            <th>Category</th>
                            <th>Harga</th>
                            <th>Deskripsi</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderProducts()}
                    </tbody>
                </Table>

            </div>
         );
    }
}
 
export default ManageAdmin;