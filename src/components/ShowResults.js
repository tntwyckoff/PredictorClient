import React, { useState, useEffect } from 'react';
import ApiService from '../services/apiService';

class ShowResults extends React.Component {
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
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                String to analyze:
                            </td>
                            <td>
                                <input type="text" value={this.state.currentString} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.analyzeString}>Analyze</button>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                        </tr>
                        {this.state.lastSuccess &&
                            <tr>
                                <td>
                                    <ul>{this.state.details}</ul>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    analyzeString() {
        this.apiService.analyzeString(this.state.currentString)
            .then(
                (data) => {
                    if (data) {
                        const lDetails = [];

                        for(const propertyKey in data){
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
        var pct = obj[propertyKey].toLocaleString (undefined, { minimumFractionDigits: 3 });
        return <li key={propertyKey}>{propertyKey}: {pct}</li>;
    }

}


export default ShowResults;