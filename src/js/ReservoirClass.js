export class Reservoir {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    write(data) {
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(json => resolve(json))
                .catch(error => reject(error));
        });
    }

    best() {
        return new Promise((resolve, reject) => {
            const url = new URL(this.baseUrl + "/best");

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(json => resolve(json))
                .catch(error => reject(error));
        });
    }

    read(params = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(this.baseUrl);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(json => resolve(json))
                .catch(error => reject(error));
        });
    }

    erase(params = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(this.baseUrl);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(text => resolve(text))
                .catch(error => reject(error));
        });
    }
}

/*
// Example usage:
const reservoir = new Reservoir('http://192.168.1.53:8080');

// POST example
const postData = {
    pseudo: 'christophet60',
    level: 'achilles',
    elapsed: 20000,
    erred: 0,
    revealed: 32,
    symbol: 'canonical',
    scrambled: true
};
reservoir.write(postData)
    .then(data => console.log('POST response:', data))
    .catch(error => console.error('POST error:', error));

// GET example
reservoir.read({ pseudo: 'christophet60' })
    .then(data => console.log('GET response:', data))
    .catch(error => console.error('GET error:', error));

// DELETE example
reservoir.erase({ pseudo: 'christophet60' })
    .then(data => console.log('DELETE response:', data))
    .catch(error => console.error('DELETE error:', error));
*/