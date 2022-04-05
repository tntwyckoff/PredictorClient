import React, { useState, useEffect } from 'react';
import ApiService from '../services/apiService';

class SetTestString extends React.Component {
    apiService = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            currentString: "...loading...",
            loaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadLatestString = this.loadLatestString.bind(this);
        this.resetString = this.resetString.bind(this);
        this.updateString = this.updateString.bind(this);
    }

    componentDidMount() {
        console.debug(`SetTestString: componentDidMount()`);
        this.loadLatestString();
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td width="20%">
                                Test string:
                            </td>
                            <td>
                                {this.state.currentString}
                            </td>
                        </tr>
                        {this.state.loaded &&
                            <tr>
                                <td width="20%">
                                    Set string:
                                </td>
                                <td>
                                    <input type="text" value={this.state.currentString} onChange={this.handleChange} />
                                </td>
                            </tr>
                        }
                        {this.state.loaded &&
                            <tr>
                                <td>
                                <button onClick={this.updateString}>Post</button>
                                <button onClick={this.resetString}>Reset</button>
                                </td>
                                <td>
                                    &nbsp;
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    loadLatestString() {
        this.apiService.getCurrentString()
            .then(
                (data) => {
                    if (data) {
                        this.setState({
                            currentString: data.sourceString,
                            loaded: true
                        });
                        console.debug(`Source string: ${this.state.currentString}`);
                    } else {
                        console.debug("No data returned");
                    }
                },
                (error) => {
                    console.error(`Unable to DL source string: ${error}`);
                }
            );
    }

    handleChange(event) {
        this.setState({
            currentString: event.target.value
        });
        console.debug(`New string: ${this.state.currentString}`);
    }

    handleSubmit(event) {
        event.preventDefault();
        // reach out to the api here
    }

    resetString(e) {
        this.loadLatestString();
    }

    updateString(e) {
        console.debug(`POSTING...`);
        this.apiService.setCurrentString(this.state.currentString)
            .then(() => {
                window.alert('Post was successful.');
            },
                (error) => {
                    console.error(`Unable to DL source string: ${error}`);
            });
    }

}

export default SetTestString;