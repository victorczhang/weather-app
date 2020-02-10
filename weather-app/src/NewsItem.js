import React, {Component} from 'react'

class NewsItem extends Component {
    constructor() {
        super()
        this.state = {
            active: false,
        }
    }
    render() {
        return (
            <li><a href={this.props.url}>{this.props.title}</a></li>
        )
    }
}

export default NewsItem