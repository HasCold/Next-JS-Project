import { TodoItem } from '@/components/ServerComponents'
import { cookies } from 'next/headers';
import React from 'react'


const fetchTodo = async (token) => {
  
    try {
      // In client componente give simple api like "/api/mytask" but in server side component like `${process.env.URL}/api/mytask`
        const res = await fetch(`${process.env.URL}/api/mytask`, {  // 
          cache : 'no-cache', // It means SSR 
          headers :{
            cookie : `token=${token}`
          }
        });

        const data = await res.json();
        if(!data.success) return [];
        return data.todosTask;

    } catch (error) {
      console.log("Working Error");
      return [];
    }
  };

const Todos = async () => {
    const token = cookies().get("token")?.value;
    const tasks = await fetchTodo(token);

    return (
    <section className="todosContainer">{
        tasks?.map((i) => (
          <TodoItem
          key={i._id}
           title={i.title}
            description={i.description}
             id={i._id}
              completed={i.isCompleted} />
                  ))
        }</section>
    )
}

export default Todos