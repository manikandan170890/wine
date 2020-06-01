import React from 'react'
import 'bootstrap';
import axios from 'axios';
import { ItemHover,Background } from '../common/Background';
import { SVGRedGlass,SVGBottle } from '../SVG/SVG';
import Modal from './Modal';
import './home.css';
export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            wine_list : [],
            zipCode : [],
            wine_name:"",
            firstName:"",
            lastName:"",
            address1:"",
            address2:"",
            zip:"",
            stateName:"",
            city:"",
            phone:"",
            dob:"",
            check_out:"",
            errors:{},
            message: "",
            show:false
        }
       this.autozip = this.autozip.bind(this);
       this.changeHandler= this.changeHandler.bind(this);
       this.submitForm = this.submitForm.bind(this);
       this.validation = this.validation.bind(this);
       this.onRadioClick = this.onRadioClick.bind(this);
       this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
            axios.get("https://www.wsjwine.com/api/offer/0033008")
            .then((res) => { 
                const wine_list = res.data.response.mainItems;
                this.setState({wine_list});
            });
            axios.get("https://www.wsjwine.com/api/address/zipcode/12345")
            .then((res) => { 
                const zipCode = res.data.response;
                this.setState({zipCode});
            });            
    }

     

    validation(){  //Valiation chacking
        let errors={};
        let formIsValid = true;
       
        if(!this.state.wine_name){
            formIsValid = false;
            errors["wine_name"]=" Please Select the Product";
        }

        if(!this.state.firstName){
            formIsValid = false;
            errors["firstName"]=" First Name is required";
        }
    
        if(!this.state.lastName){
            formIsValid = false;
            errors["lastName"]=" Last Name is required";
        }    
    
        if(!this.state.address1){
            formIsValid = false;
            errors["address1"]=" Address1 is required ";
        }

        if(!this.state.address2){
            formIsValid = false;
            errors["address2"]=" Address2 is required ";
        }

        if(!this.state.zip){
            formIsValid = false;
            errors["zip"]=" ZipCode is required ";
        }

        if(!this.state.city){
            formIsValid = false;
            errors["city"]=" City is required ";
        }

        if(!this.state.stateName){
            formIsValid = false;
            errors["stateName"]=" State is required ";
        }

        if(!this.state.phone){
            formIsValid = false;
            errors["phone"]=" Phone No is required ";
        }

        if(!this.state.dob){
            formIsValid = false;
            errors["dob"]=" Data  of Birth is required ";
        } 

        if(!this.state.check_out){
            formIsValid = false;
            errors["check_out"]=" Please Confirm your Order ";
        } 

        this.setState({errors}); 
        return formIsValid;
      }


    submitForm(e){
        e.preventDefault();             
        if(this.validation()) {
            this.setState({error:null});
            console.log('form submitted');
            this.setState({show:true});
        }
    }

    

    autozip(e) {
        // console.log(this.state.zipCode.zipCode);
        
         if(this.state.zip === this.state.zipCode.zipCode ) {
             const city = this.state.zipCode.city;
             const stateName = this.state.zipCode.stateName;
             this.setState({city,stateName});
         }else{
             this.setState({city:"",stateName:""});
         }      
        
     }
 
     changeHandler(e){
         this.setState({[e.target.name]:e.target.value},()=> {
             this.autozip(e);
         });
     }
 
     onRadioClick(e){
             const itemCode = e.target.value;
             if(itemCode === "A07616"){
                this.props.background('rgba(237,12,12,0.4206057422969187)');
             }
             if(itemCode === "A07617"){
                this.props.background('rgba(204,144,60,0.8575805322128851)');
            }
            if(itemCode === "A07618"){
                this.props.background('rgba(68,120,56,0.4906337535014006)');
            }
     }

     toggleModal(){
        this.setState({show:false});
     }
   
    render() {
        return (
            <React.Fragment>                
         <div className="container">
             <Modal  data={this.state} toggleModal={this.toggleModal} />
            
            <div className="card-deck sm-3 col text-center ">
            {this.state.wine_list.map((list, index) => {
              return (  
                                               
                    <div key={index} className="card mb-4 shadow-lg p-3 mb-5  rounded animate_col">
                    <div className="card-header">
                        <h4 className="my-0 font-weight-normal"><SVGRedGlass color={list.product.colourId ==="Red" ? "red" : list.product.colourId ==="Other"? "green" : "#d0ac0a"}/></h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                                {list.listPrice}$
                        </h1>
                        <ul className="list-unstyled mt-3 mb-4">
                                <li>{list.product.name}</li>
                                <li><SVGBottle color={list.product.colourId ==="Red" ? "red" : list.product.colourId ==="Other"? "green" : "#d0ac0a"}/>=<span className="h6 pl-2">{list.product.skus[0].numberOfBottles}</span></li>
                    
                        </ul>
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <div className="input-group-text">
                                <input type="radio" name="wine_name" onClick={this.onRadioClick} value={list.product.itemCode} onChange={this.changeHandler} aria-label="Radio button for following text input" />
                                </div>
                            </div>
                            <label className="form-control"><img src="https://img.icons8.com/color/18/000000/bar.png"/> Buy Now</label>                           
                        </div>
                    </div>
                    </div>
                   
                    );
                })
            }
            
            </div>
            <div className="row">
                <div className="col">
                        <span className="text-danger" >{this.state.errors ? this.state.errors.wine_name : "" }</span>
                </div>
            </div>

            <form className="mb-5" onSubmit={this.submitForm}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">First Name</label>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.changeHandler} className="form-control"  />
                        <span className="text-danger" >{this.state.errors ? this.state.errors.firstName : "" }</span>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">LastName</label>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.changeHandler} className="form-control"  />
                        <span className="text-danger" >{this.state.errors ? this.state.errors.lastName : "" }</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <input
                        type="text"
                        name="address1" value={this.state.address1}
                        className="form-control"
                        onChange={this.changeHandler}
                        placeholder="1234 Main St"
                        />
                         <span className="text-danger" >{this.state.errors ? this.state.errors.address1 : "" }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address 2</label>
                        <input
                        type="text"
                        className="form-control"
                        name="address2" value={this.state.address2}
                        onChange={this.changeHandler}
                        placeholder="Apartment, studio, or floor"
                        />
                         <span className="text-danger" >{this.state.errors ? this.state.errors.address2 : "" }</span>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" name="zip" value={this.state.zip} onChange={this.changeHandler} className="form-control"   />
                        <span className="text-danger" >{this.state.errors ? this.state.errors.zip : "" }</span>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                         <label className="form-control"  >{this.state.city ? this.state.city :'Select Zip Code'}</label>
                         <span className="text-danger" >{this.state.errors ? this.state.errors.city: "" }</span>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <label className="form-control"  >{this.state.stateName ? this.state.stateName :'Select Zip Code'}</label>
                        <span className="text-danger" >{this.state.errors ? this.state.errors.stateName : "" }</span>
                        </div>
                       
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Phone</label>
                        <input type="phone" name="phone" value={this.state.phone} onChange={this.changeHandler} className="form-control"  />
                        <span className="text-danger" >{this.state.errors ? this.state.errors.phone : "" }</span>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Data of Birth</label>
                        <input type="date" name="dob" value={this.state.dob} onChange={this.changeHandler}  className="form-control"  />
                        <span className="text-danger" >{this.state.errors ? this.state.errors.dob : "" }</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                        <input className="form-check-input" name="check_out" onChange={this.changeHandler} value="1" type="checkbox"  />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Check me out
                        </label>
                        <span className="text-danger" >{this.state.errors ? this.state.errors.check_out : "" }</span>
                        </div>
                        
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Comfirm Order 
                    </button>
            </form>

            </div>  
            </React.Fragment>
           
        )
    }
}
