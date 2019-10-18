import React from 'react'
import { shallow, mount } from 'enzyme'
import { render, fireEvent, waitForDomChange, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';


import ForgotPassword from './ForgotPassword'

jest.mock('react-redux', () => ({
  useDispatch: ()=> { },
  useSelector: () => ({
  Auth: { 
    isAuthenticated: false,
    currentUser: {},
    isLoading: false,
    isLoadingAvatar: false,
    isUpdatingUser: false,
    authError: null,
    authSuccess: null,
   }
  })
}));

describe('ForgotPassword Component', () => {

  afterEach(cleanup);
  
  let wrapper;
  beforeEach(() => {

    wrapper = shallow(<ForgotPassword />);
  })
  it("should have a reset password button", () => {
    const button = wrapper.find(`[data-test='resetButton']`)
    expect(button.length).toBe(1)
  })

  it("should have an input field for email", () => {
    const emailInput = wrapper.find(`[data-test='inputEmail']`)
    expect(emailInput.length).toBe(1)
    expect(emailInput.props().name).toEqual('email')
  })

  // TODO
  it('should submit a valid form', async() => {

  })
});
