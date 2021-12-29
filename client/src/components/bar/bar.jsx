import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRandomJoke } from '../../actions/jokes'
import './bar.css'

const Joke = (props) => {
    return (
        <p className='joke'>"{props.joke.content}"</p>
    )
}

class Bar extends Component {
    componentDidMount() {
        this.props.getRandomJoke()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps)
            this.props = nextProps
    }

    render() {
        return (
            <div className='top-bar'>
                <h1>Healthera Jokes Dashboard</h1>
                <Joke joke={this.props.jokesReducer && this.props.jokesReducer.randomJoke || ""} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getRandomJoke: () => dispatch(getRandomJoke())
})

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bar)