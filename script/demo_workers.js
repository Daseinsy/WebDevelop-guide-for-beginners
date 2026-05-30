let count = 0;

function doCounting() {
    count++;
    postMessage(count);  // Send the results back to the main thread
    setTimeout(doCounting, 1000);
}

doCounting();