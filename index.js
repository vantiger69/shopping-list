document.addEventListener("DOMContentLoaded", () => {
  const shoppingListForm = document.getElementById("shopping-list-form");
  const itemList = document.getElementById("item");
  const clearListButton = document.getElementById("button");
  const newItemInput = document.getElementById("new-items");

  // Event listener for adding new item
  shoppingListForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newItemName = newItemInput.value.trim();
    if (newItemName === "") {
      return; // Do not add empty items
    }

    // Create new list item
    const newItem = document.createElement("li");
    newItem.textContent = newItemName;

    // Create mark as purchased button
    const markPurchasedButton = document.createElement("button");
    markPurchasedButton.textContent = "Mark Purchased";
    markPurchasedButton.classList.add("mark-purchased-button");
    markPurchasedButton.addEventListener("click", () => {
      newItem.classList.toggle("purchased");
      updateLocalStorage(); // Update local storage when item is marked as purchased
    });

    // Append mark purchased button to list item
    newItem.appendChild(markPurchasedButton);

    // Append item to list
    itemList.appendChild(newItem);

    // Clear input field
    newItemInput.value = "";

    // Update local storage
    updateLocalStorage();
  });

  // Event listener to clear the entire list
  clearListButton.addEventListener("click", () => {
    itemList.innerHTML = ""; // Clear all items from the list
    localStorage.removeItem("shoppingList"); // Clear local storage
  });

  // Function to update local storage with current list items
  function updateLocalStorage() {
    const items = itemList.querySelectorAll("li");
    const itemsArray = Array.from(items).map((item) => ({
      name: item.textContent,
      purchased: item.classList.contains("purchased"),
    }));
    localStorage.setItem("shoppingList", JSON.stringify(itemsArray));
  }

  // Load items from local storage on page load
  function loadItemsFromLocalStorage() {
    const storedItems = JSON.parse(localStorage.getItem("shoppingList")) || [];
    storedItems.forEach((item) => {
      const newItem = document.createElement("li");
      newItem.textContent = item.name;
      if (item.purchased) {
        newItem.classList.add("purchased");
      }

      // Create mark as purchased button for each item
      const markPurchasedButton = document.createElement("button");
      markPurchasedButton.textContent = "Mark Purchased";
      markPurchasedButton.classList.add("mark-purchased-button");
      markPurchasedButton.addEventListener("click", () => {
        newItem.classList.toggle("purchased");
        updateLocalStorage(); // Update local storage when item is marked as purchased
      });

      // Append mark purchased button to list item
      newItem.appendChild(markPurchasedButton);

      // Append item to list
      itemList.appendChild(newItem);
    });
  }

  // Call function to load items from local storage
  loadItemsFromLocalStorage();
});
