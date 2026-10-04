// Sheet
let rows = [];

function drawSheet() {
    let body = document.getElementById("sheetBody");
    if (!body) return;

    body.innerHTML = "";

    let total = 0;

    for (let row of rows) {
        let tr = document.createElement("tr");

        tr.innerHTML =
            "<td>" + row.item + "</td>" +
            "<td>" + row.quantity + "</td>" +
            "<td>" + row.price + "</td>" +
            "<td>" + row.line + "</td>" +
            "<td>" + row.note + "</td>";

        body.appendChild(tr);

        if (typeof row.line === "number" && !Number.isNaN(row.line)) {
            total += row.line;
        }
    }

    document.getElementById("total").textContent = total;
    document.getElementById("totalKind").textContent = typeof total;

    if (rows.length > 0) {
        let last = rows[rows.length - 1];

        document.getElementById("noteKind").textContent = typeof last.note;
        document.getElementById("priceMatch").textContent =
            "Does price text match price as a number? " +
            (last.price === Number(last.price));

        document.getElementById("sameKind").textContent =
            "Are they the same kind? " +
            (typeof last.price === typeof Number(last.price));

        if (Number.isNaN(last.line)) {
            document.getElementById("lineKind").textContent =
                "Kind of Line: " + typeof last.line;
        } else {
            document.getElementById("lineKind").textContent = "";
        }
    }
}

let form = document.getElementById("itemForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let itemText = document.getElementById("item").value;
        let quantity = Number(document.getElementById("quantity").value);
        let priceText = document.getElementById("price").value;

        let row = {};

        if (itemText !== "") {
            row.item = itemText;
        }

        row.quantity = quantity;
        row.price = priceText;
        row.line = quantity * Number(priceText);
        row.note = priceText + " x " + quantity;

        rows.push(row);

        form.reset();
        drawSheet();
    });
}

drawSheet();


// Till
function getChange(bill, paid) {
    return paid - bill;
}

function take() {
    let bill = Number(document.getElementById("bill").value);
    let paidBox = document.getElementById("paid");
    let paid = paidBox.value === "" ? null : Number(paidBox.value);

    let result = document.getElementById("result");

    if (paid === null) {
        result.innerHTML = "<p>Paid: null</p>" +
            "<p>Kind of paid: " + typeof paid + "</p>";
        return;
    }

    let change = getChange(bill, paid);

    if (change < 0) {
        result.innerHTML =
            "<p>Still owed: " + Math.abs(change) + "</p>";
    } else {
        result.innerHTML =
            "<p>Change: " + change + "</p>";

        if (paid > bill) {
            result.innerHTML +=
                "<p>Half of change: " + change / 2 + "</p>";
        }
    }
}


// Who is in
let people = [
    { name: "Unknown", inShop: undefined }
];

function drawPeople() {
    let body = document.getElementById("peopleBody");
    if (!body) return;

    body.innerHTML = "";
    let count = 0;

    for (let person of people) {
        let tr = document.createElement("tr");

        tr.innerHTML =
            "<td>" + person.name + "</td>" +
            "<td>" + person.inShop + "</td>";

        body.appendChild(tr);

        if (person.inShop === true) {
            count++;
        }
    }

    document.getElementById("count").textContent = count;
}

function addPerson(value) {
    let nameBox = document.getElementById("name");
    let name = nameBox.value;

    if (name !== "") {
        people.push({
            name: name,
            inShop: value
        });

        nameBox.value = "";
        drawPeople();
    }
}

drawPeople();
