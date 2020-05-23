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

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changeType);
  };

  const updateBudget = () => {
    // Calculate budget
    budgetCtrl.calculateBudget();

    // Return budget
    const budget = budgetCtrl.getbudget();

    // Display budget
    UICtrl.displayBudget(budget);
  };

  const updatePercentages = () => {
    //Calculate percentages
    budgetCtrl.calculatePercentages();
    //Read percentages from budget controller
    let percentages = budgetCtrl.getPercentages();
    //Update UI with the new percentages
    UICtrl.displayPercentages(percentages);
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

      //Calculate and update percentages
      updatePercentages();
    }
  };

  const ctrlDeleteItem = (event) => {
    let itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //delete item from data structure
      budgetCtrl.deleteItem(type, ID);

      // delete item from the UI
      UICtrl.deleteListItem(itemID);

      // update and show new budget
      updateBudget();

      // calculate and update percentages
      updatePercentages();
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
      UICtrl.displayMonth();
    },
  };
})(budgetController, UIController);

controller.init();
