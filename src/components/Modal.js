import React, { Component } from 'react'
import {  Modal as ModalBox, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {  SVGShipped } from '../SVG/SVG';
export default class Modal extends Component {

   
    toggleModal(){
       this.props.toggleModal();
    }  

    render() {
       
        return (
               <div>
                     <ModalBox isOpen={this.props.data.show} className="modal-dialog modal-xl" >
                        <ModalHeader  > <p className="h1 text-success">Thank you for your Order!! </p></ModalHeader>
                        <ModalBody >
                                <div className="ml-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Delivery Address</th>
                                            <th>Phone No</th> 
                                            <th>Product Code</th>                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.props.data.firstName}</td>
                                            <td><ul className="navbar-nav">
                                                <li>{this.props.data.address1}</li>
                                                <li>{this.props.data.city}</li>
                                                <li>{this.props.data.stateName}</li>
                                                <li>{this.props.data.zip}</li>
                                                </ul></td>
                                            <td>{this.props.data.phone}</td>
                                            <td>{
                                               
                                               this.props.data.wine_name 
                                            }</td>
                                        </tr>
                                    </tbody>
                                </table>


                                </div>
                        </ModalBody>
                        <ModalFooter>
                            <p className="text-warning">product ready to be shipped</p>
                            <button className="btn btn-outline-success" onClick={this.toggleModal.bind(this)}>< SVGShipped/> </button>
                        </ModalFooter>
                    </ModalBox>
                </div>
        )
    }
}
