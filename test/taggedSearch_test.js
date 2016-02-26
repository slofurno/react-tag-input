import TaggedSearch from '../TaggedSearch'
import React from 'react'
import {createRenderer} from 'react-addons-test-utils';

describe('fuck', () => {
  it('fucks', () => {
    let renderer = createRenderer()
    renderer.render(<TaggedSearch/>)
    let el = renderer.getRenderOutput()

  })
})



