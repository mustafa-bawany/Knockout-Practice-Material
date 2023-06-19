var viewModel = function () {
    this.myText = ko.observable("Hello World");
    this.changeText = function() {
        this.myText("Hi my name is mustafa");
    } 
}

var model = new viewModel();
ko.applyBindings(model);