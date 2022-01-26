const baseUrl = process.env.BASE_URL
import cors from "../middleware/cors"

export const getKurir = async (kurir,awb) => {
    const res = await fetch(`https://api.binderbyte.com/v1/track?api_key=c6eb494d11e49e5f0d5a4286df382eb152aa512b78b74870871967685b315708&courier=${kurir}&awb=${awb}`, {
        cors
        // headers: {
        //     'Authorization': token,
            
        // }
    })

    const data = await res.json()
    return data
}

export const getData = async (url,token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
       
        method: 'GET',
        headers: {
            'Authorization': token
            
        }
    })

    const data = await res.json()
    return data
}

export const postData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const putData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}
export const putDataa = async (url, post,) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const patchData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {

        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}


export const deleteData = async (url, token) => {
    
    const res = await fetch(`${baseUrl}/api/${url}`, {
    
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    const data = await res.json()
    return data
}