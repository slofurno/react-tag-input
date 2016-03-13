import TaggedSearch from '../TaggedSearch'
import React from 'react'
import {createRenderer, Simulate} from 'react-addons-test-utils';

describe('nothing', () => {
  it('nothing', () => {

    let tags = ["javascript", "go"]
    let logit = x => {
      console.log(x)
    }

    let tt = TaggedSearch.prototype
    console.log(tt.render)
    let tevs = (<TaggedSearch tags = {tags} onTagsChange = {logit} onInput = {logit}/>)

    //console.log(tevs)    
    let renderer = createRenderer()
    renderer.render(tevs)
    let el = renderer.getRenderOutput()
    let input = el.props.children[1].props.children

/*
    input.value = 'giraffe'
    Simulate.change(input);
    Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});

    console.log(renderer.getRenderOutput())
*/
  })
})



