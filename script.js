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
