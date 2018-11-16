import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import FileTree from '../components/FileTree'
import FileEditor from '../components/FileEditor'
import MarkdownViewer from '../components/MarkdownViewer'
import Widget from '../components/Widget'
import FileAdder from '../components/FileAdder'

storiesOf('FileTree', module)
  .add('with no files', () => <FileTree onFileSelect={action('select')} files={[]} />)
  .add('with an unchanged, old file', () => <FileTree onFileSelect={action('select')} files={[{ name: 'test.md', changed: false, new: false, selected: true }]} />)
  .add('with a changed file', () => <FileTree onFileSelect={action('select')} files={[{ name: 'test.md', changed: true, new: false, selected: true }]} />)
  .add('with a new file', () => <FileTree onFileSelect={action('select')} files={[{ name: 'test.md', changed: false, new: true, selected: true }]} />)
  .add('with a changed, new file', () => <FileTree onFileSelect={action('select')} files={[{ name: 'test.md', changed: true, new: true, selected: true }]} />)
  .add('with several files, where the second is selected', () =>
    <FileTree
      onFileSelect={action('select')}
      files={[
        { name: 'test.md', changed: true, new: false, selected: false },
        { name: 'other.md', changed: false, new: false, selected: true },
        { name: 'cool.md', changed: false, new: true, selected: false }
      ]}
    />
  )

storiesOf('FileEditor', module)
  .add('with empty content', () => <FileEditor name="test.md" content={""} onChange={action('change')} />)
  .add('with content', () => <FileEditor name="test.md" content={"# test file\n\ntest content here\n\nmore content"} onChange={action('change')} />)

storiesOf('MarkdownViewer', module)
  .add('with empty content', () => <MarkdownViewer content={""} />)
  .add('with content', () => <MarkdownViewer content={"# test file\n\ntest content here\n\nmore content"} />)

storiesOf('Widget', module)
  .add('with no initial files', () => <Widget files={[]} />)
  .add('with initial files', () =>
    <Widget
      files={{
        'test.md': { content: '# test file\n\ntest content here\n\nmore content', changed: false, new: false },
        'other.md': { content: '# other file\n\nother content here\n\nmore content', changed: false, new: false },
        'cool.md': { content: '# cool file\n\ncool content here\n\nmore content', changed: false, new: false }
      }}
    />
  )

storiesOf('FileAdder', module)
  .add('default', () => <FileAdder onSubmit={action('submit')} />)
