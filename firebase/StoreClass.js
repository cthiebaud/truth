export class Store {
    #database
    #ref = 'scores'

    constructor() {
        /*
        // Initialize Firebase
        var firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          databaseURL: "YOUR_DATABASE_URL",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };
        */
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyA0uVtggHOM_MN4O_AUTRmVtjXTUIdoJEE",
            authDomain: "aletheia-8c78f.firebaseapp.com",
            projectId: "aletheia-8c78f",
            storageBucket: "aletheia-8c78f.appspot.com",
            messagingSenderId: "301200946740",
            appId: "1:301200946740:web:62f3a3fa2fbff04d057c61",
            databaseURL: "https://aletheia-8c78f-default-rtdb.europe-west1.firebasedatabase.app",
        }
        firebase.initializeApp(firebaseConfig)
        // Firebase database
        this.#database = firebase.database()
    }

    push(data) {
        return new Promise((resolve, reject) => {
            this.#database.ref(this.#ref).push(data)
                .then(function () {
                    resolve()
                })
                .catch(function (error) {
                    reject()
                })
        })
    }

    readAll() {
        return new Promise((resolve, reject) => {
            this.#database.ref(this.#ref).once('value')
                .then(function (snapshot) {
                    resolve(snapshot)
                })
                .catch(function (error) {
                    reject()
                })
        })
    }
}