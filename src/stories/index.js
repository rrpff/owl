import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import FileTree from '../components/FileTree'

storiesOf('FileTree', module)
  .add('with no files', () => <FileTree onFileSelect={action('select')} files={[]} />)
