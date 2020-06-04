import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
// import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../Utils/API";
import { BeerList, BeerListItem } from "../components/BeerList";
import { Container, Row, Col } from "../components/Grid";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Card, Accordion}from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
let bg= require ('../Images/white-marble-3-2018.jpg')

const tabbs ={
  marginTop: "20px",
  boxShadow: "0 3px 6px rgb(82, 80, 80), 0 3px 6px rgb(53, 50, 50)",
  padding: "10px",
  backgroundImage: 'url('+bg+')',
  width: "1050px"
  }
 
const h1 ={
  textAlign: "center",
  fontFamily: "Crimson",
  fontWeight: "550",
  fontSize: "55px",
  
}

  const h2 ={
    textAlign: "center",
    fontFamily: "Crimson",
    fontWeight: "550",
    fontSize: "45px"
  }
  const h4 = {
    padding: "5px",
  fontWeight: "550",
    fontFamily: "Crimson",
  }

  
const cardStyle = {
  marginTop: "5px",
  // width: "auto",
   width: "1050px",
  boxShadow: "0 3px 6px rgb(82, 80, 80), 0 3px 6px rgb(53, 50, 50)",
  padding: "10px",
}

// This is my new gitpush
class Brewery extends Component {
  state = {
    beers: [],
    beerSearch: "",
    cities: [],
    beerCity: "",
    states: [],
    beerState: ""
  };
  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    //const { name, value } = event.target;
    this.setState({
      beerSearch: event.target.value,
      beerCity: event.target.value,
      beerState: event.target.value,
    });
  };
  // Handles the form submit for general search
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get beers update the beers state
    event.preventDefault();
    API.getBeers(this.state.beerSearch)
      .then(res =>{
        console.log(res)
        this.setState({ beers: res.data })
      })
      .catch(err => console.log(err));
  };
// Handles the form submit for the city search
  handleFormSubmit1 = event => {
    // When the form is submitted, prevent its default behavior, get beers update the beers state
    event.preventDefault();
    API.getCity(this.state.beerCity)
      .then(res =>{
        console.log(res)
        this.setState({ cities: res.data })
      })
      .catch(err => console.log(err));
  };
