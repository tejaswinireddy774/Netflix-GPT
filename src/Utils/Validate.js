export const CheckValidate = (Name, Email, Password) => {
    const isNameValid =     /^[a-zA-Z\s]+$/.test(Name);

    const isEmailValid =  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(Email);

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(Password);


    if(!isEmailValid) return "Please enter a valid email address.";
    if(!isPasswordValid) return " Invalid password format.";
    if(!isNameValid) return " Invalid name format "

    return null;
}