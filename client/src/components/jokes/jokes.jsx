import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getJokes, addJoke, editJoke, deleteJoke } from '../../actions/jokes'
import JokesTable from './table'

import {
    Card,
    CardActions
} from '@rmwc/card'
import { Button, ButtonIcon } from '@rmwc/button'
import { ListDivider } from '@rmwc/list'
import { Typography } from '@rmwc/typography'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton
} from '@rmwc/dialog'
import { TextField } from '@rmwc/textfield'
import { Snackbar } from '@rmwc/snackbar'
class Jokes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            dialogText: "",
            dialogMode: "Add",
            joke: null,
            filter: null
        }

        this.modal = {
            handleTextChange: this.handleTextChange.bind(this),
            handleActionBtn: this.handleActionBtn.bind(this),
            editJoke: this.handleJokeEdit.bind(this)
        }
        this.handleFilter = this.handleFilter.bind(this)
    }
    componentDidMount() {
    
        this.props.getJokes()
    }

    componentWillReceiveProps(nextProps) {
        
        if (this.props !== nextProps)
            this.props = nextProps
    }

    handleTextChange(text) {
        this.setState({
            dialogText: text
        })
    }

    handleJokeEdit(joke) {
        
        this.setState({
            dialogOpen: true,
            dialogMode: "Edit",
            dialogText: joke.content,
            joke: joke
        })
    }

    handleActionBtn(mode = "Add", data) {
        if (mode == "Add")
            this.props.addJoke(data)
        else this.props.editJoke({ ...this.state.joke, content: data.content })
    }

    handleFilter(e) {
        this.setState({
            filter: e.target.value
        }, () => this.props.getJokes({filterBy: 'content', filter: this.state.filter})) //TODO support multiple column filter
    }

    render() {
        return (
            <div className='jokes-card'>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={evt => { this.setState({ dialogOpen: false }) }}
                >
                    <DialogTitle>Add a joke</DialogTitle>
                    <DialogContent>
                        <TextField textarea fullwidth value={this.state.dialogText} onChange={(e) => this.modal.handleTextChange(e.target.value)} outlined label="Joke" />
                    </DialogContent>
                    <DialogActions>
                        <DialogButton action="close">Cancel</DialogButton>
                        <DialogButton
                            onClick={() => this.handleActionBtn(this.state.dialogMode, { content: this.state.dialogText })}
                            action="accept"
                            isDefaultAction
                        >
                            {this.state.dialogMode}
                        </DialogButton>
                    </DialogActions>
                </Dialog>
                <Card outlined style={{ marginTop: '10px' }}>
                    <CardActions>
                        <TextField onChange={this.handleFilter} outlined withLeadingIcon="search" withTrailingIcon="close" label="Filter jokes" />
                        <Button onClick={() => { this.setState({ dialogOpen: true, dialogMode: "Add" }) }}><ButtonIcon icon="add" /> Create</Button>
                    </CardActions>

                    <ListDivider />
                    {
                        this.props.jokesReducer && this.props.jokesReducer.jokesView ?
                            <JokesTable
                                filter={this.state.filter}
                                editJoke={this.modal.editJoke}
                                deleteJoke={this.props.deleteJoke}
                                getPage={this.props.getJokes}
                                jokesView={this.props.jokesReducer.jokesView} /> :
                            null
                    }
                </Card >
                <Snackbar
                    show={this.props.jokesReducer && this.props.jokesReducer.error}
                    message="Action failed!"
                    timeout={1000}
                />
            </div>
        )
    }
}

/**
 * CRUD ACTIONS on jokes api
 */
const mapDispatchToProps = dispatch => {
    return(
    
    {
        
    getJokes: (params) => dispatch(getJokes(params)),
    addJoke: (params) => dispatch(addJoke(params)),
    editJoke: (params) => dispatch(editJoke(params)),
    deleteJoke: (params) => dispatch(deleteJoke(params))
})}

const mapStateToProps = state => { return ({
    ...state
})}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Jokes)