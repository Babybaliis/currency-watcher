const REST_URL = process.env.REACT_APP_REST_URL || '';
export default {
    get(restUrl: string = REST_URL, resource: string, cb: (res: any) => void) {
        const methodPoolUrl = `${restUrl}/${resource}/poll`
        const methodUrl = `${restUrl}/${resource}`

        async function subscribe(url: string) {
            let response = await fetch(url);
            if (response.status == 502) {
                await subscribe(methodPoolUrl);
            } else if (response.status != 200) {
                // showMessage(response.statusText);
                await new Promise(resolve => setTimeout(resolve, 1000));
                await subscribe(methodPoolUrl);
            } else {
                let data = await response.json();
                cb(data)
                await subscribe(methodPoolUrl);
            }
        }

        subscribe(methodUrl)
    },

    getFirst(cb: (res: any) => void, restUrl = REST_URL) {
        this.get(restUrl, 'first', cb);
    },

    getSecond(cb: (res: any) => void, restUrl = REST_URL) {
        this.get(restUrl, 'second', cb);
    },

    getThird(cb: (res: any) => void, restUrl = REST_URL) {
        this.get(restUrl, 'third', cb);
    }
};



