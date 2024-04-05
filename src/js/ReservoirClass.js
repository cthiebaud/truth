// Function to retrieve the session identifier from cookies
function cachedUserSessionFromCookie() {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=')
        if (name === 'user-session') {
            const userSession = JSON.parse(value)
            return userSession || null
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
    #collapseUserStory = document.querySelector("#collapseUserStory .card-body");

    constructor(baseUrl) {
        this.#baseUrl = baseUrl
        this.getOrFetchUserSession().then(([userSession, isNew]) => {
            if (isNew) {
                this.changeUserSession(userSession)
            } else {
                this.userSession = userSession
            }
        })
    }

    changeUserSession(newUserSession) {
        if (this.#userSession?.sessionId !== newUserSession?.sessionId) {
            cacheUserSessionToCookie(newUserSession)
            this.userSession = newUserSession
        }
    }

    renewUserSession() {
        this.fetchUserSession().then((userSession) => {
            this.changeUserSession(userSession)
        })
    }

    get userSession() {
        return this.#userSession
    }

    set userSession(userSession) {
        this.#userSession = userSession
        document.getElementById("session-id").innerText = this.#userSession.sessionId
        const _ = (_) => _ ? _ : "&nbsp;"
        this.#collapseUserStory.innerHTML =
            `<div>
            <b>${_(userSession.name)}</b>
            <span class="the-font-monospaced" style="float: right;">${userSession.sessionId}</span>
        </div>
        <i>${_(userSession.didascalia)}</i>
        <p>${_(userSession.description)}</p>`
    }

    getOrFetchUserSession() {
        return new Promise((resolve, reject) => {
            const oldUserSession = cachedUserSessionFromCookie()
            if (oldUserSession && oldUserSession.sessionId) {
                resolve([oldUserSession, false])
            } else {
                this.fetchUserSession().then(newUserSession => {
                    resolve([newUserSession, true])
                })
            }
        })
    }

    fetchUserSession() {
        return new Promise((resolve, reject) => {
            const url = new URL(this.#baseUrl + "/user-session")
            fetch(url)
                .then(response => response.json())
                .then(newUserSession => {
                    resolve(newUserSession)
                })
                .catch(error => {
                    reject(error + " - at url " + url)
                })
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
