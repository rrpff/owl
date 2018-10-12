import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Intro from '../components/Intro'
import LoverHater from '../components/LoverHater'
import PinkWrapper from '../components/PinkWrapper'
import HappyMultiLogger from '../components/HappyMultiLogger'
import ColourChanger from '../components/ColourChanger'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Intro', module)
  .add('default', () =>
    <Intro />
  )

storiesOf('PinkWrapper', module)
  .add('default', () =>
    <PinkWrapper>
      dan is great
    </PinkWrapper>
  )

storiesOf('LoverHater', module)
  .add('love cats', () =>
    <LoverHater isLoved thing="cats" />
  )
  .add('love dogs', () =>
    <LoverHater isLoved thing="dogs" />
  )
  .add('hate rubocop', () =>
    <LoverHater isLoved={false} thing="rubocop" />
  )

storiesOf('HappyMultiLogger', module)
  .add('with ten loggers', () =>
    <HappyMultiLogger log={console.log.bind(console)} getCount={() => 10} />
  )
  .add('with three loggers', () =>
    <HappyMultiLogger log={console.log.bind(console)} getCount={() => 3} />
  )

storiesOf('ColourChanger', module)
  .add('default', () =>
    <ColourChanger />
  )
