define(['react'],
    function (React) {

        return React.createClass({
            displayName: 'ContentEditable',

            render: function () {
                return <span
                    className="menuItemText"
                    onInput={this.emitChange}
                    onBlur={this.emitChange}
                    contentEditable="true"
                    dangerouslySetInnerHTML={{__html: this.props.html}}>
                </span>;
            },

            shouldComponentUpdate: function (nextProps) {
                return nextProps.html !== this.findDOMNode().innerHTML;
            },

            emitChange: function () {
                var html = this.findDOMNode().innerHTML;
                if (this.props.onChange && html !== this.lastHtml) {

                    this.props.onChange({
                        target: {
                            value: html
                        }
                    });
                }
                this.lastHtml = html;
            }
        });

    });