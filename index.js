document.addEventListener('DOMContentLoaded', () => {
    const addNewItems = document.getElementById("new-items");
    const addNewItemsPurchased = document.getElementById('item')

    

    const form = document.querySelector("#shopping-list-form").addEventListener('submit', (event) => createNewItem(event));
    const createNewItem = (event) => {
        event.preventDefault();

        const newItem = document.createElement('li');
        newItem.textContent = addNewItems.value;
        const tick = document.createElement('p')
        tick.innerHTML = 'purchased'
        newItem.appendChild(tick);
        creatDeleteButton(newItem)
        addNewItemsPurchased.appendChild(newItem);
        event.target.reset();
    };
    const creatDeleteButton = (task) => {
        const btn = document.createElement('button')
        btn.innerHTML = 'x'
        task.appendChild(btn);

        btn.addEventListener('click', (event) => {
            task.remove()
        })
        

    };
    const button = document.getElementById('button')
    button.addEventListener('click', (event) => {
        const task = document.getElementById('cl');
        task.remove();
    })

});