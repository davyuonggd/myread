import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    bookDicts: PropTypes.array.isRequired
  }

  render() {
    const { title, bookDicts } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { bookDicts.map( (bookDict) => (
              <li key={bookDict.id}>
                <Book bookDict={bookDict} ></Book>
              </li>
            )) }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
