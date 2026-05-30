function clickCounter() {
    const y = document.getElementById("result1");
    if (typeof (Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
            localStorage.clickcount = 1;
        }
        y.innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s)!";
    } else {
        y.innerHTML = "Sorry, no Web storage support!";
    }
}




let w;

function startWorker() {
    const x = document.getElementById("result2");
    if (typeof (Worker) !== "undefined") {
        if (typeof (w) == "undefined") {
            w = new Worker("script/demo_workers.js");
        }
        w.onmessage = function (event) {
            x.innerHTML = event.data;
        };
    } else {
        x.innerHTML = "Sorry! No Web Worker support.";
    }
}

function stopWorker() {
    w.terminate();
    w = undefined;
}



const x = document.getElementById("result3");
// Check browser support for SSE
if (typeof (EventSource) !== "undefined") {
    var source = new EventSource("script/demo_sse.php");
    source.onmessage = function (event) {
        x.innerHTML += event.data + "<br>";
    };
} else {
    x.innerHTML = "Sorry, no support for server-sent events.";
}