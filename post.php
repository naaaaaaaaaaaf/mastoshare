<?php
$get = isset($_GET['text']) ? $_GET['text'] : '';
$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null;
if (!is_null($referer)){
    if(preg_match("|^https?://shindanmaker\.com|", $referer)) {
        $text = $get;
    }else{
        if($data = @file_get_contents($referer)){
            //データ取得が成功した
            $data = mb_convert_encoding($data, 'HTML-ENTITIES', 'ASCII, JIS, UTF-8, EUC-JP, SJIS');
            $document = new DOMDocument();
            $document->loadHTML($data);
            $xmlstr = $document->saveXML();
            $xmlobj = simplexml_load_string($xmlstr);
            $page = json_decode(json_encode($xmlobj), true);
            if (!$page['head']['title']) {
                $text = $get."\n".$page['head']['title'] . " " . $referer." から #Mastoshare";
            }else{
                $text = $get."\n".$referer." から #Mastoshare";
            }
        }else{
            $text = $get."\n".$referer." から #Mastoshare";
        }
    }
}else{
    $text = $get."\n#Mastoshare";
}

?>
<!doctype html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Mastoshare</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.dark.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<div class="container">
    <a href="https://mastoshare.net"><img src="img/mastoshare.png" class="img-fluid"></a>
    <div id="error"></div>
    <div class="card">
        <div class="card-body">
            <h4>リストへの追加</h4>
            <div class="row">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">https://</span>
                    </div>
                    <input type="text" class="form-control" id="addlist" placeholder="mstdn.jp">
                    <button id="addlistbtn" class="btn btn-primary">追加</button>
                </div>
            </div>
        </div>
    </div>
    <h4>インスタンスリスト</h4>
    <div class="form-group">
        <select class="form-control" id="instance" name="instance" size="5" required>
        </select>
    </div>
    <div class="form-group">
        <textarea id="contents" class="form-control" name="num" placeholder="Toot内容" rows="3" required><?php echo $text;?></textarea>
    </div>
    <button id="Toot" class="btn btn-primary">Toot</button>
    <button id="del" class="btn btn-danger">リスト全削除</button>

</div>
<script src="js/main.js"></script>
</body>

</html>
