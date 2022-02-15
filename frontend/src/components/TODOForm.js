import React from 'react'


class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { task_text: '', project: props.projects[0]?.uuid, created_by: props.users[0]?.uuid }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTODO(this.state.task_text, this.state.project, this.state.created_by)
        event.preventDefault()
    }

    render() {
        return (

            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="task_text">task_text</label>
                    <input type="text" className="form-control" name="task_text"
                        value={this.state.task_text}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="c">project</label>
                    <select className="form-control" name="project"
                        onChange={(event) => this.handleChange(event)} >
                        {this.props.projects.map((project) => <option
                            value={project.uuid}>{project.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="created_by">created_by</label>
                    <select className="form-control" name="created_by"
                        onChange={(event) => this.handleChange(event)} >
                        {this.props.users.map((user) => <option
                            value={user.uuid}>{user.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }
}

export default TODOForm 