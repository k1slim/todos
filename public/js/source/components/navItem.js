define(['react', 'ContentEditable', 'Actions', 'Store'],
    function (React, ContentEditable, Actions, Store) {

        return React.createClass({
            displayName: 'NavItem',

            _onClick: function () {
                Actions.selectTab(this.props.id);
            },

            _updateValue: function (value) {
                Actions.updateTab(this.props.id, value);
            },

            _setItemClass: function () {
                return (this.props.id === Store.getSelected()) ? 'menuItem selectedMenuItem' : 'menuItem';
            },

            render: function () {
                return (
                    <div className={this._setItemClass()} onClick={this._onClick}>
                        <ContentEditable className="menuItemText" inputClassName="contentEditable contentEditableTab"
                                         value={this.props.value} updateValue={this._updateValue}/>
                    </div>
                );
            }
        });
    });