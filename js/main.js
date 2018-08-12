console.log("Mastoshare Ver 2.0.0 alpha!");
load();
function load() {
    var an = "<option value=\"mstdn.jp\">mstdn.jp</option><option value=\"friends.nico\">friends.nico</option><option value=\"pawoo.net\">pawoo.net</option>";
    for (var i = 0, length = localStorage.length; i < length; ++i) {
        an += "<option value='" + localStorage[i] + "'>" + localStorage[i] + "</option>";
    }
    document.getElementById('instance').innerHTML = an;
}
function check(_url) {
    let xhr;
    xhr = new XMLHttpRequest();
    xhr.open("GET", _url, false);  //同期モード
    xhr.send(null);
    return xhr.status;
}
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("addlistbtn").addEventListener("click", function () {
        var addInstanceurl = document.getElementById("addlist").value;
        var checkUrl = "https://" + document.getElementById("addlist").value + "/api/v1/instance";
        try {
            if (check(checkUrl) === 200) {
                let option = document.createElement("option");
                option.value = addInstanceurl;
                option.text = addInstanceurl;
                let listNumber = localStorage.length.toString();
                localStorage.setItem(listNumber, addInstanceurl);
                let target = document.getElementsByName("instance")[0];
                target.add(option);
            } else {
                msg = "<div class=\"alert alert-danger error\" role=\"alert\">マストドンインスタンス(v1.6.0以上)ではありません</div>";
                document.getElementById('error').innerHTML = msg;
            }
        } catch (e) {
            msg = "<div class=\"alert alert-danger error\" role=\"alert\">不正なアドレスです</div>";
            document.getElementById('error').innerHTML = msg;
        }

    });

    document.getElementById("Toot").addEventListener("click", function () {
        let text = document.getElementById("contents").value;
        let instanceUrl = document.getElementById("instance").value;
        if (instanceUrl === "") {
            msg = "<div class=\"alert alert-danger error\" role=\"alert\">共有するインスタンスを選択してください</div>";
            document.getElementById('error').innerHTML = msg;
        } else {
            let openUrl = encodeURIComponent(text);
            location.href = "https://" + instanceUrl + "/share?text=" + openUrl;
        }
    });
    document.getElementById("del").addEventListener("click", function () {
        localStorage.clear();
        load();
    });
});
