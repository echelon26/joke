import config from '../config'
class jokesClient {
    constructor() {
        this.endpoint = `${config.server}/api/jokes`
    }

    getParams(params) {
        let query = ""
        for (let param in params) {
            query += `${param}=${params[param]}&`
        }

        return query = query.slice(0, -1)
    }

    getRandomJoke () {
        let url = `${this.endpoint}/random`

        return fetch(url)
        .then(res => res.json())
    }

    getJokes (params) {
        let url = `${this.endpoint}/?${this.getParams(params)}`

        return fetch(url)
        .then(res => res.json())
    }

    addJoke (params) {
        let url = `${this.endpoint}`

        return fetch(url,  {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({joke: params})
        })
        .then(res => res.json())
        .then((res) => {
            if (!res.content)
                throw new Error(JSON.stringify(res))
            else return res
        })
    }

    editJoke (params) {
        let url = `${this.endpoint}/${params._id}`

        return fetch(url,  {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({joke: params})
        })
        .then(res => res.json())
        .then((res) => {
            if (!res.content)
                throw new Error(JSON.stringify(res))
            else return res
        })
    }

    deleteJoke (params) {
        let url = `${this.endpoint}/${params._id}`

        return fetch(url,  {
            method: 'DELETE',
        })
        .then(res => res.json())
    }
}

export default jokesClient