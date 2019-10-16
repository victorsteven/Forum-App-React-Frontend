import React from 'react'
import ReactDOM from 'react-dom'
import * as Reducer from '../reducers/authReducer'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup)

describe("Test the reducers", () => {
  it("Should return the initial state", () => {
    expect(Reducer.initState).toEqual({ 
      isAuthenticated: false,
      currentUser: {},
      isLoading: false,
      isLoadingAvatar: false,
      isUpdatingUser: false,
      authError: null,
      authSuccess: null
    })
  })
})