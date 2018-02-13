import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdatedBook: PropTypes.func.isRequired
  }

  render() {
    const { books, onUpdatedBook } = this.props

    const currentlyReadingBooks = books.filter( (book) => book.shelf === "currentlyReading")
    const wantToReadBooks = books.filter( (book) => book.shelf === "wantToRead")
    const readBooks = books.filter( (book) => book.shelf === "read")

    const shelves = [
      {id: 'currentlyReading', title: 'Currently Reading', books: currentlyReadingBooks},
      {id: 'wantToRead', title: 'Want To Read', books: wantToReadBooks},
      {id: 'read', title: 'Read', books: readBooks}
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              shelves.map((shelf)=>(
                <BookShelf
                  key={shelf.id}
                  title={shelf.title}
                  bookDicts={shelf.books}
                  onUpdatedBook={onUpdatedBook}>
                </BookShelf>
              ))
            }
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'> Add a book </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
