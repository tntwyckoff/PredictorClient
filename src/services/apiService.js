class ApiService {
    apiBase = "";
    reqHeaders = new Headers();

    constructor() {
        this.apiBase = process.env.REACT_APP_API_BASE;
        this.reqHeaders.set('Content-Type', 'application/json');

        console.debug(`API base: ${this.apiBase}`);
    }

    getCurrentString() {
        const req = new Request(this.apiBase, {
            method: 'GET',
            headers: this.reqHeaders
        });

        return fetch(req).then(res => res.json());
    }

    setCurrentString(newString) {
        const req = new Request(this.apiBase, {
            method: 'POST',
            headers: this.reqHeaders,
            body: JSON.stringify({
                "sourceString": newString
            })
        });

        return fetch(req).then(res => res.json());
    }

    analyzeString(stringToAnalyze) {
        const req = new Request(`${this.apiBase}/${stringToAnalyze}`, {
            method: 'GET',
            headers: new Headers()
        });

        return fetch(req).then(res => res.json());
    }

};

export default ApiService;