import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    bookDict: PropTypes.object.isRequired,
    onUpdatedBook: PropTypes.func.isRequired
  }

  onSelectShelf = (event) => {
    const selectedShelf = event.target.value
    // console.log(selectedShelf)
    const { bookDict, onUpdatedBook } = this.props
    bookDict.shelf = selectedShelf
    // console.log(this.props.bookDict)
    onUpdatedBook(bookDict)
  }

  render() {
    const { bookDict } = this.props
    const authors = bookDict['authors']
    console.log('authors: ', authors)
    console.log('bookTitle: ', bookDict.title)

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${ bookDict.imageLinks.thumbnail })` }}>
          </div>
          <div className="book-shelf-changer">
            <select value={bookDict.shelf ? bookDict.shelf : 'none'} onChange={this.onSelectShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ bookDict.title }
        </div>
        { //check authors and display multiple authors
          (Array.isArray(authors)) && (authors.map((author) => (
            <div key={author} className="book-authors">
              {author}
            </div>
          )))
        }
      </div>
    )
  }
}

export default Book
