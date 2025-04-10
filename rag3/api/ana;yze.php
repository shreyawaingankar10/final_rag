<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$url = isset($_GET['url']) ? $_GET['url'] : '';

if (!$url) {
    echo json_encode(["error" => "No URL provided"]);
    exit;
}

// Simulating AI analysis (Replace this with real AI-based scraping & analysis)
$ai_analysis = [
    "title" => "Maharashtra Protest: AI Analysis Report",
    "authenticity_score" => rand(70, 95), // Random percentage
    "sentiment" => "Neutral", // Change based on analysis
    "summary" => "The news covers the protests in Maharashtra, discussing political and social implications.",
    "url" => $url
];

echo json_encode($ai_analysis);
?>
