import React, {useRef} from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import './App.css';
import * as Yup from 'yup';
import Input from './components/Form/Input';

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, {reset}) {
    try {
      const schema = Yup.object().shape({
        name: Yup
          .string()
          .required('O nome é obrigatório'),
        email: Yup
          .string()
          .email('digite um email valido')
          .required('O email é obrigatório'),
        password: Yup
          .string()
          .required('A senha é obrigatório'),
        address: Yup.object().shape({
          city: Yup
            .string()
            .min(3, 'No minimo 3 caracteres')
            .required('A cidade é obrigatória')
        })
      })

        await schema.validate(data, {
          abortEarly: false,
        })
        console.log(data);
        reset();
        formRef.current.setErrors({});
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        console.log(err);
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }

    


    // if(data.name === "") {
    //   formRef.current.setErrors({
    //     name: 'O name é obrigatório',
    //     address: {
    //       city: 'A cidade é obrigatória'
    //     }
    //   })
    // }
  
  }


  return (
    <div className="App">
      Helo

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <Scope path="address">
          <Input name="city" />
          <Input name="street" />
          <Input name="number" />
        </Scope>
        <button type="submit">ENVIAR</button>
      </Form>
    </div>
  );
}

export default App;
