// Function to fetch or retrieve the session identifier

// Function to retrieve the session identifier from cookies
function getCachedSessionIdFromCookie() {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=')
        if (name === 'sessionId') {
            return value
        }
    }
    return null
}

// Function to cache the session identifier as a cookie
function cacheSessionIdToCookie(sessionId) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365); // Set expiration date to 365 days from now

    document.cookie = `sessionId=${sessionId}; expires=${expirationDate.toUTCString()}; path=/`;
}


export class Reservoir {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getSessionId() {
        return new Promise((resolve, reject) => {
            let sessionId = getCachedSessionIdFromCookie()
            if (sessionId) {
                resolve(sessionId)
            } else {
                const url = new URL(this.baseUrl + "/sessionId")
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const newSessionId = data.sessionId
                        cacheSessionIdToCookie(newSessionId)
                        resolve(newSessionId)
                    })
                    .catch(error => reject(error))
            }
        })
    }

    write(data) {
        return new Promise((resolve, reject) => {
            this.getSessionId().then(sessionId => {
                fetch(this.baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Session-Id': sessionId
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok')
                        }
                        return response.json()
                    })
                    .then(json => {
                        resolve(json)
                    })
                    .catch(error => reject(error))
            })
        })
    }

    best() {
        return new Promise((resolve, reject) => {
            const url = new URL(this.baseUrl + "/bests")

            fetch(url)
                .then(response => {
                    if (response.status === 204) {
                        resolve() // Resolve with no data if status is 204
                    } else if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then(json => {
                    resolve(json)
                })
                .catch(error => reject(error))
        })
    }

    read(params = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(this.baseUrl)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then(json => resolve(json))
                .catch(error => reject(error))
        })
    }

    erase(params = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(this.baseUrl)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.text()
                })
                .then(text => resolve(text))
                .catch(error => reject(error))
        })
    }
}

/*
// Example usage:
const reservoir = new Reservoir('http://192.168.1.53:8080')

// POST example
const postData = {
    pseudo: 'christophet60',
    level: 'achilles',
    elapsed: 20000,
    erred: 0,
    revealed: 32,
    symbol: 'canonical',
    scrambled: true
}
reservoir.write(postData)
    .then(data => console.log('POST response:', data))
    .catch(error => console.error('POST error:', error))

// GET example
reservoir.read({ pseudo: 'christophet60' })
    .then(data => console.log('GET response:', data))
    .catch(error => console.error('GET error:', error))

// DELETE example
reservoir.erase({ pseudo: 'christophet60' })
    .then(data => console.log('DELETE response:', data))
    .catch(error => console.error('DELETE error:', error))
*/