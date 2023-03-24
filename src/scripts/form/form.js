import arrayify from 'array-back';

class Form {
    parseToBody = (form) => {
        const formArray = arrayify(form);

        const validity = this.validate(formArray);

        if(validity.invalid){
            return validity
        }

        return Object.fromEntries( 
            formArray
            .filter(input => input.value)
            .map(input => [input.name, input.value])
        )
    }

    validate = (formArray) => {
        const invalid = formArray.find(element => !element.validity.valid);

        if(invalid){
            return {invalid: true, reason: "Form incompleet ❌"}
        } else {
            return {invalid: false}
        }
    }



    reset = (form) => {
        form.reset()
    }
}

export const form = new Form