import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class CreateBook extends Component {

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
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{ width: 128, height: 193, backgroundImage: `url(${ bookDict.imageLinks.thumbnail })` }}>
                        </div>
                        <div className="book-shelf-changer">
                          <select value='none'>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{ bookDict.title }</div>
                      <div className="book-authors">
                      </div>
                    </div>
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
