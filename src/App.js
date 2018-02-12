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
      console.log(this.state.books)
    })
  }

  updatedBooks = (book) => {
    let currentBooks = this.state.books
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
      console.log('update call response: ', response)
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
    let currentBooks = this.state.books

    BooksAPI.update(book, shelf).then((response) => {
      console.log('update call response: ', response)
      currentBooks.push(book)
      this.setState({books: currentBooks})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
            <ListBooks books={this.state.books} onUpdatedBook={this.updateBooksStateWithUpdatedBook}>
            </ListBooks>
          )}>
        </Route>
        <Route path='/search' render={({history}) => (
            <CreateBook onCreatedBook={this.updateBooksStateWithCreatedBook}>
            </CreateBook>
          )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
