define(['jquery'],
    function ($) {

        return (function () {
            var eventNode = $({});

            return {
                on: on,
                trigger: trigger
            };

            function on() {
                eventNode.on.apply(eventNode, arguments);
            }

            function trigger() {
                eventNode.trigger.apply(eventNode, arguments);
            }

        })();

    });
