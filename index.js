import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'

import TaggedSearch from './TaggedSearch'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      tags: ["javascript"],
      fuzzy: ""
    }
  }

  render () {

    let javascript = "javascript"
    let html = "html"
    let css = "css"
    let csharp = "csharp"
    let c = "c"
    let cpp = "cpp"
    let go = "go"

    let bookmarks = [
      {name: "inkblotty", languages: [javascript, html, css]},
      {name: "xmetrix", languages: [javascript, html, css]},
      {name: "dchem", languages: [c, cpp, javascript]},
      {name: "papa_steve", languages: [javascript, c, go]}
    ]

    const {tags, fuzzy} = this.state
    console.log(tags, fuzzy)

    let updateTags = (tags) => {
      this.setState({tags}) 
    }

    let updateFuzzy = (fuzzy) => {
      this.setState({fuzzy})
    }

    let style = {
      minHeight: 250,
      width: 600,
      padding: 6,
      backgroundColor: "seashell"
    }


    let filtered = bookmarks.filter(x => {
      let languages = x.languages

      let fullMatch = () => {
        for (let i = 0; i < tags.length; i++) {
          if (languages.indexOf(tags[i]) === -1) return false
        }
        return true 
      }
      
      let fuzzyMatch = () => {
        for (let i = 0; i < languages.length; i++) {
          if (languages[i].indexOf(fuzzy) >= 0) return true
        }
        return false
      }

      if (fullMatch() && fuzzyMatch()) return true

      return false

    })
    .map((x, i) => {
      let languages = x.languages.map((z, j) => (<li key={j}>{z}</li>)) 

      return (
        <div key={i}> {x.name} <ul> {languages} </ul> </div>
      )
    })

    return (
      <div style={style}>
        <TaggedSearch tags={tags} onTagsChange={updateTags} onInput={updateFuzzy} placeholder={"filter"}/>
        <ul>
          {filtered}
        </ul>
      </div>
    )
  }
}

ReactDom.render(
  <App/>, document.getElementById("root")
)
