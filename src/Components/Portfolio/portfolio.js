import React, {Component} from 'react';
import axios from "axios";
import './portfolio.css'

class Portfolio extends Component {

    state = {
        portFolios: [],
        newPortfolio: "",
        displayStocks: [],
        selectedPortfolio: undefined
    }

    componentDidMount() {
        const id = localStorage.getItem("loggedInUser");

        axios.get(`http://localhost:2500/invest/api/findPortfolios/${id}`)
            .then(response => {
                this.setState(
                    {
                        portFolios: response.data
                    }
                )
            }).catch(error => {

        });
    }

    getPortfolioStocks = (e) => {
        this.setState({selectedPortfolio: e.target.value})
        axios.get(`http://localhost:2500/invest/api/findPortfolioStocks/${e.target.value}`)
            .then(response => {
                console.log("Display stocks ::> ", response)
                this.setState(
                    {
                        displayStocks: response.data
                    }
                )
            }).catch(error => {

        });
    }

    createPortfolio = () => {
        axios.post(`http://localhost:2500/invest/api/create/portfolio/${localStorage.getItem("loggedInUser")}`,
            {name: this.state.newPortfolio}
        )
            .then(response => {
                console.log(response)
                this.setState(
                    {
                        newPortfolio: "",
                        portFolios: response.data
                    }
                )
            }).catch(error => {
            console.log(error)
        });
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    deletestock(stock) {
        console.log(stock)
        axios.post((`http://localhost:2500/invest/api/delete-stock/${stock.id}`))

            .then(response => {

            let filteredStocks = this.state.displayStocks
             .filter( item => item.id != stock.id)
            this.setState({displayStocks : filteredStocks})
            }).catch(error => {
            console.log(error)
            });
    }

    render() {

        let options = this.state.portFolios && this.state.portFolios.length > 0 ? this.state.portFolios
            .map((item, index) => {
                return <option key={index} value={item.id}>{item.name}</option>
            }) : ""

        let portfolio = this.state.portFolios && this.state.portFolios.length > 0 ?
            this.state.portFolios.filter(item => item.id == this.state.selectedPortfolio)
                .map((item, index) => {

                    let stocks = this.state.displayStocks && this.state.displayStocks.length > 0 ?
                        this.state.displayStocks.map((stock, index) => {
                            return  <div className="col-4" key={{index}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{stock.fullName ? stock.fullName : ""}</h5>
                                            <p className="card-text">
                                                <strong>Symbol: </strong>{stock.ticker ? stock.ticker : ""}
                                            </p>
                                            <p className="card-text"><strong>Total Shares
                                                $: </strong>{stock.totalShares ? stock.totalShares : ""}
                                            </p>
                                            <p className="card-text"><strong>Price
                                                $: </strong>{stock.price ? stock.price : ""}
                                            </p>
                                            <button className="btn btn-danger" onClick={() => this.deletestock(stock)}>REMOVE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        }) : ""
                    return <div className="row" key={index}>
                        <div className="col-12">
                            <h3>{item.name}</h3>
                        </div>

                        {stocks}
                    </div>

                }) : ""

        return (
            <div className="container">
                <div className="row">
                    <p>This is your current Portfolio:</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor=""></label>
                            <input type="text" className="form-control" name="newPortfolio" value={this.state.newPortfolio}
                                   onChange={(e) => this.onChangeHandler(e)} id="exampleInputEmail1"
                                   placeholder="Portfolio name"/>
                        </div>
                        <div className="form-group ">
                            <button type="button" onClick={(e) => this.createPortfolio(e)}
                                    className="btn btn-primary btn-sm">Add Portfolio
                            </button>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <h3>Display Portfolio Stocks</h3>
                    <div className="col-8 offset-2">
                        <select className="form-control" onChange={this.getPortfolioStocks}
                                name={"portfolio"}>
                            <option value="">Select an portfolio</option>
                            {options}
                        </select>
                    </div>

                </div>
                {portfolio}

            </div>)
    }
}

export default Portfolio;

