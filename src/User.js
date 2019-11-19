class User
{
    constructor(username,email,adress)
    {
        this.username = username;
        this.email = email;
        this.adress = adress;
    }
    getUsername()
    {
        return `${this.username}`;
    }
    getEmail()
    {
        return `${this.email}`;
    }
    getadress()
    {
        return `${this.adress}`;
    }
}
const John = new User("John","Doe","jdoe@gmail.com")
console.log(John.getUsername());