import React, {useState,useEffect} from "react";
import api from './services/api';
import "./styles.css";


function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response=>setRepositories(response.data));
  },[]);

  async function handleAddRepository(evt) {
    evt.preventDefault();
    const {title, url, techs} = evt.target.elements;
    const response = await api.post('/repositories',{
      title: title.value, 
      url: url.value, 
      techs: techs.value.split('|')
    });
    setRepositories(old=>[...old,response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(old=>old.filter(o=>o.id!==id));
  }

  return (
    <form onSubmit={handleAddRepository} style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <input placeholder="Título" type="text" name="title" id=""/>
      <input placeholder="Url" type="text" name="url" id=""/>
      <input placeholder="Tecnologias (separados por |)" type="text" name="techs" id=""/>
      <div>
        <ul data-testid="repository-list">
          {repositories.map(rep=>(
            <li key={rep.id}>{
              rep.title
            }
              <button type="button" onClick={()=>handleRemoveRepository(rep.id)}>Remover</button>
            </li>
          ))}
        </ul>
        <button type="submit">Adicionar</button>
      </div>
    </form>
  );
}

export default App;
