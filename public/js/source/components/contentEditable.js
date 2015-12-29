define(['react'],
    function (React) {

        const enterKeyCode = 13;

        return React.createClass({
            displayName: 'ContentEditable',

            getInitialState: function () {
                return {
                    editable: false,
                    value: this.props.value
                };
            },

            _toggle: function () {
                var editable = this.state.editable;
                this.setState({editable: !editable});
                if (editable) {
                    this.props.updateValue(this.state.value);
                }
            },

            _onChange: function (event) {
                this.setState({value: event.target.value});
            },

            _onKeyPress: function (event) {
                if (event.which === enterKeyCode) {
                    this._toggle();
                }
            },

            render: function () {
                return this.state.editable ? (
                    <input className={this.props.inputClassName}
                           autoFocus={true}
                           type="text"
                           value={this.state.value}
                           onChange={this._onChange}
                           onKeyPress={this._onKeyPress}
                           onBlur={this._toggle}

                    />) : (
                    <span className={this.props.className} onDoubleClick={this._toggle}> {this.state.value} </span>);
            }
        });

    });