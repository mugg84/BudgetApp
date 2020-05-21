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

  const updateBudget = () => {
    // Calculate budget
    budgetCtrl.calculateBudget();

    // Return budget
    const budget = budgetCtrl.getbudget();

    // Display budget
    UICtrl.displayBudget(budget);
  };

  const ctrlAddItem = () => {
    let input, newItem;
    // Get input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Add item to budgetcontroller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // Add item to UI
      UICtrl.addListItem(newItem, input.type);

      // Clear fields
      UICtrl.clearFields();

      //Calculate and update budget
      updateBudget();
    }
  };

  return {
    init() {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0,
      });
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();
