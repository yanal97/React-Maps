import React, { Component } from 'react';
import MyContext from "./MyContext";

class Hamburger extends Component {


/* my state contains the venues and the filtered venues which will be explained later down there*/	
	state  = {
		venues:[],
		filteredVenues:null,
	}

	//calls the hamburger arrow function for it to Mount.
	componentDidMount(){
	    this.hamburger()
	  }

	//simple hamburger function for toggling the menu
	//classes are CSS design modifications given to the menu
	hamburger = () => {
		var menu = document.querySelector('#menu');
		var drawer = document.querySelector('.nav');

		menu.addEventListener('click', function(e) {
		drawer.classList.toggle('open');
		e.stopPropagation();
		});
		menu.addEventListener('doubleclick', function() {
		drawer.classList.remove('open');
		});
	}
	/*
		the search function will filter all the venues available and match them with what the user searched,
		it will only show the venues that match the search. 
	*/
	search(context,event){
		let filteredVenues=null
		if(event.target.value){
			filteredVenues = context.venues.filter((venue) => venue.venue.name.includes(event.target.value)).map( (venue , i) => <li onClick={()=>{context.selectMarker(venue.venue.id)}} key={i} tabIndex = {i} aria-label = {venue.venue.name} style={{cursor: "pointer"}}><a>{venue.venue.name}</a></li>);
		}
		this.setState({
			filteredVenues:filteredVenues
		})
	}


	render() {
		return(
		<main>
					<MyContext.Consumer >
					{
						
						context =>{
							return(
								<div className="options-box nav" style={{overflow: "scroll"}}>
							<h3>VISIT JORDAN!</h3>
						 <input onChange={this.search.bind(this,context)} type="text" placeholder="Search" aria-label='search'/>
						 <ul className="list">
							{ (this.state.filteredVenues ?
							this.state.filteredVenues
							:
							context.venues.map( (venue , i) => <li onClick={() =>context.selectMarker(venue.venue.id)} key={i} tabIndex = {i} aria-label = {venue.venue.name} style={{cursor: "pointer"}}><a>{venue.venue.name}</a></li>)
							)}
						 </ul>
 
						 <label> Powered by Google Maps & Foursquare</label>
					 </div>
							)
							

						}
					}
					</MyContext.Consumer>

      	</main>

		)
	}

}

export default Hamburger;