// Handles the form submit for the city search
handleFormSubmit2 = event => {
  // When the form is submitted, prevent its default behavior, get beers update the beers state
  event.preventDefault();
  API.getState(this.state.beerState)
    .then(res =>{
      console.log(res)
      this.setState({ states: res.data })
    })
    .catch(err => console.log(err));
};


  render() {
    return (
      <div>
 <Jumbotron />
<Container>
<Row>  
              <Col size="sm-12">
                  <Accordion>
                       <Card className = "card" style ={cardStyle}>
                          <Card.Header>
                               <Accordion.Toggle as={Button} variant="link" eventKey="0">    
                                  <h1 style={h1}>Breweries</h1>
                              </Accordion.Toggle>
                          </Card.Header>
                               <Accordion.Collapse eventKey="0">
                           <Card.Body>     
                             <p>A craft brewery or microbrewery is a brewery that produces small amounts of beer, typically much smaller than large-scale corporate breweries, and is independently owned. Such breweries are generally characterized by their emphasis on quality, flavor, and brewing technique.

                            The microbrewing movement began in both the United States and United Kingdom in the 1970s, although traditional artisanal brewing existed in Europe for centuries and subsequently spread to other countries. As the movement grew, and some breweries expanded their production and distribution, the more encompassing concept of craft brewing emerged. A brewpub is a pub that brews its own beer for sale on the premises.</p>
                             
                          </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                   </Accordion>
                </Col>
            </Row>  
      <Tabs style={tabbs}>
        <TabList>
          <Tab>General Search</Tab>
          <Tab>City Brewery Search</Tab>
          <Tab>State Brewery Search</Tab>
        </TabList>
        {/* This is tab panel 1 */}
            <TabPanel>  
              <Container>
             {/* Row that holds the search input */}
              <Row className = "row">
                <Col size="md-12">
                  <form>
                   <Container>
                      <Row>
                      <h1 style ={h2} >Enter A Brewery To Search For</h1>
                      <Col size="xs-9 sm-10">
                      <Input
                        name="beerSearch"
                        value={this.state.beerSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a beer"/>
                        </Col>
                        {/* Row that holds the search input */}
                         <Col size="xs-3 sm-2">
                           <Button
                             onClick={this.handleFormSubmit}
                             type="success"
                             className="input-lg">
                             Search
                          </Button>
                         </Col>
                        </Row>
                    </Container>
                  </form>
            </Col>
          </Row>
          {/* Row Ends that holds the search*/}
          <Row className ="breweries">
              <Col size="xs-12">
                {this.state.beers.length ? (
                  <BeerList>
                      {this.state.beers.map(beer => {
                      console.log(beer);
                      return (
                      <BeerListItem
                        key={beer.id}
                        name={beer.name}
                        brewery_type={beer.brewery_type}
                        city={beer.city}
                        street={beer.street}
                        state={beer.state}
                        postal_code={beer.postal_code}
                        id={beer.id}
                        phone={beer.phone}
                        website_url={beer.website_url}
                        onClick={API.savebeer}
                        />
                        );
                      })}
                </BeerList>
              ) : (
                <h3 style = {h4} className="text-center no-bee">No Breweries to Display</h3>
              )}
            </Col>
          </Row>
        </Container>
    </TabPanel>
{/* End of tab panel 1 */}
{/* Beginning of Tab Panel 2 */}
      <TabPanel>
              <Container>
              {/* Row that holds the search input */}
              <Row className = "row">
                <Col size="md-12">
                  <form>
                   <Container>
                      <Row>
                      <h2 style ={h2} className ="enter">Enter A City To Search For A Brewery List</h2>
                      <Col size="xs-9 sm-10">
                      <Input
                        name="beerCity"
                        value={this.state.beerCity}
                        onChange={this.handleInputChange}
                        placeholder="Search For A City"/>
                        </Col>
                        {/* Row that holds the search input */}
                         <Col size="xs-3 sm-2">
                           <Button
                             onClick={this.handleFormSubmit1}
                             type="success"
                             className="input-lg">
                             Search
                          </Button>
                         </Col>
                        </Row>
                    </Container>
                  </form>
            </Col>
          </Row>
          {/* Row Ends that holds the search*/}
          <Row>
            <Col size="xs-12">
              {this.state.cities.length ? (
                  <BeerList>
                  {this.state.cities.map(city => {
                    console.log(city);
                    return (
                      <BeerListItem
                        key={city.id}
                        name={city.name}
                        brewery_type={city.brewery_type}
                        city={city.city}
                        street={city.street}
                        state={city.state}
                        postal_code={city.postal_code}
                        id={city.id}
                        phone={city.phone}
                        website_url={city.website_url}
                        onClick={API.savebeer}
                        />
                        );
                      })}
                </BeerList>
              ) : (
                <h2 style = {h4} className="text-center no-bee">No City Breweries to Display</h2>
              )}
            </Col>
          </Row>
        </Container>
    </TabPanel>
{/* End of tab panel 2 */}
 {/*Beginning of Tab Panel 3*/}
    <TabPanel>
              <Container>
              {/* Row that holds the search input */}
              <Row className = "row">
                <Col size="md-12">
                  <form>
                   <Container>
                      <Row>
                      <h3 style ={h2} className ="enter">Enter A State To Search For A Brewery List</h3>
                      <Col size="xs-9 sm-10">
                      <Input
                        name="beerState"
                        value={this.state.beerState}
                        onChange={this.handleInputChange}
                        placeholder="Search For A State"/>
                        </Col>
                        {/* Row that holds the search input */}
                         <Col size="xs-3 sm-2">
                           <Button
                             onClick={this.handleFormSubmit2}
                             type="success"
                             className="input-lg">
                             Search
                          </Button>
                         </Col>
                        </Row>
                    </Container>
                  </form>
            </Col>
          </Row>
          {/* Row Ends that holds the search*/}
          <Row>
            <Col size="xs-12">
              {this.state.states.length ? (
                  <BeerList>
                  {this.state.states.map(state => {
                    console.log(state);
                    return (
                      <BeerListItem
                        key={state.id}
                        name={state.name}
                        brewery_type={state.brewery_type}
                        city={state.city}
                        street={state.street}
                        state={state.state}
                        postal_code={state.postal_code}
                        id={state.id}
                        phone={state.phone}
                        website_url={state.website_url}
                        onClick={API.savebeer}
                        />
                        );
                      })}
                    </BeerList>
                    ) : (
                      <h2 style = {h4} className="text-center no-bee">No State Breweries to Display</h2>
                    )}
                  </Col>
                </Row>
              </Container>
            </TabPanel>
        {/* End of tab panel 3 */}

    </Tabs>
        
   </Container> 
</div>
    );
  }
}
export default Brewery;