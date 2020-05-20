export const UIController = (() => {
  const DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
  };

  return {
    getInput() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // 'inc' or 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    addListItem(obj, type) {
      let html, element;

      // create HTML

      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="income-${obj.id}">
                      <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                          <div class="item__value">${obj.value}</div>
                          <div class="item__delete">
                            <button class="item__delete--btn">
                              <i class="ion-ios-close-outline"></i>
                            </button>
                          </div>
                        </div>
                      </div>`;
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html = `<div class="item clearfix" id="expense-${obj.id}">
                       <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">                          
                                  <div class="item__value">${obj.value}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
      }

      //insert HTML to the DOM

      document.querySelector(element).insertAdjacentHTML("beforeend", html);
    },
    clearFields() {
      let fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArr = [...fields];

      fieldsArr.forEach((current) => {
        current.value = "";
      });

      fieldsArr[0].focus();
    },
    getDOMstrings() {
      return DOMstrings;
    },
  };
})();
