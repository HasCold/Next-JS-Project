import React, { Suspense } from 'react'
import Form from './addTodoForm'
import Todos from './todos'

  const page = async () => {

    return (
    <div className="container">
        <Form />
        {/* Suspense is particularly useful for lazy loading components and data fetching. For example, if you have a component that requires some data to be fetched from an API, you can wrap it in a Suspense component and provide a loading spinner as the fallback. This way, the spinner will be displayed while the data is being fetched, and the component will only be rendered once the data is available. */}
        <Suspense fallback={<div style={{display : "flex", justifyContent: "center", alignItems: "center"}}>Loading...</div>}>
        <Todos />
        </Suspense>
    </div>
);
};

export default page