import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', repo_links: '', users: props.users[0]?.uuid }
        console.log(props)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repo_links, [this.state.users])
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name"
                        value={this.state.name}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="repo_links">repo_links</label>
                    <input type="text" className="form-control" name="repo_links"
                        value={this.state.repo_links}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="users">users</label>
                    <select className="form-control" name="users"
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

export default ProjectForm 