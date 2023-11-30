export default class Delete {

    constructor() {
        this.deleteBtn = document.querySelector('#delete-btn');
        this.events();
    }

    events() {
        this.deleteBtn.addEventListener('click', () => {
            this.deleteReq();
        });
    }

    async deleteReq() {
        try {
            this.idToDelete = this.deleteBtn.getAttribute('name');
    
            const res = await fetch(`https://empleadosuaq.azurewebsites.net/api/delete/${this.idToDelete}`, {
                method: 'DELETE'
            })
    
            if (res.status != 200) {
                const error = await res.json();
                console.error(`Error: ${error}`);
                alert(`Error. Vuelve a intentarlo.`);
                return;
            }

            window.location.href = "http://localhost:3000";
        } catch(err) {
            console.error(`Error: ${err}`)
        }
    }
}