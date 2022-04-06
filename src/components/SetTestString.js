import React, { useState, useEffect } from 'react';
import ApiService from '../services/apiService';
import './SetTestString.css';

class SetTestString extends React.Component {
    apiService = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            currentString: "",
            loaded: false,
            editing: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadLatestString = this.loadLatestString.bind(this);
        this.resetString = this.resetString.bind(this);
        this.updateString = this.updateString.bind(this);
        this.startEditString = this.startEditString.bind(this);
        this.cancelEditString = this.cancelEditString.bind(this);
    }

    componentDidMount() {
        console.debug(`SetTestString: componentDidMount()`);
        this.loadLatestString();
    }

    render() {
        return (
            <div class="set-test-string">
                <span class="hnf-btn__inner">
                    <svg focusable="false" class="svg-icon  hnf-svg-icon hnf-btn__icon hnf-person__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6724 6.4678c.2734-.2812.6804-.4707 1.3493-.4707.3971 0 .705.0838.9529.2225.241.1348.4379.3311.5934.6193l.0033.006c.1394.2541.237.6185.237 1.1403 0 .7856-.2046 1.2451-.4796 1.5278l-.0048.005c-.2759.2876-.679.4764-1.334.4764-.3857 0-.6962-.082-.956-.2241-.2388-.1344-.4342-.3293-.5888-.6147-.1454-.275-.2419-.652-.2419-1.1704 0-.7902.2035-1.2442.4692-1.5174zm1.3493-2.4717c-1.0834 0-2.054.3262-2.7838 1.0766-.7376.7583-1.0358 1.781-1.0358 2.9125 0 .7656.1431 1.483.4773 2.112l.0031.0058c.3249.602.785 1.084 1.3777 1.4154l.0062.0035c.5874.323 1.2368.4736 1.9235.4736 1.0818 0 2.0484-.3333 2.7755-1.0896.7406-.7627 1.044-1.786 1.044-2.9207 0-.7629-.1421-1.4784-.482-2.0996-.3247-.6006-.7844-1.0815-1.376-1.4125-.5858-.3276-1.2388-.477-1.9297-.477zM6.4691 16.8582c.2983-.5803.7228-1.0273 1.29-1.3572.5582-.3191 1.2834-.5049 2.2209-.5049h4.04c.9375 0 1.6626.1858 2.2209.5049.5672.3299.9917.7769 1.29 1.3572.3031.5896.4691 1.2936.4691 2.1379v1h2v-1c0-1.1122-.2205-2.1384-.6904-3.0523a5.3218 5.3218 0 0 0-2.0722-2.1769c-.9279-.5315-2.0157-.7708-3.2174-.7708H9.98c-1.1145 0-2.2483.212-3.2225.7737-.8982.5215-1.5928 1.2515-2.0671 2.174C4.2205 16.8577 4 17.8839 4 18.9961v1h2v-1c0-.8443.166-1.5483.4691-2.1379z"></path>
                    </svg>
                    <div class="hnf-btn__label">
                        Hej! Slightly better implementation of the prediction challenge!
                    </div>
                </span>
                {!this.state.editing &&
                    <div class="parent">
                        <p>
                            <span class="label">Current source string:</span>
                            <br />
                            <blockquote>
                                {this.state.currentString}
                            </blockquote>
                        </p>
                        <button class="btn btn-4 btn-sep icon-info" onClick={this.startEditString}>Edit</button>
                    </div>
                }
                <div class="parent">
                    {this.state.editing &&
                        <div>
                            <p>
                                Modify test string:
                            </p>
                            <input type="text" value={this.state.currentString} onChange={this.handleChange} />
                            <br />
                            <button class="btn btn-4 btn-sep icon-info" onClick={this.updateString}>Post</button>
                            <button class="btn btn-4 btn-sep icon-info" onClick={this.cancelEditString}>Cancel</button>
                        </div>}
                </div>
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
                // window.alert('Post was successful.');
                this.cancelEditString({});
            },
                (error) => {
                    console.error(`Unable to DL source string: ${error}`);
                });
    }

    startEditString(e) {
        this.setState({
            editing: true
        })
    }

    cancelEditString(e) {
        this.setState({
            editing: false
        })
    }

}

export default SetTestString;