export class Auth {
    static authWithEmailAndPassword(email, password){
        const apiKey = 'AIzaSyDr2jIwJArmg10hwQS39iE8R60tGD33u2A'
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
            method: 'POST',
            body: JSON.stringify({
                email, 
                password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(responce => responce.json())
        .then(data => {
            localStorage.setItem('email', data.email)
            return data.idToken
        })
    }
}