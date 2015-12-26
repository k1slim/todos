define(['react'],
    function (React) {

        return React.createClass({
            displayName: 'ContentEditable',

            getInitialState: function () {
                return {
                    editable: false,
                    value: this.props.value
                };
            },

            toggle: function () {
                var editable = this.state.editable;
                this.setState({editable: !editable});
                if (editable) {
                    this.props.updateValue(this.state.value);
                }
            },

            onChangeHandler: function (e) {
                this.setState({value: e.target.value});
            },

            keyPressHandler: function (e) {
                if (e.which === 13) {
                    this.toggle();
                }
            },

            render: function () {
                return this.state.editable ? (
                    <input className="contentEditable"
                        autoFocus="true"
                           type="text"
                           ref="textInput"
                           value={this.state.value}
                           onChange={this.onChangeHandler}
                           onKeyPress={this.keyPressHandler}
                           onBlur={this.toggle}
                    />) : (
                    <span className={this.props.className} onClick={this.toggle}> {this.state.value} </span>);
            }
        });

    });