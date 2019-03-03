import React, { Component } from "react";
import "./App.css";
import SearchItem from "./Components/SearchItem";
import SearchBar from "./Components/SearchBar";

const endpoint = "https://www.googleapis.com/books/v1/volumes?q=";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: [],
      timer: 0
    };
  }

  searchRequest = title => {
    if (title.trim()) {
      this.setState({ loading: true });

      var timerId = setTimeout(() => {
        alert("Your search is taking an abnormally long time, please check your connection.");
        this.setState({
          loading: false
        });
      }, 10000);

      this.setState({ timer: timerId }, () => {
        fetch(endpoint + title)
          .then(res => res.json())
          .then(json => {
            if(json.totalItems===0){
                clearTimeout(this.state.timer);
                alert("Couldn't find any results, please try another search term");
                this.setState({
                loading: false
                });
            }
            const results = json.items.map(item => {
              const info = item.volumeInfo;
              if (info) {
                return {
                  authors: info.authors || null,
                  thumbnail: info.imageLinks
                    ? info.imageLinks.thumbnail || null
                    : null,
                  publisher: info.publisher || null,
                  title: info.title || null,
                  infoLink: info.infoLink || null
                };
              } else {
                return null;
              }
            });
            this.setState(
              {
                loading: false,
                results
              },
              () => {
                clearTimeout(this.state.timer);
              }
            );
          });
      });
    } else {
      alert("Please enter a valid search");
    }
  };

  render() {
    const bookResults = this.state.results.map((book, index) => {
      return (
        <SearchItem
          key={index}
          title={book.title}
          thumbnail={book.thumbnail}
          infoLink={book.infoLink}
          authors={book.authors}
          publisher={book.publisher}
        />
      );
    });
    return (
      <div className="App">
        <header className="App-header">
          <div
            style={{
              margin: 20
            }}
          >
            Book Finder
          </div>
          <SearchBar
            loading={this.state.loading}
            onSubmit={this.searchRequest}
          />
          <div
            style={{
              width: "90%",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {bookResults}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
