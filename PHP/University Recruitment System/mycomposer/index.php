<?php

require 'vendor/autoload.php';

header("Content-Type: application/pdf");
header("Content-Disposition: inline; filename=" . $data["name"]);

// Creating the new document...

$phpWord = \PhpOffice\PhpWord\IOFactory::load('../CV.docx');

\PhpOffice\PhpWord\Settings::setPdfRendererPath("TCPDF");
\PhpOffice\PhpWord\Settings::setPdfRendererName('TCPDF');

$xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'PDF');

$pdf_temp = tmpfile();
$pdf_uri = stream_get_meta_data($pdf_temp)["uri"];

$xmlWriter->save($pdf_uri);

echo file_get_contents($pdf_uri);

?>