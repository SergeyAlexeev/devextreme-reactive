import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Week View DateTable', () => {
  const defaultProps = {
    dateTableRef: () => undefined,
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Layout {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} className="custom-class" />
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.find(`.${classes.table}`).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render array of times', () => {
      const cell = () => <td />;
      /* eslint-disable-next-line */
      const row = ({ children }) => <tr>{children}</tr>;
      const timeScale = [{}, {}];
      const tree = shallow((
        <Layout
          {...defaultProps}
          timeScale={timeScale}
          cellComponent={cell}
          rowComponent={row}
        />
      ));

      expect(tree.find(cell))
        .toHaveLength(2);
      expect(tree.find(row))
        .toHaveLength(2);
    });
  });
});
