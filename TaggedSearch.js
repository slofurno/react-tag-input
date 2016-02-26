import React, { Component, PropTypes } from 'react'

const defaultContainerStyle = {
  borderWidth: "0 0 2px 0",
  borderStyle: "solid",
  borderColor: "gainsboro",
  backgroundColor: "RGBA(0,0,0,.05)"
}

const defaultHighlightStyle = {
  borderColor: "cornflowerblue"
}

const defaultTagStyle = {
  padding: "4px 6px",
  marginRight: "3px",
  backgroundColor: "whitesmoke",
  lineHeight: "1.5rem"
}

const defaultInputStyle = {
  lineHeight: "1.5rem",
  padding: "4px 6px"
}

export default class TaggedSearch extends Component {

  constructor (props) {
    super(props)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
    this.focus = this.focus.bind(this)
    this.blur = this.blur.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.change = this.change.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.addTag = this.addTag.bind(this)
    this.setInput = this.setInput.bind(this)

    this.timeout = -1

    this.state = {
      hover: false,
      focus: false,
      input: ""
    }
  }

  mouseEnter (e) {
    this.setState({hover: true})
  } 

  mouseLeave (e) {
    this.setState({hover: false})
  }

  focus (e) {
    this.setState({focus: true})
  }

  blur (e) {
    this.setState({focus: false})
  }

  setInput (input) {
    if (this.state.input === input) {
      return
    }

    const { onInput } = this.props

    if (typeof(onInput) === "function") {
      onInput(input)
    }
    this.setState({input})
  }
  
  keyDown (e) {
    if (e.key === "Backspace" && this.state.input.length === 0) {
      let tags = this.props.tags.slice()

      if (tags.length === 0) {
        return
      }

      tags.pop()
      this.props.onTagsChange(tags)
    } else if (e.key === "Enter") {
      
      clearTimeout(this.timeout)
      let input = e.target.value
      let tag = input.replace(/[^\w\d]/g, '')

      if (tag.length > 0) {
        this.addTag(tag)
      }

    }
  }

  addTag (tag) {

    let tags = this.props.tags.slice()
    this.setInput('')

    if (tags.indexOf(tag) >= 0) return

    tags.push(tag)
    const { onTagsChange } = this.props
    onTagsChange(tags)
  }

  change (e) {
    let input = e.target.value
    let last = input.slice(-1)
    let tag = input.replace(/[^\w\d]/g, '')
    
    clearTimeout(this.timeout)
    if (tag.length === 0) {
      this.setInput('')
      return
    }

    let addTag = () => {
      this.addTag(tag)
    }

    if (last === ',' || last === ' ') {
      addTag()
    } else {
      this.timeout = setTimeout(addTag, 1000)
      this.setInput(tag)
    }

  }

  removeTag (tag) {
    let tags = this.props.tags.filter(x => x !== tag)

    const { onTagsChange } = this.props
    onTagsChange(tags)
  }

  render () {
    const {
      hover,
      focus,
      input
    } = this.state 

    const {
      tags, 
      placeholder, 
      tagDecal,
      containerStyle, 
      highlightStyle, 
      tagStyle, 
      inputStyle 
    } = this.props

    let tagContainer = {
      float: "left"
    }

    let inputContainer = {
      overflow: "hidden"
    }

    let _containerStyle = {
      width: "100%",
      overflow: "hidden",
      padding: "4px 0"
    }

    let _tagStyle = {
      cursor: "pointer",
      display: "inline-block"
    }

    let _inputStyle = {
      outline: "none",
      borderWidth: 0,
      margin: 0,
      width: "100%",
      backgroundColor: "RGBA(0,0,0,0)"
    }

    if (hover || focus) {
      let hs = highlightStyle || defaultHighlightStyle 
      let cs = containerStyle || defaultContainerStyle 
      _containerStyle = Object.assign({}, cs, hs, _containerStyle) 
    } else {
      let cs = containerStyle || defaultContainerStyle
      _containerStyle = Object.assign({}, cs, _containerStyle)
    }

    let ts = tagStyle || defaultTagStyle
    _tagStyle = Object.assign({}, ts, _tagStyle)

    let ins = inputStyle || defaultInputStyle
    _inputStyle = Object.assign({}, {padding: "2px"}, ins, _inputStyle)

    let decal = tagDecal || '\xD7'
  
    let currentTags = tags.map((tag, i) => {
      let clickTag = e => this.removeTag(tag)
      return (
        <span 
          key={i}
          style={_tagStyle}
          onClick = {clickTag}
        >{tag + "  " + decal}</span>
      )
    }) 

    return (
      <div 
        onMouseEnter = {this.mouseEnter}
        onMouseLeave = {this.mouseLeave}
        style = {_containerStyle}
      >
        <div style = {tagContainer}>
          {currentTags}
        </div>
        <div style = {inputContainer}>
          <input 
            style = {_inputStyle}
            type = "text"
            value = {input}
            placeholder = {placeholder}
            onKeyDown = {this.keyDown}
            onBlur = {this.blur}
            onFocus = {this.focus}
            onChange = {this.change}
          />
        </div>
      </div>
    )
  }
}

TaggedSearch.propTypes = {
  onTagsChange: React.PropTypes.func.isRequired,
  tags: React.PropTypes.array.isRequired
}
