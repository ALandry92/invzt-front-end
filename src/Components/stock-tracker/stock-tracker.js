import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import './stock-tracker.css'

class StockTracker extends Component {

    state = {
        search: '',
        stock: undefined,
        portFolios: [],
        portfolio: "",
        totalShares: 0
    }

    componentDidMount() {
        const id = localStorage.getItem("loggedInUser");

        axios.get(`http://localhost:2500/invest/api/findPortfolios/${id}`)
            .then( response => {
                console.log(response.data);
                this.setState(
                    {
                        portFolios: response.data
                    }
                )
            }).catch(error => {

        });
    }
    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )

    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:2500/invest/api/stock/${this.state.search}`)
            .then(response => {
                console.log(response);
                this.setState({
                    stock:
                    response.data
                })
            }).catch(error => {
            //Display some error message
        })
    }


    addstock = () => {
        let stock = {
            fullName:  this.state.stock.quoteType.longName,
            ticker: this.state.stock.quoteType.symbol,
            totalShares: this.state.totalShares,
            price: this.state.stock.price.regularMarketPreviousClose.raw
        }
        axios.post(`http://localhost:2500/invest/api/portfolio/${this.state.portfolio}/add-stock`, stock)
            .then(response => {
                console.log("STock added ::> ", response)
                this.setState(
                    {
                        search: '',
                        stock: undefined,
                        portFolios: [],
                        portfolio: "",
                        totalShares: 0
                    }
                )
            }).catch(error => {

        });
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

        let options = this.state.portFolios && this.state.portFolios.length > 0? this.state.portFolios
                .map ( (item, index) => {
                    return <option key={index} value={item.id}>{item.name}</option>
                }) : ""


        return (
            <div className="stock-container">
                <div className="col-8 offset-2">
                <form onSubmit={this.handleSubmit} className="form-inline">

                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="inputSearch" className="sr-only">Search</label>
                        <input onChange={this.handleChange} name="search" type="text" className="form-control" id="inputSearch" placeholder="Search"/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Search stock</button>
                </form>
                </div>
                { this.state.stock?
                    <div className="col-12">
                        <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{this.state.stock.quoteType && this.state.stock.quoteType.longName? this.state.stock.quoteType.longName : ""}</h5>
                                    <p className="card-text"><strong>Symbol: </strong>{this.state.stock.quoteType && this.state.stock.quoteType.symbol? this.state.stock.quoteType.symbol : ""}</p>
                                    <p className="card-text"><strong>Value $: </strong>{this.state.stock.price && this.state.stock.price.regularMarketPreviousClose.raw? this.state.stock.price.regularMarketPreviousClose.raw: ""}</p>
                                    <input name="totalShares" type={"number"} onChange={this.onChangeHandler} />
                                    <select className="form-control" onChange={this.onChangeHandler} name={"portfolio"} value={this.state.portfolio}>
                                      <option value="">Select an portfolio</option>
                                        {options}
                                    </select>

                                    <button className="btn btn-primary" onClick ={() => this.addstock()}>Add To Portfolio</button>
                                </div>
                        </div>

                    </div> : ""
                }
            </div>
        );
    }
}
export default StockTracker;