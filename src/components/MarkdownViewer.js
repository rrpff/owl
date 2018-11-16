import React from 'react'
import marked from 'marked'

const MarkdownViewer = ({ content }) =>
  <div dangerouslySetInnerHTML={{ __html: marked(content) }} />

export default MarkdownViewer
