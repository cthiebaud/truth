// Function to retrieve the session identifier from cookies
function cachedSessionIdFromCookie() {
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
    #baseUrl
    #sessionId
    constructor(baseUrl) {
        this.#baseUrl = baseUrl
        this.fetchSessionId().then(sessionId => {
            this.setSessionId(sessionId)
        })
    }

    changeSessionId(newSessionId) {
        cacheSessionIdToCookie(newSessionId)
        this.setSessionId(newSessionId)
    }

    setSessionId(sessionId) {
        this.#sessionId = sessionId
        document.getElementById("session-id").innerText = this.#sessionId
    }

    fetchSessionId() {
        return new Promise((resolve, reject) => {
            const oldSessionId = cachedSessionIdFromCookie()
            if (oldSessionId) {
                resolve(oldSessionId)
            } else {
                const url = new URL(this.#baseUrl + "/sessionId")
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const newSessionId = data.sessionId
                        cacheSessionIdToCookie(newSessionId)
                        resolve(newSessionId)
                    })
                    .catch(error => {
                        reject(error + " - at url " + url)
                    })
            }
        })
    }

    write(data) {
        return new Promise((resolve, reject) => {
            fetch(this.#baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Id': this.#sessionId
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            }).then(json => {
                resolve(json)
            }).catch(error => {
                reject(error)
            })
        })
    }

    best() {
        return new Promise((resolve, reject) => {
            const url = new URL(this.#baseUrl + "/bests")

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
                .catch(error => {
                    reject(error)
                })
        })
    }

    read(params = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(this.#baseUrl)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then(json => {
                    resolve(json)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    erase(params = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(this.#baseUrl)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.text()
                })
                .then(text => {
                    resolve(text)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}
