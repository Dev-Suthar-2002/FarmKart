export const validateSignup = (name: string, email: string, mobile: string, password: string, reTypePassword: string) => {
    const errors = { name: '', email: '', mobile: '', password: '', reTypePassword: '' };
    let isValid = true;

    if (!name) {
        errors.name = 'Full Name is required';
        isValid = false;
    }

    if (!email) {
        errors.email = 'Email is required';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email address is invalid';
        isValid = false;
    }

    if (!mobile) {
        errors.mobile = 'Mobile Number is required';
        isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
        errors.mobile = 'Mobile Number must be 10 digits';
        isValid = false;
    }

    if (!password) {
        errors.password = 'Password is required';
        isValid = false;
    } else if (password !== reTypePassword) {
        errors.reTypePassword = 'Passwords do not match';
        isValid = false;
    }

    return { isValid, errors };
};

export const validateSignin = (email: string, password: string) => {
    const errors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
        errors.email = 'Email is required';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email address is invalid';
        isValid = false;
    }

    if (!password) {
        errors.password = 'Password is required';
        isValid = false;
    }

    return { isValid, errors };
};