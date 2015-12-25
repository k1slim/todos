define(['react'],
    function (React) {

        return React.createClass({
            displayName: 'NavItem',

            propTypes: {
                value: React.PropTypes.string.isRequired
            },

            getInitialState: function () {
                return {
                    value: this.props.value
                };
            },

            render: function () {
                return (
                    <div className="menuItem">
                        <span className="menuItemText">
                            {this.state.value}
                        </span>
                    </div>
                );
            }
        });
    });