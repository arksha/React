var Note = React.createClass({
    getInitialState: function() {
        return {editing: false}
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
		this.props.onChange(this.refs.newvalue.getDOMNode().value,this.props.index);//invoke onChange to get update function invoke
        this.setState({editing: false});
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    renderDisplay: function() {
        return (
            <div className="note">
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            );
    },
    renderForm: function() {
        return (
            <div className="note">
            <textarea ref="newvalue" defaultValue={this.props.children} 
            className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    },
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});

var Board = React.createClass({
	propTypes: {
		count: function(props, propName){
			if(typeof props[propName]!=="number"){
				return new Error("count property should be a number");
			}
			if(typeof props[propName]>100){
				return new Error("creating " + propName + "is too high");
			}
		}	
	},
	getInitialState: function(){
		return {
			notes:[
				"call mom",
				"go swimming",
				"get mail",
				"finish HW4",
				"not only state can inherit from parents, props can also inerit"
			]
	
		};
	},
	update: function(newvalue,i){
		var arr = this.state.notes;
		arr[i] = newvalue;
		this.setState({notes: arr});//notes : ??
		
	},
	remove: function(i){
		var arr = this.state.notes;
		arr.splice(i,1);
		this.setState({notes:arr});
	},
	eachnote:function(note,i){
		//is going to return each note instead of put it in render funciton
		return(
			<Note key={i}
				index={i}
				onChange={this.update}
				onRemove={this.remove}
			>{note}</Note>
		);
	},
	render: function(){
		return (<div className="board">
				{this.state.notes.map(this.eachnote)}
				</div>);
	//use eachnote function to show
	}
});
React.render(<Board count={10}/>, 
    document.getElementById('react-container'));