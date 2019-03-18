import React, { Component } from 'react';

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);

    }
    onEdit() {
        this.setState({ isEdit: true });
    }
    onEditSubmit(event) {

        event.preventDefault();
        this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);
        this.setState({ isEdit: false });
    }

    onDelete() {
        const { onDelete, name } = this.props;
        onDelete(name);
    }

    render() {
        const { name, price } = this.props;
        return (
            <div>
                {
                    this.state.isEdit
                        ? (
                            <form onSubmit={this.onEditSubmit} >
                                <input placeholder="name" ref={nameInput => this.nameInput = nameInput} defaultValue={name} />
                                <input placeholder="price" ref={priceInput => this.priceInput = priceInput} defaultValue={price} />
                                <button>Save</button>

                            </form>
                        )
                        : (
                            <div>
                                <span>{name}</span>
                                {'|'}
                                <span>{price}</span>
                                {'|'}
                                <button className="App-EditItems" onClick={this.onEdit}>Edit</button>
                                {'|'}
                                <button className="App-DeleteItems" onClick={this.onDelete}>Delete</button>
                            </div>
                       )
                }
            </div>
        );
    }
}

export default ProductItem;
