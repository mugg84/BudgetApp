export const UIController = (() => {
  const DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  const formatNumber = (num, type) => {
    let numSplit, int, dec;

    num = Math.abs(num);

    num = num.toFixed(2);

    numSplit = num.split(".");
    int = numSplit[0];

    if (int.length > 3) {
      int =
        int.slice(0, int.length - 3) +
        "," +
        int.slice(int.length - 3, int.length);
    }

    dec = numSplit[1];

    type === "exp" ? "-" : "+";

    return `${type === "exp" ? "-" : "+"} ${int}.${dec}`;
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
        html = `<div class="item clearfix" id="inc-${obj.id}">
                      <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                          <div class="item__value">${formatNumber(
                            obj.value,
                            type
                          )}</div>
                          <div class="item__delete">
                            <button class="item__delete--btn">
                              <i class="ion-ios-close-outline"></i>
                            </button>
                          </div>
                        </div>
                      </div>`;
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html = `<div class="item clearfix" id="exp-${obj.id}">
                       <div class="item__description">${obj.description}</div>
                          <div class="right clearfix">                        
                                  <div class="item__value">${formatNumber(
                                    obj.value,
                                    type
                                  )}</div>
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
    deleteListItem(selectorID) {
      let el = document.getElementById(selectorID);

      el.parentNode.removeChild(el);
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
    displayBudget(obj) {
      let type;

      obj.budget > 0 ? (type = "inc") : (type = "exp");

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );

      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        type
      );

      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, type);

      if (obj.percentage > 0) {
        document.querySelector(
          DOMstrings.percentageLabel
        ).textContent = `${obj.percentage}%`;
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },
    displayPercentages(percentages) {
      let fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      fieldsArr = [...fields];

      fieldsArr.forEach((cur, i) => {
        if (percentages[i] > 0) {
          cur.textContent = percentages[i] + "%";
        } else {
          cur.textContent = "---";
        }
      });
    },
    displayMonth() {
      let now, year, month, months;

      now = new Date();

      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      month = now.getMonth();

      year = now.getFullYear();
      document.querySelector(
        DOMstrings.dateLabel
      ).textContent = `${months[month]} ${year}`;
    },
    changeType() {
      let field, fields;

      field = document.querySelectorAll(
        `${DOMstrings.inputType},${DOMstrings.inputDescription},${DOMstrings.inputValue}`
      );

      fields = [...field];

      fields.forEach((cur) => cur.classList.toggle("red-focus"));

      document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
    },
    getDOMstrings() {
      return DOMstrings;
    },
  };
})();
