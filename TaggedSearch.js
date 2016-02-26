import React, { Component, PropTypes } from 'react'

const defaultContainerStyle = {
  borderWidth: "0 0 2px 0",
  borderStyle: "solid",
  borderColor: "gainsboro",
  backgroundColor: "RGBA(0,0,0,0)",
  backgroundColor: "white",
  padding: "2px"
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
    this.idleAdd = this.idleAdd.bind(this)

    this.timeout = -1

    this.state = {
      hover: false,
      focus: false
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

  keyDown (e) {
    const { pushTag, popTag, value, tags } = this.props

    clearTimeout(this.timeout)

    if (e.keyCode === 32 || e.keyCode === 188 || e.key === "Enter") {
      e.preventDefault()

      if (e.target.value.length > 0) {
        pushTag() 
      }
    }

    if (e.key === "Backspace" && value.length === 0) {
      e.preventDefault()

      if (tags.length > 0) {
        popTag()
      }
    } 
  }

  idleAdd () {
    const { value, pushTag } = this.props
    if (value.length > 0) {
      pushTag()
    }
  }

  change (e) {
    const { onInput } = this.props
    let add = this.idleAdd
    this.timeout = setTimeout(add, 1000)
    onInput(e.target.value)
  }

  render () {
    const {
      hover,
      focus
    } = this.state 

    const {
      tags, 
      value,
      placeholder, 

      onTagClick,

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
      overflow: "hidden"
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
      let clickTag = () => onTagClick(tag)
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
            value = {value}
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
  tags: React.PropTypes.array.isRequired,

  onTagClick: React.PropTypes.func.isRequired,
  onInput: React.PropTypes.func.isRequired,
  pushTag: React.PropTypes.func.isRequired,
  popTag: React.PropTypes.func.isRequired
}
