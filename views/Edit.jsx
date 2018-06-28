var React = require("react");

class Edit extends React.Component {
  render() {
    const editAction = '/pokemon/' + this.props.pokemon.id + '?_method=PUT';
    const deleteAction = '/pokemon/' + this.props.pokemon.id + '?_method=DELETE';

    return (
      <html>
        <head />
        <body>
          <h4>Editing: {this.props.pokemon.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/pokemon/"+ this.props.pokemon.id + "?_method=PUT"}>
            <div className="pokemon-attribute">
              id:<input name="id" type="text" defaultValue={this.props.pokemon.id} />
            </div>
            <div className="pokemon-attribute">
              num:<input
                name="num"
                type="text"
                defaultValue={this.props.pokemon.num}
              />
            </div>
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={this.props.pokemon.name}
              />
            </div>
            <div className="pokemon-attribute">
              img:<input
                name="img"
                type="text"
                defaultValue={this.props.pokemon.img}
              />
            </div>
            <div className="pokemon-attribute">
              height:<input
                name="height"
                type="text"
                defaultValue={this.props.pokemon.height}
              />
            </div>
            <div className="pokemon-attribute">
              weight:<input
                name="weight"
                type="text"
                defaultValue={this.props.pokemon.weight}
              />
            </div>  
          <input type="submit" formaction={editAction} value="Save Edits" />
          <input type="submit" formaction={deleteAction} value="Delete" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
