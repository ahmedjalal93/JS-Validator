function Validator(element) {
    this.Element = element;
    this.Errors = 0;
    this.ElementId = function () {
        return document.getElementById(this.Element);
    };
    this.ElementValue = function () {
        return this.ElementId().textContent;
    };
    this.InputValue = function () {
        return this.Returner(this.ElementId().value);
    };
    this.LanguageCheck = function (words) {
        if (words.match(/[^\x00-\x7F]+/)) {
            this.Errors = 1;
            return false;
        } else {
            return words;
        }
    };
    this.Exception = function (message) {
        var elem = document.createElement("span");
        if(message !== null){
            elem.innerHTML = message;
            elem.style.color = "#ff0000";
            this.ElementId().parentNode.replaceChild(elem, this.ElementId().previousSibling);
        }else{
            this.ElementId().parentNode.removeChild(elem, this.ElementId().previousSibling);
        }
    };
    this.Returner = function (entry) {
        if (!this.LanguageCheck(entry)) {
            this.Errors = 1;
            this.Exception("English only");
        }
        if (!entry) {
            this.Errors = 1;
            this.Exception("Nothing to be posted");
        }
        if (this.Errors === 1) {
            this.ElementId().style.border = "thin solid #ff0000";
        }else{
            this.ElementId().style.border = "thin solid #ddd";
        }
        if (this.Errors === 0) {
            this.Exception("");
            return entry;
        }
    };
}
