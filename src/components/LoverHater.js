import React from 'react'

const LoverHater = ({ isLoved, thing }) =>
  <div>I {isLoved ? 'love' : 'hate'} {thing}</div>

export default LoverHater
