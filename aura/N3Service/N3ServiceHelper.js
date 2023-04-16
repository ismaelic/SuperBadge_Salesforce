({
    executeCallback : function (callback, data, error) {
        if (!$A.util.isUndefinedOrNull(callback) &&
            typeof callback === 'function') {
            callback.call(null, data, error);
        }
    },
    displayToast : function (opts) {
        var options = opts || {
            title : 'No title provided',
            message : 'No message provided'
        };

        var toastEvent = $A.get("e.force:showToast");

        if ($A.util.isUndefinedOrNull(toastEvent))
            return console.warn('toast is not supported');

        toastEvent.setParams(options).fire()
    },
    apexRequest : function (component, actionName, params) {
        return new Promise (function (resolve, reject) {
            var action = component.get(['c', actionName].join('.'));
            if (params && typeof params === 'object') {
                action.setParams(params);
            }

            action.setCallback(this, cb);

            function cb (response) {
                console.timeEnd();
                var state = response.getState();
                if (state === 'SUCCESS' && component.isValid()) {
                    resolve(response.getReturnValue());
                } else {
                    reject(response.getError());
                }
            }
            console.time();

            try {
                $A.enqueueAction(action);
            } catch (e) {
                console.log('something went wrong')
                reject(e.message);
            }

        }.bind(this));
    },
    storableRequest : function (component, actionName, params, callback) {
        var action = component.get(['c', actionName].join('.'));
        if (params && typeof params === 'object') {
            action.setParams(params);
        }

        action.setCallback(this, cb);
        action.setStorable();

        function cb (response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                callback(null, response.getReturnValue());
            } else {
                callback(response.getError(), null);
            }
        }

        try {
            $A.enqueueAction(action);
        } catch (e) {
            callback(e.message, null)
        }
    }
})