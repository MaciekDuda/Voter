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
    
    const updateSelect = (selectId, excludedValue) => {
        const selectElement = document.getElementById(selectId);
        const currentValue = selectElement.value;
        
        selectElement.innerHTML = "";
        
        options.forEach(option => {
            if (option !== excludedValue) {
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

    updateSelect(otherId1, selectedValue);
    updateSelect(otherId2, selectedValue);
}

function submitVotes() {
    const firstChoice = document.getElementById('firstChoice').value;
    const secondChoice = document.getElementById('secondChoice').value;
    const thirdChoice = document.getElementById('thirdChoice').value;

    const data = {
        name: userName,
        votes: [
            { choice: firstChoice, points: 3 },
            { choice: secondChoice, points: 2 },
            { choice: thirdChoice, points: 1 }
        ]
    };

    fetch('http://localhost:3000/saveVotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        updateSummary(); // Aktualizacja podsumowania po zapisie
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function saveResults(name, choice, points) {
    let results = JSON.parse(localStorage.getItem('results')) || [];
    results.push({name: name, choice: choice, points: points});
    localStorage.setItem('results', JSON.stringify(results));
}

function loadResults() {
    const resultsTable = document.getElementById('resultsTable');
    let results = JSON.parse(localStorage.getItem('results')) || [];
    
    results.forEach(result => {
        const newRow = resultsTable.insertRow();
        newRow.insertCell(0).textContent = result.name;
        newRow.insertCell(1).textContent = result.choice;
        newRow.insertCell(2).textContent = result.points;
    });
}

function updateSummary() {
    const summaryTable = document.getElementById('summaryTable');
    summaryTable.innerHTML = `
        <tr>
            <th>Opcja</th>
            <th>Punkty</th>
        </tr>
    `;

    let results = JSON.parse(localStorage.getItem('results')) || [];
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

function clearVotes() {
    localStorage.removeItem('results');
    location.reload(); // Odświeża stronę, aby usunięte zostały wyniki
}
