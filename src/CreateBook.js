import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book'

class CreateBook extends Component {
  static propTypes = {
    onCreatedBook: PropTypes.func.isRequired
  }

  state = {
    foundBooks: []
  }

  clearFoundBooks = () => {
    this.setState({foundBooks: []})
  }

  searchBooksWithSearchTerm = (searchTerm) => {
    console.log('searchTerm: ', searchTerm)
    if (!searchTerm) {
      this.clearFoundBooks()
      return
    }
    BooksAPI.search(searchTerm).then((response) => {
      console.log('response from search: ', response)
      if (response.error) {
        console.log('error: ', response.error)
        this.clearFoundBooks()
        return
      }
      this.setState({foundBooks: response})
    })
  }

  render() {
    const { onCreatedBook } = this.props
    const { foundBooks } = this.state
    console.log('foundBooks to render: ', foundBooks)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'> Close </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event)=>this.searchBooksWithSearchTerm(event.target.value)}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              (foundBooks.length !== 0) && (
                foundBooks.map( (bookDict) => (
                  <li key={bookDict.id}>
                    <Book bookDict={bookDict} onUpdatedBook={onCreatedBook}></Book>
                  </li>
                ))
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default CreateBook
