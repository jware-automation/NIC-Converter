function Validation(values){
    let error = {}
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    
    if(values.email === ""){
        error.email = "Please enter your email"
    }else if(!email_pattern.test(values.email)){
        error.email = "Please enter a valid email "
    }else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Please enter your password"
    } else {
        error.password = ""
    }

    return error;
}

export default Validation;