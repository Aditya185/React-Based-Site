import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, 
    CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Row, Col, Label
  } from 'reactstrap'
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


   
function RenderComments({comments, postComment, dishId}) {
        if (comments == null) {
            return (<div></div>);
        }
        const cmnts =  <Stagger in>
        {comments.map((comment) => {
            return (
                <Fade in>
                <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
                </Fade>
            );
        })}
        </Stagger>
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    }

   function RenderDish({dish}) {


        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    const Dishdetail = (props) => {

         if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}   postComment={props.postComment}
        dishId={props.dish.id} />
                </div>
            </div>
            </div>
        );
    }

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    class CommentForm extends Component{

        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
              };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

          handleSubmit(values) {
            // console.log('Current State is: ' + JSON.stringify(values));
            // alert('Current State is: ' + JSON.stringify(values));
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
           // event.preventDefault();
        }

        render(){
            return(

                <div>

                 <Button outline onClick = {this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

                 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                          <Row className="form-group">
                          <Col sm = {12}><Label htmlFor = 'rating'>Rating</Label></Col>
								<Col sm = {12}>
									<Control.select className = 'form-control' type = 'number' 
										model = '.rating' id = 'rating' name = 'rating' min = '0' max = '5' defaultValue = {5}
									>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
									</Control.select>
								</Col>
                            </Row>

                            <Row className="form-group">
                                 <Col sm = {12}>
                                <Label htmlFor="yourname">Your Name</Label>
                                </Col>
                                <Col sm={12}>
                                    <Control.text model=".yourname" id="yourname" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                          <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                           
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            
                           
                            <Row className="form-group">
                               <Col sm = {12}>
                                <Label htmlFor="comment" >Comment</Label>
                                </Col>
                                <Col sm={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} />
                                        <Errors model = '.comment' show='touched' className='text-danger'
										messages = {{
											required: 'This field is required'
										}}
									/> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>


            );
        }



    }

    



export default Dishdetail;