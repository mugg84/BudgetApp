import { UIController } from "./UIController";
import { budgetController } from "./BudgetContrller";

const controller = ((budgetCtrl, UICtrl) => {
  const setupEventListener = () => {
    const DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  const ctrlAddItem = () => {
    let input, newItem;
    // Get input data
    input = UICtrl.getInput();

    // Add item to budgetcontroller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // Add item to UI
    UICtrl.addListItem(newItem, input.type);

    // Clear fields
    UICtrl.clearFields();
    // Calculate budget
    // Display budget
  };

  return {
    init() {
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();
