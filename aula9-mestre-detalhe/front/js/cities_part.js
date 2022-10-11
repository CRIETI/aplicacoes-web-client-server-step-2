//let ENDPOINT = "http://localhost:3000";

const getStates = () => {
    return axios.get(`${ENDPOINT}/states`);
}

const getCity = (id) => {
    return axios.get(`${ENDPOINT}/cities/` + id);
}

const cityCreate = () => {
    const name = document.getElementById("name").value;
    const state = document.getElementById("mySelect").value;
    axios.post(`${ENDPOINT}/cities`, {
        name: name,
        StateId: state,
    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create state: ${error.response.data.error} `)
                .then(() => {
                    showCityCreateBox();
                })
        });
}


const cityEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const state = document.getElementById("mySelect").value;
    axios.put(`${ENDPOINT}/cities/` + id, {
        name: name,
        StateId: state,
    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update city: ${error.response.data.error} `)
                .then(() => {
                    showCityEditBox(id);
                })
        });
}

const cityDelete = async (id) =>
{
    if (!confirm('Confirma remoção?'))
    {
        return;
    }

    const city = await getCity(id);
    const data = city.data;
    axios.delete(`${ENDPOINT}/cities/` + id)
        .then((response) => {
            Swal.fire(`City ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete city: ${error.response.data.error} `);
            loadTable();
        });
};


const createStatesCombo = async (id) => 
{
    const states = await getStates();
    const data = states.data;
    var select = '<select class="swal2-input" id="mySelect">';

    data.forEach((element) => {
        if (id === element.id) {
            select += `<option value="${element.id}" selected>${element.name}</option>`;
        } else {
            select += `<option value="${element.id}">${element.name}</option>`;
        }
    });

    select += '</select>';
    return select;
}

const showCityCreateBox = async (stateId) => 
{
    const states = await createStatesCombo(stateId);

    Swal.fire({
        title: 'Create city',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            states,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            cityCreate();
        }
    });
}

const showCityEditBox = async (id) => {
    const city = await getCity(id);
    const data = city.data;
    const states = await createStatesCombo(data.StateId);
    Swal.fire({
        title: 'Edit city',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            states,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            cityEdit();
        }
    });
}
