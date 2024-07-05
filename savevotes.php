<?php

// Połączenie z bazą danych
$servername = "localhost";
$username = "dudzior";
$password = ""; // Ustaw swoje hasło
$dbname = "ankieta_db"; // Ustaw nazwę swojej bazy danych

// Tworzenie połączenia
$conn = new mysqli($servername, $username, $password, $dbname);

// Sprawdzanie połączenia
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Odczyt danych z żądania POST
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$votes = $data['votes'];

// Przygotowanie zapytania SQL do wstawienia danych
$sql = "INSERT INTO votes (name, choice, points) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

// Wstawianie danych do bazy
foreach ($votes as $vote) {
    $choice = $vote['choice'];
    $points = $vote['points'];
    $stmt->bind_param("ssi", $name, $choice, $points);
    $stmt->execute();
}

// Zamykanie połączenia
$stmt->close();
$conn->close();

// Odpowiedź po zapisie
$response = array("message" => "Votes saved successfully");
echo json_encode($response);

?>
