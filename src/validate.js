
export const Validate = (values) => {
    debugger
    let errors = {}

    if(!values?.email.trim()){
        errors.email = 'Email is required'
    }

    if(!values?.password.trim()){
        errors.password = 'Password is incorrect'
    }

    if(values?.password.length < 6){
        errors.password = 'Password must be at least 6 characters long'
    }

    return errors
}
