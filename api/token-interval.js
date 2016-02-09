
function tokenInterval() {
    this.addRoutine = function(func) {
        func();
        setInterval(func, 5 * 60 * 1000);
    }
}

module.exports = new tokenInterval();