import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import CreateBook from './CreateBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState( {
        books: books
      })
    })
  }

  updatedBooks = (book) => {
    let currentBooks = [...this.state.books]
    const index = currentBooks.findIndex(b => b.id === book.id)
    if (index < 0) {
      return null
    }
    currentBooks[index] = book
    return currentBooks
  }

  updateBooksStateWithUpdatedBook = (book) => {
    const shelf = book.shelf

    //update the book's shelf on the server
    BooksAPI.update(book, shelf).then((response) => {
      // console.log('update call response: ', response)
      const updatedBooks = this.updatedBooks(book)
      if (updatedBooks === null) {
        return
      }
      this.setState({
        books: updatedBooks
      })
    })
  }

  updateBooksStateWithCreatedBook = (book) => {
    const shelf = book.shelf
    // let currentBooks = this.state.books //object is assigned by reference, and we are going to manipulate this object, so we should not do this.
    const currentBooks = [...this.state.books] //using `spread syntax` to create a copy of the array, so we don't manipulate the state directly. More information about spread syntax can be found here: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax

    BooksAPI.update(book, shelf).then((response) => {
      // console.log('update call response: ', response)
      //check if new book is already in state's books
      const index = currentBooks.findIndex(b => b.id === book.id)
      if (index < 0) { //new book is not in state's books, then add it in
        currentBooks.push(book)
      }
      else { //new book is in state's book, update the existing book's shelf
        currentBooks[index].shelf = shelf
      }
      this.setState({books: currentBooks})
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={()=>(
            <ListBooks books={books} onUpdatedBook={this.updateBooksStateWithUpdatedBook}>
            </ListBooks>
          )}>
        </Route>
        <Route path='/search' render={({history}) => (
            <CreateBook onCreatedBook={this.updateBooksStateWithCreatedBook} currentBooks={books}>
            </CreateBook>
          )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
