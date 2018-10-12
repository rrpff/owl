import React from 'react'

const HappyMultiLogger = ({ getCount, log }) => {
  const count = getCount()
  const list = Array.from(Array(count))

  return (
    <div>
      {list.map((_, i) =>
        <input key={i} type="text" onChange={msg => log(msg)} />
      )}
    </div>
  )
}

export default HappyMultiLogger
