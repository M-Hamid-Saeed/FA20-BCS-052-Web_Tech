function onClickValidation()
{
    var userNameField = document.getElementById("username-input");
    var passwordField = document.getElementById("password_label");


    if(userNameField.value)
    {
        userNameField.classList.remove("error");
        userNameField.classList.add("success");
    }
    else
    {
        userNameField.classList.remove("success");
        userNameField.classList.add("error");
    }

    if(passwordField.value)
    {
        passwordField.classList.remove("error");
        passwordField.classList.add("success");
    }
    else
    {
        passwordField.classList.remove("success");
        passwordField.classList.add("error");
    }
}