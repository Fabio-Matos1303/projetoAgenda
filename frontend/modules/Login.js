import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
        this.errors = []
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')

        if (!validator.isEmail(emailInput.value)) {
            this.errors.push('E-mail inválido!');
        }

        if (passwordInput.value.length < 5 || passwordInput.value.length > 11) {
            this.errors.push('A senha deve ter entre 6 e 12 caracteres');
        }

        if (this.errors.length > 0) {
            alert(this.errors.join('\n'))
            this.errors = [];
        } else el.submit();
    }
}