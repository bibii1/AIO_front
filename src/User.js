class User
{
    constructor(lastName,firstName,email,adress,password)
    {
        this.lastName = lastName;
        this.firstName=firstName;
        this.email = email;
        this.adress = adress;
        this.password=password;
    }
    getLastName()
    {
        return `${this.lastName}`;
    }
    getFirstName(){
        return `${this.firstName}`;
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