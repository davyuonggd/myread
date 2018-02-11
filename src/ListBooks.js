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

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title='Currently Reading'
              bookDicts={currentlyReadingBooks}
              onUpdatedBook={onUpdatedBook}>
            </BookShelf>

            <BookShelf
              title='Want To Read'
              bookDicts={wantToReadBooks}
              onUpdatedBook={onUpdatedBook}>
            </BookShelf>

            <BookShelf
              title='Read'
              bookDicts={readBooks}
              onUpdatedBook={onUpdatedBook}>
            </BookShelf>
          </div>
        </div>
        <div className="open-search">
          <Link to='/create'> Add a book </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
