function DeviceValidate(value, rules) {

    function minLengthValidator(value, minLength) {
        return value.length >= minLength;
    }

    function requiredValidator(value) {
        return value.trim() !== '';
    }


    let isValid = true;

    for (let rule in rules) {

        switch (rule) {
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]);
                break;

            case 'isRequired': isValid = isValid && requiredValidator(value);
                break;

            default: isValid = true;
        }

    }

    return isValid;
};

export default DeviceValidate;
