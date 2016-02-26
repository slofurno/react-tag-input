import React, { Component, PropTypes } from 'react'

export default class TaggedInput extends Component {

  render () {

  { type, style, value, placeholder, onKeyDown, onChange, onBlur, onFocus } = this.props

    return (
      <input
        type = "text"
        style = {style}
        value = {value}
        placeholder = {placeholder}

        onKeyDown = {onKeyDown}
        onChange = {onChange}
        onBlur = {onBlur}
        onFocus = {onFocus}
      />  
    )
  }
}
