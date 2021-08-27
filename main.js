console.log(window.Redux);

const { createStore } = window.Redux;

const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            const newHobbyList = [...state];
            newHobbyList.push(action.payload);
            return newHobbyList;
        }

        default:
            return state;
    }
    return state;
};

const store = createStore(hobbyReducer);

// Render redux hobby list
const renderHobbyList = (hobbyList) => {
    if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

    const ulElement = document.querySelector('#hobbyListID');
    if (!ulElement) return;

    //reset previous content of ul
    ulElement.innerHTML = '';

    console.log(hobbyList);
    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;
        ulElement.appendChild(liElement);
    }
};
// Get hobby list from initial state
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

//handle form submit
const formElement = document.querySelector('#hobbyFormID');
if (formElement) {
    const handleFormSubmit = (e) => {
        // prevent browser reload
        e.preventDefault();

        const hobbyTextElement = formElement.querySelector('#hobbyInputID');
        if (!hobbyTextElement) return;

        const action = {
            type: 'ADD_HOBBY',
            payload: hobbyTextElement.value,
        };
        store.dispatch(action);
        formElement.reset();
    };
    formElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
    const updateHobbyList = store.getState();
    renderHobbyList(updateHobbyList);
    localStorage.setItem('hobby_list', JSON.stringify(updateHobbyList));
});
