import React, { SyntheticEvent, useState } from "react";
import { SendCollabRequest as CollabRequestModel } from "types/model"
import { useDispatch } from "react-redux";
import { sendCollabRequestAction } from "state/action";
import {
  DatePicker,
} from 'antd';

const CollabRequest = () => {
  const [collabTheme, setCollabTheme] = useState('');
  const [message, setMessage] = useState('')
  const [collabDate, setCollabDate] = useState(new Date())
  const dispatch = useDispatch()
  
  const onCollabRequestSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const data = {
      receiverId: "3567",
      requestData: {
        message: message,
        collabTheme: collabTheme
      },
      collabDate: collabDate
    } as CollabRequestModel
    dispatch(sendCollabRequestAction(data))
  }

  const onDateChange = (date) => {
    setCollabDate(date)
  }

  return (
    <form
      method="POST"
      onSubmit={onCollabRequestSubmit}
      autoComplete="off"
    >
      <div className="wrapper">
        <div className="grouped">
          <input className="input" placeholder="Theme" value={collabTheme} onChange={e => setCollabTheme(e.target.value)}/>
        </div>
        <div className="grouped">
          <input className="input" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)}></input>
        </div>
        <div className="grouped">
        <DatePicker onChange={onDateChange} />
        </div>
        <div className="grouped">
          <button className="btn btn-success" type="submit">Send Collab Request</button>
        </div>
      </div>
    </form>
  );
}


export default CollabRequest