<?php

// Odczyt danych z żądania POST
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

// Dane do zapisu
$name = $data->name;
$votes = $data->votes; // Tablica z wyborami

// Tutaj można dodać kod do zapisania danych w bazie danych
// Na przykład, przy użyciu biblioteki do obsługi bazy danych

// Przykładowe połączenie z bazą danych i zapis danych
$servername = "localhost";
$username = "dudzior";
$password = "password";
$dbname = "ankieta_db";

// Tworzenie połączenia
$conn = new mysqli($servername, $username, $password, $dbname);

// Sprawdzanie połączenia
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Przygotowanie zapytania SQL do wstawienia danych
$sql = "INSERT INTO votes (name, choice, points) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

// Wstawianie danych do bazy
foreach ($votes as $vote) {
    $choice = $vote->choice;
    $points = $vote->points;
    $stmt->bind_param("ssi", $name, $choice, $points);
    $stmt->execute();
}

// Zamykanie połączenia
$stmt->close();
$conn->close();

// Odpowiedź na zapisanie danych
$response = array("message" => "Votes saved successfully");
echo json_encode($response);

?>
