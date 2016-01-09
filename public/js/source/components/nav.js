"use strict";

define(['react', 'NavItem', 'Store'],
    function (React, NavItem, Store) {

        const COUNT_DISPLAYED_TABS = 6;

        function findSelectedTabIndex(items, selectedTab) {
            for (let i = 0, n = items.length; i <= n; i++) {
                if (items[i].id === selectedTab) {
                    return i;
                }
            }
        }

        function calcInitialInterval(n, index) {
            var newStartIndex = index - COUNT_DISPLAYED_TABS / 2,
                newEndIndex = index + COUNT_DISPLAYED_TABS / 2;
            if (newStartIndex >= 0 && newEndIndex <= n) {
                return {
                    startIndex: newStartIndex,
                    endIndex: newEndIndex
                }
            }
            if (newStartIndex < 0) {
                return {
                    startIndex: 0,
                    endIndex: COUNT_DISPLAYED_TABS
                }
            }
            if (newEndIndex > n) {
                return {
                    startIndex: n - COUNT_DISPLAYED_TABS,
                    endIndex: n
                }
            }
        }

        function calcIntervalBoundaries(n, startIndex, operation) {
            var endIndex = startIndex + COUNT_DISPLAYED_TABS,
                newStartIndex = startIndex + operation,
                newEndIndex = endIndex + operation;
            if (newStartIndex >= 0 && newEndIndex <= n) {
                return {
                    startIndex: newStartIndex,
                    endIndex: newEndIndex
                }
            }
            else {
                return {
                    startIndex: startIndex,
                    endIndex: endIndex
                }
            }
        }

        return React.createClass({
            displayName: 'Nav',

            getInitialState: function () {
                return {
                    items: [],
                    startIndex: 0,
                    endIndex: 0
                };
            },

            componentDidMount: function () {
                Store.addTabChangeListener(this._updateList);
            },

            componentWillUnmount: function () {
                Store.removeTabChangeListener(this._updateList);
            },

            _setArrowsClass: function () {
                return this.state.items.length > COUNT_DISPLAYED_TABS ? 'arrows showArrows' : 'arrows';
            },

            _onLeftArrowClick: function () {
                let interval = calcIntervalBoundaries(this.state.items.length, this.state.startIndex, -1);
                this.setState({
                    startIndex: interval.startIndex,
                    endIndex: interval.endIndex
                });
            },

            _onRightArrowClick: function () {
                let interval = calcIntervalBoundaries(this.state.items.length, this.state.startIndex, +1);
                this.setState({
                    startIndex: interval.startIndex,
                    endIndex: interval.endIndex
                });
            },

            _updateList: function () {
                var items = Store.getTabs(),
                    selectedTab = Store.getSelected(),
                    n = items.length;

                if (n > COUNT_DISPLAYED_TABS) {
                    let selectedTabIndex = findSelectedTabIndex(items, selectedTab),
                        interval = calcInitialInterval(n, selectedTabIndex);
                    this.setState({
                        items: items,
                        startIndex: interval.startIndex,
                        endIndex: interval.endIndex
                    });
                }
                else {
                    this.setState({
                        items: items,
                        endIndex: n
                    });
                }
            },

            render: function () {
                return (
                    <nav className="nav">
                        <div className={this._setArrowsClass()} onClick={this._onLeftArrowClick}>
                            <img src="image/icons/left.png" alt="left"/>
                        </div>
                        <div className="menu">
                            {this.state.items.slice(this.state.startIndex, this.state.endIndex).map(item => <NavItem
                                id={item.id} key={item.id} value={item.value}/>)}
                        </div>
                        <div className={this._setArrowsClass()} onClick={this._onRightArrowClick}>
                            <img src="image/icons/right.png" alt="right"/>
                        </div>
                    </nav>
                );
            }
        });
    });

//