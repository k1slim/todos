define(['react', 'ContentEditable', 'Actions'],
    function (React, ContentEditable, Actions) {

        return React.createClass({
            displayName: 'NavItem',

            _updateValue: function (value) {
                Actions.updateTab(this.props.id, value);
            },

            render: function () {
                return (
                    <div className="menuItem">
                        <ContentEditable className="menuItemText" inputClassName="contentEditable contentEditableTab"
                                         value={this.props.value} updateValue={this._updateValue}/>
                    </div>
                );
            }
        });
    });