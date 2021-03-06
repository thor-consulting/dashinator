import React from 'react';
import { shallow } from 'enzyme';

import FailureList from '../../../common/components/FailureList';
import Failure from '../../../common/components/Failure';

describe('FailureList', () => {
  let component;

  context('there are no failures', () => {
    beforeEach(() => {
      component = shallow(<FailureList name='test' state={ { failures: [], description: 'cat', elapsed: 1234 } } />);
    });

    it("has a 'no-failures' class name", () => {
      expect(component.find('.no-failures').length).toEqual(1);
    });

    it("does not have a 'has-failures' class name", () => {
      expect(component.find('.has-failures').length).toEqual(0);
    });

    it('renders the description', () => {
      expect(component.find('.footer .description').text()).toEqual('cat');
    });

    it('renders the elapsed time', () => {
      expect(component.find('.footer .elapsed').text()).toEqual('in 1.234 seconds');
    });
  });

  context('there are failures', () => {
    const failures = [{
      name: 'blah',
      url: 'http://somewhere',
    }];

    beforeEach(() => {
      component = shallow(<FailureList name='test' state={ { failures } } />);
    });

    it("does not have a 'no-failures' class name", () => {
      expect(component.find('.no-failures').length).toEqual(0);
    });

    it("has a 'has-failures' class name", () => {
      expect(component.find('.has-failures').length).toEqual(1);
    });

    it('renders the failure', () => {
      const failureNode = component.find(Failure);
      expect(failureNode.length).toEqual(1);
      expect(failureNode.props()).toEqual(failures[0]);
    });
  });
});
