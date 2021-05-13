import React from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import "../index.css";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    
    if (data.loading) {
      return <option>Loading Authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    //as we have bind this so this is refering to component itself

    //here we are invoking addBookMutation function to add books
    this.props.addBookMutation({
        variables:{
            name:this.state.name,
            genre:this.state.genre,
            authorId:this.state.authorId
        },
        refetchQueries:[{query:getBooksQuery}]
    });
    e.target.reset();
  }
  render() {
    return (
      <form className="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name</label>
          <input
            type="text"
            onChange={(e) =>
              this.setState({
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            onChange={(e) =>
              this.setState({
                genre: e.target.value,
              })
            }
          />
        </div>
        <div className="field">
          <label>Author Name</label>
          <select
            onChange={(e) =>
              this.setState({
                authorId: e.target.value,
              })
            }
          >
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
