import React from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import './App.css';
import Input from './components/Form/Input';

function App() {
  function handleSubmit(data) {
    console.log(data);
  }


  return (
    <div className="App">
      Helo

      <Form onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <Scope path="address">
          <Input name="street" />
          <Input name="number" />
        </Scope>
        <button type="submit">ENVIAR</button>
      </Form>
    </div>
  );
}

export default App;
