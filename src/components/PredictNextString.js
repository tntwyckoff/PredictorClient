import React, { useState, useEffect } from 'react';
import ApiService from '../services/apiService';
import './PredictNextString.css';

class PredictNextString extends React.Component {
    apiService = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            currentString: "",
            lastSuccess: false,
            lastData: {},
            details: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.analyzeString = this.analyzeString.bind(this);
    }

    componentDidMount() {
        console.debug(`SetTestString: componentDidMount()`);
    }

    render() {
        return (
            <div class="predict-next-string">
                <div class="autoCentered">
                    <div class="label">
                        <p>
                            String to analyze:
                        </p>
                    </div>
                    <div class="container">
                        <form>
                            <div class="group">
                                <input type="text" required value={this.state.currentString} onChange={this.handleChange} />
                                <label>Enter one of the words from above</label>
                            </div>
                        </form>
                    </div>
                    <button class="btn btn-4 btn-sep icon-info" onClick={this.analyzeString}>Analyze</button>
                </div>
                {this.state.lastSuccess &&
                    <div class="autoCentered">
                        <ul>{this.state.details}</ul>
                    </div>
                }               
            </div>
        );
    }

    analyzeString() {
        this.apiService.analyzeString(this.state.currentString)
            .then(
                (data) => {
                    if (data) {
                        const lDetails = [];

                        for (const propertyKey in data) {
                            lDetails.push(this.getLiForProperty(data, propertyKey));
                        }

                        this.setState({
                            lastData: data,
                            lastSuccess: true,
                            details: lDetails
                        });

                        console.debug(`Got analysis result`);
                    } else {
                        console.debug("No data returned");
                    }
                },
                (error) => {
                    console.error(`Unable to analyze string: ${error}`);
                }
            );
    }

    handleChange(event) {
        this.setState({
            currentString: event.target.value
        });
        console.debug(`New string to analyze: ${this.state.currentString}`);
    }

    getLiForProperty(obj, propertyKey) {
        var pct = obj[propertyKey].toLocaleString(undefined, { minimumFractionDigits: 3 });
        return <li key={propertyKey}>{propertyKey}: {pct}</li>;
    }

}


export default PredictNextString;