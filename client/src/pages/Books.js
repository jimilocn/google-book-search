import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Button from "../components/Button";
// import BookCard from "../components/BookCard";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    search:"",
    title: "",
    authors: "",
    info: "",
    thumbnail:"",
    saved:[],
    id:""
  };

  componentDidMount() {
    this.loadSavedBooks();
    console.log("saved books",this.state.saved)
  }

  loadSavedBooks = () => {

  }

  loadBooks = () => {
    API.getGoogleBooks(this.state.title)
      .then(res =>{
        this.setState({ books: res.data})
        console.log("searched books", res.data)
        console.log("search: ",this.state.title)
        // console.log("state books:"+this.state.books)
      }
      )
      .catch(err => console.log(err));
      
      // console.log(this.state.title)
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
   
    console.log(this.state.title, "search the title")
    if (this.state.title){
    
      this.loadBooks();
      this.setState({title: ""})
      }
    }

    handleSaveSubmit = (e, id) => {
      e.preventDefault();

      const book = this.state.books.find(book => book.id===id)
        console.log(book,"this is the state id for the book")
        console.log('click')
      API.saveBook ({
        id: book.id,
        thumbnail:book.volumeInfo.imageLinks.thumbnail,
        info:book.volumeInfo.description,
        title:book.volumeInfo.title,
        authors:book.volumeInfo.authors
      }).then(res => this.setState({saved: res.data}))
      console.log("HOLY MOLY", this.state.saved)


      // event.preventDefault();
    //  this.setState({id: books.id})

  if(this.state.id){
        // API.getGoogleBooks(this.state.title)
        //   .then(res => this.setState({books: res.data}))
        //   .catch(err=>console.log(err))
        console.log(this.state.id)
        this.loadSaveBooks();
        this.setState({title: ""})
    }}
      
      loadSaveBooks = () => {
        API.getGoogleBooks(this.state.id)
          .then(res =>{
      
            this.setState({ saved: res.data})
            console.log("saved books", res.data)
    
            // console.log("state books:"+this.state.books)
          }
          )
          .catch(err => console.log(err));
          
          // console.log(this.state.title)
      };
  
    
 

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1 class="header-font">What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="key word for search"
              />
 
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search For Book
              </FormBtn>
              {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  // console.log("BOOK ID",book.id),

                  <ListItem 
                  key={book._id} 
                  id={book.id}
                  thumbnail={book.volumeInfo.imageLinks.thumbnail} 
                  info={book.volumeInfo.description}
                  title={book.volumeInfo.title}
                  authors= {book.volumeInfo.authors}
                  >

                    <a href={book.volumeInfo.infoLink} target="_blank">
                      <strong>
                        {book.volumeInfo.title} by {book.volumeInfo.authors}
                        
                      </strong>
                      </a>

                    <DeleteBtn onClick={() => this.deleteBook(book.id)} />
                    <FormBtn 
                     onClick={(e) => this.handleSaveSubmit(e, book.id)}>
                      save book
                    </FormBtn>
           
                   </ListItem>
                 
                ))}
              </List>
            ) : (
              <h3>No Search Results to Display</h3>
            )}
            </form>
           

           
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1 class="header-font">Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
            {this.state.saved.map(saved => (
              <ListItem key={saved._id}>
                <Link to={"/books/" + saved._id}>
                  <strong>
                    {saved.title} by {saved.author}
                  </strong>
                </Link>
                <DeleteBtn onClick={() => this.deleteBook(saved._id)} />
              </ListItem>
            ))}
           </List> 
            ):(<h3>This area should be displaying Saved books. . Need to continue to fix the bugs</h3>
              )}
            
          </Col>
        </Row>
      </Container>
    )
  };
}

export default Books;

