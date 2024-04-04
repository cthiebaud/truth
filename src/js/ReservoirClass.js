// Function to retrieve the session identifier from cookies
function cachedSessionIdFromCookie() {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=')
        if (name === 'sessionId') {
            return JSON.parse(value)
        }
    }
    return null
}

// Function to cache the session identifier as a cookie
function cacheSessionIdToCookie(sessionId) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365); // Set expiration date to 365 days from now

    document.cookie = `sessionId=${JSON.stringify(sessionId)}; expires=${expirationDate.toUTCString()}; path=/`;
}


export class Reservoir {
    #baseUrl
    #userSession
    constructor(baseUrl) {
        this.#baseUrl = baseUrl
        this.fetchSessionId().then(([sessionId, isNew]) => {
            if (isNew) {
                this.changeUserSession(sessionId)                
            } else {
                this.setSessionId(sessionId)
            }
        })
    }

    changeUserSession(newUserSession) {
        cacheSessionIdToCookie(newUserSession)
        this.setSessionId(newUserSession)
    }

    setSessionId(sessionId) {
        this.#userSession = sessionId
        document.getElementById("session-id").innerText = this.#userSession.sessionId
    }

    fetchSessionId() {
        return new Promise((resolve, reject) => {
            const oldSessionId = cachedSessionIdFromCookie()
            if (oldSessionId) {
                resolve([oldSessionId, false])
            } else {
                const url = new URL(this.#baseUrl + "/user-session")
                fetch(url)
                    .then(response => response.json())
                    .then(newUserSession => {
                        resolve([newUserSession, true])
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
                    'Session-Id': this.#userSession.sessionId
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
