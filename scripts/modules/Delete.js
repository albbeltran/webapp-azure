export default class Delete {

    constructor(path) {
        this.path = path;
        this.deleteBtns = document.querySelectorAll('.delete-btn');
        this.events();
    }

    events() {
        Array.from(this.deleteBtns).forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                const idToDelete = deleteBtn.getAttribute('name');
                this.deleteReq(idToDelete);
            })
        })
    }

    async deleteReq(idToDelete) {
        try {
    
            const res = await fetch(`https://empleadosuaq.azurewebsites.net/api/delete/${idToDelete}`, {
                method: 'DELETE'
            })
    
            if (res.status != 200) {
                const error = await res.json();
                console.error(`Error: ${error}`);
                alert(`Error. Vuelve a intentarlo.`);
                return;
            }

            window.location.href = this.path;
        } catch(err) {
            console.error(`Error: ${err}`)
        }
    }
}