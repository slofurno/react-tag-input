import TaggedSearch from '../TaggedSearch'
import React from 'react'
import {createRenderer, Simulate} from 'react-addons-test-utils';

describe('fuck', () => {
  it('fucks', () => {

    let tags = ["javascript", "go"]
    let logit = x => {
      console.log(x)
    }

    let tevs = (<TaggedSearch tags = {tags} onTagsChange = {logit} onInput = {logit}/>)
    
    let renderer = createRenderer()
    renderer.render(tevs)
    let el = renderer.getRenderOutput()
    let input = el.props.children[1].props.children
    console.log(input)

/*
    input.value = 'giraffe'
    Simulate.change(input);
    Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});

    console.log(renderer.getRenderOutput())
*/
  })
})



