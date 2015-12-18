define(['react'],
    function (React) {

        return React.createClass({
            displayName: 'Header',

            render: function () {
                return (
                    <header className="header">
                        <div className="head">
                            <h1>
                                ToDos
                            </h1>
                        </div>

                        <nav className="nav">
                            <div className="menuItem">
                                <span className="menuItemText" contentEditable="true">
                                    Hello
                                </span>
                            </div>
                            <div className="menuItem">
                                <span className="menuItemText" contentEditable="true">
                                    World
                                </span>
                            </div>
                            <div className="menuItem">
                                <span className="menuItemText" contentEditable="true">
                                  Today
                                </span>
                            </div>
                            <div className="menuItem">
                                <span className="menuItemText" contentEditable="true">
                                    Add new
                                </span>
                            </div>
                        </nav>
                    </header>
                );
            }
        });
    });