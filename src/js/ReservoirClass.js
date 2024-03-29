export class Reservoir {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async write(data) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async read(params = {}) {
        const url = new URL(this.baseUrl);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url);
        return await response.json();
    }

    async erase(params = {}) {
        const url = new URL(this.baseUrl);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url, { method: 'DELETE' });
        return await response.text();
    }
}
/*
// Example usage:
const reservoir = new Reservoir('http://192.168.1.53:5000');

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