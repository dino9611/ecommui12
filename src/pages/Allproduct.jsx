import React, { Component } from 'react';
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import Numeral from 'numeral'
import {FaCartPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { MDBBtn } from 'mdbreact';
class AllProducts extends Component {
    state = {
        categories:[],
        products:[],
        productsearch:[],
        categoriesname:'All Categories'
    }
    
    componentDidMount(){
        Axios.get(`${API_URL}/products?_expand=kategori`)
        .then((res)=>{
            Axios.get(`${API_URL}/kategoris`)
            .then((kategoris)=>{
                this.setState({products:res.data,categories:kategoris.data,productsearch:res.data})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderProducts=()=>{
        return this.state.productsearch.map((val,index)=>{
            return (
                <div key={index} className='p-3' style={{width:'20%'}}>
                    <Card>
                        <div style={{height:300,width:'100%'}}>
                            <img src={val.image} height='100%' width='100%' alt=""/>
                            <div className='kotakhitam'>
                                <Link to={`/productdetail/${val.id}`} className='tombolebuynow'>
                                    <button className='tomboldalam'><FaCartPlus/></button>
                                </Link>
                            </div>  
                        </div>
                        <CardBody style={{height:150}}>
                            <CardTitle style={{fontWeight:'bold'}} className='mb-2'>{val.name}</CardTitle>
                            <CardSubtitle className='mb-2'>{'Rp.'+Numeral(val.harga).format(0.0)}</CardSubtitle>
                            <button disabled className='rounded-pill px-2 btn-primary' >{val.kategori.nama}</button>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }
    oninputSearch=(e)=>{
        var productdata=this.state.products
        if(e.target.value===''){
            this.setState({productsearch:productdata})
        }else{
        var productdata=this.state.products
        var productfilter=productdata.filter((val)=>val.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
            this.setState({productsearch:productfilter})
        }
    }

    onCategoriesselect=(id,nama)=>{
        var productdata=this.state.products
        if(id===0){
            this.setState({productsearch:productdata,categoriesname:nama})
        }else{
            var productfilter=productdata.filter((val)=>val.kategoriId===id)
            this.setState({productsearch:productfilter,categoriesname:nama})
        }
    }

    render() {
        console.log(this.state.products,this.state.categories)
        return (
            <div className='paddingatas'>
                <div className='px-5 pt-3'>
                    <input type="search" placeholder='Search...' className='form-control mb-2 mx-2' style={{width:'20%'}} onChange={this.oninputSearch}/>
                    <div>
                        <MDBBtn outline className='rounded-pill mr-2 mt-2 p-1 px-2' onClick={()=>this.onCategoriesselect(0,'All Categories')}>All Categories</MDBBtn>
                        {
                            this.state.categories.length===0 ?
                            null
                            :
                            this.state.categories.map((val)=>{
                                return(
                                    <MDBBtn outline className='rounded-pill mr-2 mt-2 p-1 px-2' key={val.id} onClick={()=>this.onCategoriesselect(val.id,val.nama)}>{val.nama}</MDBBtn>
                                )
                            })
                        }
                    </div>
                    <div className='mt-2 p-1 px-2'>
                        Category&nbsp;:&nbsp;&nbsp;{this.state.categoriesname}
                    </div>
                    <div className="d-flex flex-wrap">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
          );
    }
}
 
export default AllProducts;