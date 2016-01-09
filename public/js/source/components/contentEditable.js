define(['react'],
    function (React) {

        const ENTER_KEY_CODE = 13;

        return React.createClass({
            displayName: 'ContentEditable',

            getInitialState: function () {
                return {
                    isEditing: false,
                    value: this.props.value
                };
            },

            _onChange: function (event) {
                this.setState({value: event.target.value});
            },

            _onKeyPress: function (event) {
                if (event.which === ENTER_KEY_CODE) {
                    this._toggle();
                }
            },

            _parseValue: function () {
                var pattern = /\[(.*)\]\((.*)\)/g;
                return this.state.value.replace(pattern, (match, p1, p2) => `<a href='${p2}' target='_blank'>${p1}</a>`);
            },

            _toggle: function (event) {
                event.stopPropagation();
                var isEditing = this.state.isEditing;
                this.setState({isEditing: !isEditing});
                if (isEditing) {
                    this.props.updateValue(this.state.value);
                }
            },

            _chooseImageVersion: function () {
                return this.props.className === 'itemText' ? 'image/icons/pencil_gray.png' : 'image/icons/pencil_white.png';
            },

            render: function () {
                return this.state.isEditing ? (
                    <input className={this.props.inputClassName}
                           autoFocus={true}
                           type="text"
                           value={this.state.value}
                           onChange={this._onChange}
                           onKeyPress={this._onKeyPress}
                           onBlur={this._toggle}
                    />) : (
                    <div className="contentEditableWrapper">
                        <span className={this.props.className} onDoubleClick={this._toggle}
                              dangerouslySetInnerHTML={{__html: this._parseValue()}}/>
                        <img src={this._chooseImageVersion()} alt="left" onClick={this._toggle}/>
                    </div>
                );
            }
        });

    });