define(['react', 'ContentEditable', 'Actions', 'Store'],
    function (React, ContentEditable, Actions, Store) {

        return React.createClass({
            displayName: 'NavItem',

            _onClick: function () {
                Actions.selectTab(this.props.id);
            },

            _setItemClass: function () {
                return (this.props.id === Store.getSelected()) ? 'menuItem selectedMenuItem' : 'menuItem';
            },

            _setSelectedTabProps: function () {
                return this.props.id === Store.getSelected();
            },

            _updateValue: function (value) {
                Actions.updateTab(this.props.id, value);
            },

            render: function () {
                return (
                    <div className={this._setItemClass()} onClick={this._onClick}>
                        <ContentEditable className="menuItemText" inputClassName="contentEditable contentEditableTab"
                                         value={this.props.value} updateValue={this._updateValue} selectedTab={this._setSelectedTabProps()}/>
                    </div>
                );
            }
        });
    });