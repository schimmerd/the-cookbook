import axios from 'axios'

class API {
    constructor(baseUrl) {
        this.client = axios.create({ baseURL: baseUrl})
        this.config= { 
            headers: {
            'content-type': 'multipart/form-data'
          }
        }
    }

    addRecipe (data) {
        return this.client.post('add', data, this.config)
    }

    getAll () {
        return this.client.get('recipes')
    }

    login (email, password) {
        return this.client.post('login', {
            email: email,
            password: password
        })
    }

    signUp (data) {
        return this.client.post('signUp', {
            ...data
        })
    }

    updateUser (email, data) {
        return this.client.post(`update?email=${email}`, {
            ...data
        })
    }
}

// PROD
// export default new API('https://the-cookbook-rbwb2aqjsq-ew.a.run.app/api/v1/')
// DEV
export default new API('http://localhost:8080/api/v1/')