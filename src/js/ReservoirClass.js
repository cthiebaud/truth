// Function to retrieve the session identifier from cookies
function cachedUserSessionFromCookie() {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=')
        if (name === 'user-session') {
            return JSON.parse(value)
        }
    }
    return null
}

// Function to cache the session identifier as a cookie
function cacheUserSessionToCookie(userSession) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365); // Set expiration date to 365 days from now

    document.cookie = `user-session=${JSON.stringify(userSession)}; expires=${expirationDate.toUTCString()}; path=/`;
}


export class Reservoir {
    #baseUrl
    #userSession
    constructor(baseUrl) {
        this.#baseUrl = baseUrl
        this.fetchUserSession().then(([userSession, isNew]) => {
            if (isNew) {
                this.changeUserSession(userSession)
            } else {
                this.setUserSession(userSession)
            }
        })
    }

    changeUserSession(newUserSession) {
        if (this.#userSession?.sessionId !== newUserSession?.sessionId) {
            cacheUserSessionToCookie(newUserSession)
            this.setUserSession(newUserSession)
        }
    }

    setUserSession(userSession) {
        this.#userSession = userSession
        document.getElementById("session-id").innerText = this.#userSession.sessionId
    }

    fetchUserSession() {
        return new Promise((resolve, reject) => {
            const oldUserSession = cachedUserSessionFromCookie()
            if (oldUserSession) {
                resolve([oldUserSession, false])
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
