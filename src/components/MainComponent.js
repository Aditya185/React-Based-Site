import React, { Component } from 'react';
import '../App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import { render } from 'react-dom';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
      }

     
    
      onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
      }

render(){
  const HomePage = () => {
    return(
        <Home 
            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
    );
    
  }

  const DishWithId = ({match}) => {
    return(
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };

  return (
    <div>
    
        <Header />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route eexact path='/contactus' component={Contact} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
    </div>
  );
  }
}

export default Main;
