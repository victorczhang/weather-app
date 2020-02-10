import React, {Component} from 'react';
import NewsItem from './NewsItem'

class News extends Component {
    constructor() {
        super()

        this.query = '';

        this.state = {
            data: [],
            isLoading: false,
        }
    }

    async fetchAPI() {
        this.setState( {isLoading: true} )

        var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=56402063dc01476d9e6a23846d6c3744';

        var req = new Request(url);

        try {
          const response = await fetch(req)
          const json = await response.json()
          this.setState({
            value: '',
            // dataZero: json.articles,
            data: json.articles.map(item => ({
                author: item.author,
                title: item.title,
                description: item.description,
                url: item.url,
                published: item.publishedAt,
                content: item.content
                })
            ), 
            isLoading: true,
          })
        } catch (error) {
          console.log(error)
          this.setState(
            { isLoading: false }
            )
        }
    }

    async fetchAPISearch() {
        this.setState( {isLoading: true} )

        var url = 'https://newsapi.org/v2/everything?' +
            `q=${this.query}&` +
            'apiKey=56402063dc01476d9e6a23846d6c3744'

        var req = new Request(url);

        try {
          const response = await fetch(req)
          const json = await response.json()
          this.setState({
            value: '',
            // dataZero: json.articles,
            data: json.articles.map(item => ({
                author: item.author,
                title: item.title,
                description: item.description,
                url: item.url,
                published: item.publishedAt,
                content: item.content
                })
            ), 
            isLoading: true,
          })
        } catch (error) {
          console.log(error)
          this.setState(
            { isLoading: false }
            )
        }
    }

    componentDidMount() {
        this.fetchAPI()
    }
    
    handleSubmit = (event) => {
        this.query = this.state.value
        this.fetchAPISearch()
        // this.setState(
        //   { detailPageActive: !this.state.detailPageActive }
        // )
        event.preventDefault()
      }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        // console.log(this.state.data)
        const NewsItemComponent = this.state.data.map((item, i) => 
            <NewsItem 
                key = {i}
                title = {item.title} 
                author = {item.autho} 
                description = {item.description} 
                url = {item.url} 
                published = {item.published} 
                content = {item.content}/>)
        return (
            <div>
                <div id='news-header'>
                    <h1>Global News and Events</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' placeholder='Search News' id='search-news' onChange={this.handleChange} />
                    </form>
                </div>
                <ul>
                    {NewsItemComponent}
                </ul>
            </div>
        )
    }
}

export default News