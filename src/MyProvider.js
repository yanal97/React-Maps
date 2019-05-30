import React , {Component} from "react";
import MyContext from './MyContext';
import axios from 'axios';

//my provider is a context provider that provides the other components with all the shared states 
//and functions... it is the parent component.! 

class MyProvider extends Component {
  
  selectMarker = (selectedMarkerId)=>{
      this.setState(
          {
              selectedMarkerId:selectedMarkerId
          });    
  }
  
  state = {
      venues: [],
      selectedMarker:null,
      selectedMarkerId:null,
      selectMarker:this.selectMarker

  };

  //this function abstracts all the shops near amman from Foursquare
  //Axios sets the state Venues with all the responses from Foursquare
  getVenues = () => {
      const endPoint = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id: "YXBM5OP13K3KNBKNZVPENUHNRY5YZSHO2EEF2KE13XY12AFY",
        client_secret: "FR1BIQUQPYDENZUB2IFR5V1UHCFMM4AN3YOXAZ3BFNQMTQS5",
        query: "shops",
        near: "Amman",
        v: "20190413"
      }
      axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => {
            this.setState({
              venues: response.data.response.groups[0].items
            });
          }
  
        )
        .catch(error => {
          console.log("ERROR!" + error)
        })
    }

    componentDidMount(){
        this.getVenues();
    }

    render() {
        return (
            <MyContext.Provider value={{venues: this.state.venues , 
            selectedMarker:this.state.selectedMarker, selectMarker:this.state.selectMarker , selectedMarkerId:this.state.selectedMarkerId}}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}


export default MyProvider;