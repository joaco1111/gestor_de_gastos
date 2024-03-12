const validate = (form, setErrors, errors) => {
    if(/^[A-Za-zñÑ\s]*$/.test(form.name)) {
        setErrors((errors) => ({ ...errors, name: '' }));
    } else {
        setErrors((errors) => ({ ...errors, name: 'Error en el nombre' }));
    }
    if(!form.name) setErrors((errors) => ({ ...errors, name: '' }));


    if(/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(form.email)) {
        setErrors((errors) => ({ ...errors, email: ''}));
    } else {
        setErrors((errors) => ({ ...errors, email: 'Corre electrónico inválido'}));
    }
    if(!form.email) setErrors((errors) => ({ ...errors, email: '' }));


    if(!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).+$/.test(form.password) || form.password.length < 8) {
        setErrors((errors) => ({ ...errors, password: 'La contraseña ingresada es insegura' }));
    } else {
        setErrors((errors) => ({ ...errors, password: '' }));
    }
    if(!form.password) setErrors((errors) => ({ ...errors, password: '' }));
};

export { validate };