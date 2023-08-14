import validator from 'validator';

export default class Cadastro {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
        this.errors = [];
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]')
        const telefoneInput = el.querySelector('input[name="telefone"]')

        if (telefoneInput.value === '' && emailInput.value === '') {
            this.errors.push('Necessário cadastrar pelo menos um contato: E-mail ou telefone');
        }

        if (!validator.isEmail(emailInput.value)) {
            this.errors.push('E-mail inválido');
        };


        if (this.errors.length > 0) {
            alert(this.errors.join('\n'))
            this.errors = [];
        } else el.submit();
    }
}