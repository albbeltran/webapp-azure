
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

            const res = await fetch('http://localhost:3000/empleado', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            })

            if (res.status === 400) {
                const error = await res.json();
                alert(`ERROR: ${error}`);
                return;
            }

            // redirect happens in backend, the url is fetched and sent to the frontend
            // needed to do manual redirect in the browser
            this.redirectUrl = res.url;
            if (this.redirectUrl && this.redirectUrl !== "")
                window.location = this.redirectUrl;

        } catch (error) {
            console.log(error)
            alert('ERROR INTERNO. Vuelva a intentar más tarde.');
        }
    }
}