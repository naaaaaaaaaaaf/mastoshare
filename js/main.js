console.log("Mastoshare Ver 2.0.0 alpha!");
load();
function load() {
    migrateDataModel();
    let elem = "";
    let instances = loadInstances();
    if (instances.length == 0) {
        // add default instances
        instances = ["mstdn.jp", "pawoo.net"];
        saveInstances(instances);
    }
    let lastSelect = localStorage.getItem("lastSelected");
    instances.forEach(function (instance) {
        let selected = lastSelect == instance ? " selected='selected'" : "";
        elem += "<option value='" + instance + "'" + selected + ">" + instance + "</option>";
    })
    document.getElementById('instance').innerHTML = elem;
}
function migrateDataModel() {
    let instances = ["mstdn.jp", "pawoo.net"];
    switch (parseInt(localStorage.getItem("version")) || 0) {
        case 0:
            for (let i = 0; i < localStorage.length; ++i) {
                instances.push(localStorage.getItem(i));
                localStorage.removeItem(i)
            }
            saveInstances(instances);
            break;
        case 1:
            if (instances.indexOf("friends.nico") >= 0) {
                instances.splice(instances.indexOf("friends.nico"))
            }
            saveInstances(instances);
            break;
        default:
            console.log(parseInt(localStorage.getItem("version")) || 0);
    }
    localStorage.setItem("version", "2")
}
function loadInstances() {
    try {
        return JSON.parse(localStorage.getItem("instances"));
    } catch (e) {
        console.log(e.msg);
        console.log("instances deserialization failed. delete old configuration.");
        localStorage.removeItem("instances");
        return [];
    }
}
function saveInstances(instances) {
    localStorage.setItem("instances", JSON.stringify(instances));
}
function check(_url) {
    let xhr;
    xhr = new XMLHttpRequest();
    xhr.open("GET", _url, false);  //同期モード
    xhr.send(null);
    return xhr.status;
}
let errorTimer = null;
function showError(msg) {
    let error = document.getElementById('error');
    if (msg == null) { // clear error immediately
        error.innerHTML = "";
        clearTimeout(errorTimer);
        errorTimer = null;
        return;
    }
    let elem = "<div class=\"alert alert-danger error\" role=\"alert\">" + msg + "</div>";
    error.innerHTML = elem;
    error.style.opacity = 1.0;
    if (errorTimer == null) {
        let obsolescence = function () {
            error.style.opacity -= 0.025;
            if (error.style.opacity < 0.025) {
                showError(null);
            }
            else {
                ratio = (1.0 - error.style.opacity) * 20;
                errorTimer = setTimeout(obsolescence, 500 / ratio);
            }
        }
        errorTimer = setTimeout(obsolescence, 500);
    }
}
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("addlistbtn").addEventListener("click", function () {
        let addInstanceUrl = document.getElementById("addlist").value;
        let checkUrl = "https://" + addInstanceUrl + "/api/v1/instance";
        let instancesList = document.getElementById("instance");
        for (let i = 0; i < instancesList.length; ++i) {
            if (addInstanceUrl == instancesList[i].value) {
                showError("すでに登録されています");
                return;
            }
        }
        try {
            if (check(checkUrl) === 200) {
                instances = loadInstances()
                instances.push(addInstanceUrl)
                saveInstances(instances);
                // reflect into user interface
                let option = document.createElement("option");
                option.value = addInstanceUrl;
                option.text = addInstanceUrl;
                instancesList.add(option);
                instancesList.value = addInstanceUrl; // select added instance
                document.getElementById("addlist").value = ""; // clear the input
                showError(null); // clear the previous error
            } else {
                showError("マストドンインスタンス(v1.6.0以上)ではありません");
            }
        } catch (e) {
            showError("不正なアドレスです");
        }
    });

    document.getElementById("Toot").addEventListener("click", function () {
        let text = document.getElementById("contents").value;
        let instanceUrl = document.getElementById("instance").value;
        if (instanceUrl === "") {
            showError("共有するインスタンスを選択してください");
        } else {
            localStorage.setItem("lastSelected", instanceUrl);
            let openUrl = encodeURIComponent(text);
            location.href = "https://" + instanceUrl + "/share?text=" + openUrl;
        }
    });

    document.getElementById("del").addEventListener("click", function () {
        localStorage.clear();
        load();
    });
});
