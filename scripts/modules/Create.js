
export default class Create {

    constructor() {
        this.form = document.querySelector('#create-form');
        this.id = document.querySelector('#emp_id');
        this.password = document.querySelector('#emp_pass');
        this.name = document.querySelector('#emp_name');
        this.department = document.querySelector('#emp_dpto');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            this.createReq();
        });
    }

    async createReq() {
        try {
            let employeeData = {
                id: this.id.value,
                name: this.name.value,
                password: this.password.value,
                department: this.department.value
            }

            const res = await fetch('https://empleadosuaq.azurewebsites.net/api/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            })

            if (res.status != 200) {
                const error = await res.json();
                console.error(`Error: ${error}`);
                alert(`Error. Empleado existente o datos incorrectos.`);
                return;
            }

            window.location.href = "http://localhost:3000";

        } catch (err) {
            console.error(`Error: ${err}`)
            alert('Hubo un error. Vuelva a intentar más tarde.');
        }
    }
}