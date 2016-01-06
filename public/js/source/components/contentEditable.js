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
                if (this.state.value !== '') {
                    this.setState({value: event.target.value});
                }
            },

            _onKeyPress: function (event) {
                if (event.which === enterKeyCode) {
                    this._toggle();
                }
            },

            _parseValue: function () {
                var pattern = /\[(.*)\]\((.*)\)/g;
                return this.state.value.replace(pattern, (match, p1, p2) => `<a href='${p2}' target='_blank'>${p1}</a>`);
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
                    <span className={this.props.className} onDoubleClick={this._toggle}
                          dangerouslySetInnerHTML={{__html: this._parseValue()}}/>);
            }
        });

    });