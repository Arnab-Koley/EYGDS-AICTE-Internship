import React from 'react'
import EmailVerification from './EmailVerification'
import PhoneVerification from './PhoneVerification'

const Verify = (props) => {
  return (
    <div className="bg-white flex flex-col shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg p-5 md:w-80 justify-center max-w-96">
      <h1 className="font-semibold text-xl">Email Verification</h1>
      <EmailVerification user={props.user} setUser={props.setUser} />
      <h1 className="font-semibold text-xl mt-3">Phone Verification</h1>
      <PhoneVerification user={props.user} setUser={props.setUser} />
    </div>
  )
}

export default Verify