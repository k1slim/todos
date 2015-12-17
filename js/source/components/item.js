define(['react'],
    function (React) {

        return React.createClass({
            render: ()=>(
                    <div className="item">
                        <div className="itemDone">
                            <img src="image/icons/done.png"/>
                        </div>
                        <div className="itemText" contentEditable="true">
                            1
                        </div>

                        <div className="itemDelete">
                            <img src="image/icons/delete.png"/>
                        </div>
                    </div>
                )
        });
    });