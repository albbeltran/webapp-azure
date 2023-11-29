export default class Update {

    constructor() {
        this.updateModal = document.querySelector('#updateModal')
        this.updateForm = document.querySelector('#update-form');
        this.id = document.querySelector('#modal_emp_id');
        this.name = document.querySelector('#modal_emp_name');
        this.department = document.querySelector('#modal_emp_dpto');
        this.events();
    }

    events() {
        this.updateModal.addEventListener('show.bs.modal', e => {
            this.modalHandler(e);
        })

        this.updateForm.addEventListener('submit', e => {
            e.preventDefault();

            this.updateReq();
        });
    }

    modalHandler(e) {
        let employeeRow = e.relatedTarget.parentNode.parentNode;
        console.log(modal_emp_dpto.value)
        console.log(employeeRow.children[2].innerText)

        this.id.value = employeeRow.children[0].innerText;
        this.name.value = employeeRow.children[1].innerText;
        this.department.value = employeeRow.children[2].innerText;
    }

    async updateReq() {
        let employeeData = {
            id: this.id.value,
            name: this.name.value,
            department: this.department.value
        }

        const res = await fetch(`https://empleadosuaq.azurewebsites.net/api/update/${this.id.value}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        })

        // redirect happens in backend, the url is fetched and sent to the frontend
        // needed to do manual redirect in the browser
        this.redirectUrl = res.url;
        if (this.redirectUrl && this.redirectUrl !== "")
            window.location = this.redirectUrl;
    }
}