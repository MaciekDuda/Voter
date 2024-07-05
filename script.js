let userName;

window.onload = function() {
    setTimeout(function() {
        userName = prompt("Jak masz na imię?");
        loadResults();
        updateSummary();
    }, 500);
};

function updateOptions(changedId, otherId1, otherId2) {
    const selectedValue = document.getElementById(changedId).value;

    const options = ["Mazury", "Podlasie", "Tatry"];

    const getSelectedValues = () => {
        return [
            document.getElementById('firstChoice').value,
            document.getElementById('secondChoice').value,
            document.getElementById('thirdChoice').value
        ];
    };

    const updateSelect = (selectId, excludedValues) => {
        const selectElement = document.getElementById(selectId);
        const currentValue = selectElement.value;

        selectElement.innerHTML = "";

        options.forEach(option => {
            if (!excludedValues.includes(option) || option === currentValue) {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                if (option === currentValue) {
                    optionElement.selected = true;
                }
                selectElement.appendChild(optionElement);
            }
        });
    };

    const selectedValues = getSelectedValues();

    updateSelect('firstChoice', selectedValues.filter((val, idx) => idx !== 0));
    updateSelect('secondChoice', selectedValues.filter((val, idx) => idx !== 1));
    updateSelect('thirdChoice', selectedValues.filter((val, idx) => idx !== 2));
}

async function submitVotes() {
    const firstChoice = document.getElementById('firstChoice').value;
    const secondChoice = document.getElementById('secondChoice').value;
    const thirdChoice = document.getElementById('thirdChoice').value;

    const results = [
        { name: userName, choice: firstChoice, points: 3 },
        { name: userName, choice: secondChoice, points: 2 },
        { name: userName, choice: thirdChoice, points: 1 }
    ];

    for (const result of results) {
        await fetch('http://localhost:3000/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        });
    }

    updateSummary();
    loadResults(); // Update the results table after submitting the votes
}

async function updateSummary() {
    const response = await fetch('http://localhost:3000/results');
    const results = await response.json();

    const summaryTable = document.getElementById('summaryTable');
    summaryTable.innerHTML = `
        <tr>
            <th>Opcja</th>
            <th>Punkty</th>
        </tr>
    `;

    let summary = {
        'Mazury': 0,
        'Podlasie': 0,
        'Tatry': 0
    };

    results.forEach(result => {
        summary[result.choice] += result.points;
    });

    let sortable = [];
    for (let option in summary) {
        sortable.push([option, summary[option]]);
    }

    sortable.sort((a, b) => b[1] - a[1]);

    sortable.forEach(item => {
        const newRow = summaryTable.insertRow();
        newRow.insertCell(0).textContent = item[0];
        newRow.insertCell(1).textContent = item[1];
    });
}

async function loadResults() {
    const response = await fetch('http://localhost:3000/results');
    const results = await response.json();

    const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    resultsTable.innerHTML = ''; // Clear existing rows

    results.forEach(result => {
        const newRow = resultsTable.insertRow();
        newRow.insertCell(0).textContent = result.name;
        newRow.insertCell(1).textContent = result.choice;
        newRow.insertCell(2).textContent = result.points;
    });
}

function clearVotes() {
    localStorage.removeItem('results');
    location.reload(); // Odświeża stronę, aby usunięte zostały wyniki
}
