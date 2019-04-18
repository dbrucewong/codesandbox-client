import React from 'react';
import { angular, vue, react, preact } from '@codesandbox/common/lib/templates';
import MaxWidth from '@codesandbox/common/lib/components/flex/MaxWidth';
import theme from '@codesandbox/common/lib/theme';
import getIcon from '@codesandbox/common/lib/templates/icons';
import LoadInView from '../../../components/LoadInView';

import {
  Icons,
  IconContainer,
  TemplateTitle,
  Title,
  Grid,
  TagLine,
  TemplateName,
} from './elements';

const templates = [react, vue, angular, preact];

export default class Frameworks extends React.Component {
  state = { templateIndex: 0 };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.templateIndex !== this.state.templateIndex;
  }

  setTemplate = template => {
    this.setState({ templateIndex: templates.indexOf(template) });
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  startTimer = () => {
    this.timeout = setTimeout(() => {
      this.setState({
        templateIndex: (this.state.templateIndex + 1) % templates.length,
      });
    }, 6000);
  };

  render() {
    const template = templates[this.state.templateIndex];

    return (
      <MaxWidth width={1440}>
        <Title>
          An Editor for <span>Web.</span>
        </Title>
        <TagLine>
          CodeSandbox is tailored for web projects. Start editing to use{' '}
          <span>{template.niceName}</span>.
        </TagLine>
        <Grid>
          <section>
            <LoadInView style={{ height: 520 }}>
              <iframe
                src={`https://codesandbox.io/embed/${
                  template.shortid
                }?fontsize=14`}
                style={{
                  borderRadius: 4,
                  width: '100%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  border: 'none',
                  backgroundColor: theme.background2(),
                }}
                height={520}
                title="sandbox"
              />
            </LoadInView>
          </section>
          <Icons>
            <TemplateTitle>Templates</TemplateTitle>
            <section>
              {templates.map(({ name }, i) => {
                const TIcon = getIcon(name);

                return (
                  <IconContainer
                    // eslint-disable-next-line
                    key={i}
                    selected={templates[i] === template}
                    template={templates[i]}
                    onClick={() => {
                      this.setTemplate(templates[i]);
                    }}
                  >
                    <TIcon width={36} height={36} />
                    <TemplateName selected={templates[i] === template}>
                      {templates[i].niceName}
                    </TemplateName>
                  </IconContainer>
                );
              })}
            </section>
          </Icons>
        </Grid>
      </MaxWidth>
    );
  }
}
