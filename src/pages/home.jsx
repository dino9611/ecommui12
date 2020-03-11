import React, { Component } from 'react';
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
import {Redirect} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Numeral from 'numeral'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {FaArrowAltCircleRight} from 'react-icons/fa'
import {BukanHome,IniHome} from './../redux/actions'

class Home extends Component {
    state = {
        photos:[
            './image/city-daylight-diversity-fashion-1154861.jpg',
            './image/fashion-sunglasses-woman-girl-46244.jpg',
            './image/adult-beautiful-elegant-eyewear-291762.jpg'
        ],
        products:[]
    }
    

    componentDidMount(){
        this.props.IniHome()
        Axios.get(`${API_URL}/products?_expand=kategori&_limit=5`)
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentWillUnmount=()=>{
        console.log('jalan unmount')
        this.props.bukan()
    }

    renderphoto=()=>{
        return this.state.photos.map((val,index)=>{
            return (
                <MDBCarouselItem key={index} itemId={index+1}>
                    <MDBView>
                        <div style={{width:'100%',height:650,display:'flex'}}>
                            <img
                                // className=""
                                src={val}
                                alt="First slide"
                                // height='100%'
                                width='100%'
                            />
                        </div>
                        <MDBMask overlay="black-slight" />
                    </MDBView>
                </MDBCarouselItem>
            )
        })
    }

    renderProducts=()=>{
        return this.state.products.map((val,index)=>{
            return (
                <div key={index} className='p-3' style={{width:'20%'}}>
                    <Card>
                        <div style={{height:300,width:'100%'}}>
                            <img src={val.image} height='100%' width='100%' alt=""/>  
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

    render() {
        if(this.props.islogin){
            return (
                <div>
                    <MDBCarousel
                        activeItem={1}
                        length={this.state.photos.length}
                        interval={1800}
                        showIndicators={false}
                        showControls={false}
                    >
                        <MDBCarouselInner>
                            {this.renderphoto()}
                        </MDBCarouselInner>
                    </MDBCarousel>
                    <div className='px-5 pt-3'>
                        <div>Best seller <FaArrowAltCircleRight/></div>
                        <div className="d-flex ">
                            {this.renderProducts()}
                        </div>
                    </div>
                </div>
              )
        }
        return(
            <Redirect to='/login'/>
        )
    }
}

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }
}

export default connect(MapstatetoProps,{bukan:BukanHome,IniHome}) (Home);