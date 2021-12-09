$array = ['A', 'B','C','D','E','F'];

$results = [];
$chunkCount = 2;
foreach ($array as $index => $item) {
    $chunkIndex = floor($index/$chunkCount);
    $results[$chunkIndex][] = $item;
}
pinrt_r($results);