//wrapper to an observable that requires accept/cancel
ko.protectedObservable = function (initialValue) {
    //private variables
    var _actualValue = ko.observable(initialValue);
    var _tempValue = initialValue;

    //dependentObservable that we will return
    var result = ko.dependentObservable({
        //always return the actual value
        read: function () {
            return _actualValue();
        },
        //stored in a temporary spot until commit
        write: function (newValue) {
            _tempValue = newValue;
        }
    });

    //if different, commit temp value
    result.commit = function () {
        if (_tempValue !== _actualValue()) {
            _actualValue(_tempValue);
        }
    };

    //force subscribers to take original
    result.reset = function () {
        _actualValue.valueHasMutated();
        _tempValue = _actualValue();   //reset temp value 
    };

    return result;
};

ko.protectedObservableItem = function (item) {
    for (var param in item) {
        if (item.hasOwnProperty(param)) {
            this[param] = ko.protectedObservable(item[param]);
        }
    }

    this.commit = function() {
        for (var property in this) {
            if (this.hasOwnProperty(property) && this[property].commit)
                this[property].commit();
        }
    };
};

ko.toProtectedObservableItemArray = function(sourceArray) {
    return ko.observableArray(ko.utils.arrayMap(sourceArray, function (item) {
        return new ko.protectedObservableItem(item);
    }));
};
 