import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './App.css';
import './style.css'
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import ProjectForm from './components/ProjectForm.js'
import TODOList from './components/TODOs.js'
import TODOForm from './components/TODOForm.js'
import MenuList from './components/Menu.js'
import FooterContent from './components/Footer.js'
import LoginForm from './components/Auth.js'
import { BrowserRouter, Route, Link, Routes, Navigate } from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница не найдена</h1>
        </div>
    )
}


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'menuItems': [],
            'footerContent': {},
            'token': ''
        }
    }

    
    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/v0.1/projects/${id}`, { headers })
            .then(response => {
                const projects = this.state.projects.filter((item) => item.id !== id)
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => {
                console.log(error)
            })
    }
    createProject(name, repo_link, users) {
        const headers = this.get_headers()
        // const user_lst = [users]
        //console.log(users)

        const data = { name, repo_link, users }
        //console.log(data)
        axios.post(`http://127.0.0.1:8000/api/v0.1/projects/`, data, { headers })
            .then(response => {
                let new_project = response.data
                const user = this.state.users.filter((item) => item.id === new_project.user)[0]
                new_project.user = user
                this.setState(
                    {
                        projects: [...this.state.projects, new_project],
                    }
                )
            }).catch(error => {
                console.log(error)
            })
    }
    createTODO(task_text, project, created_by) {
        const headers = this.get_headers()

        // console.log(users)

        const data = { task_text, project, created_by }
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/v0.1/TODO/`, data, { headers })
            .then(response => {
                let new_TODO = response.data
                const created_by = this.state.users.filter((item) => item.id === new_TODO.created_by)[0]
                new_TODO.created_by = created_by
                const project = this.state.projects.filter((item) => item.id === new_TODO.project)[0]
                new_TODO.project = project
                this.setState(
                    {
                        todos: [...this.state.todos, new_TODO],
                    }
                )
            }).catch(error => {
                console.log(error)
            })
    }

    deleteTODO(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/v0.1/TODO/${id}`, { headers })
            .then(response => {
                const todos = this.state.todos.filter((item) => item.id !== id)
                this.setState(
                    {
                        'todos': todos,
                    }
                )
            }).catch(error => {
                console.log(error)
            })
    }



    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({ 'token': token }, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({ 'token': token }, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {

        const menuItems = [
            {
                'title': 'Пользователи',
                'link': '/'
            },
            {
                'title': 'Проекты',
                'link': '/projects'
            },
            {
                'title': 'ToDo',
                'link': '/TODO'
            },
        ]

        const footerContent =
        {
            'owner': 'NyB4eG@gmail.com',
            'year': (new Date()).getFullYear()
        }

        this.setState(
            {
                'menuItems': menuItems,
                'footerContent': footerContent,
            }
        )

        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/v0.1/users/', { headers })
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users,
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({ 'users': [] })
            })

        axios.get('http://127.0.0.1:8000/api/v0.1/projects/', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({ 'projects': [] })
            })

        axios.get('http://127.0.0.1:8000/api/v0.1/TODO/', { headers })
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos,
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({ 'todos': [] })
            })
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div class="wrapper">
                <div class="top">
                    <div class="main_blocks_container">
                        <BrowserRouter>
                            <div class="left_block">
                                <div class="menu_login_link">
                                    {this.is_authenticated() ? <button
                                        onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                                </div>
                                <div class="menu">
                                    <MenuList menuItems={this.state.menuItems} />

                                </div>
                            </div>
                            <div class="right_block">
                                <div class="content">

                                    <Routes>
                                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                                        <Route exact path='/projects/create' element={<ProjectForm users={this.state.users} createProject={(name, repo_link, users) => this.createProject(name, repo_link, users)} />} />
                                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
                                        <Route exact path='/TODO/create' element={<TODOForm users={this.state.users} projects={this.state.projects} createTODO={(task_text, project, created_by) => this.createTODO(task_text, project, created_by)} />} />
                                        <Route exact path='/TODO' element={<TODOList todos={this.state.todos} deleteTODO={(id) => this.deleteTODO(id)} />} />
                                        <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                                        <Route path="/users" element={<Navigate replace to="/" />} />
                                        <Route path='*' element={<NotFound404 />} />
                                    </Routes>

                                </div>
                            </div>
                        </BrowserRouter>
                    </div>
                </div>

                <div class="footer">
                    <FooterContent footerContent={this.state.footerContent} />
                </div>
            </div>
        )
    }
}

export default App;