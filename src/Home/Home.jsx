// Bibliotecas
import { useState, useEffect } from "react";
import Axios from "axios";
import "./style.css";
import { Profile } from "./Profile/profile";

export function Home() {
  const [accountName, setAccountName] = useState();// Estado para os nome do usuário
  const [userRes, setUserRes] = useState();// Estado para a resposta da API (Dados do usuário)
  const [repos, setRepos] = useState([]); // Estado para os repositórios

  // Função assíncrona que realiza a busca do perfil do usuário no GitHub
  const verificarConta = async () => {
    
     // Faz uma requisição GET para a API do GitHub com o nome da conta informado pelo usuário
    const userReq = await Axios.get(
      `https://api.github.com/users/${encodeURIComponent(accountName)}`
    );
     // Salva a resposta do usuário no estado `userRes`
    setUserRes(userReq.data);
    console.log(userRes);

    // Requisição para os repositórios
    const reposReq = await Axios.get(userReq.data.repos_url);

    // Extrai os dados dos repositórios e armazena no estado `repos`
    
    const reposData = reposReq.data;
    setRepos(reposData); // Salva repositórios no estado

    // Limpa o campo de entrada após a pesquisa, definindo `accountName` como uma string vazia
    setAccountName('');
   
  };

  return (
    <>
      <header>
        <h1 className="logoName">Github Seach</h1>
      </header>

      <section className="containerSearch">
        <div>
          <input
            type="text"
            name="account"
            id="accountName"
            placeholder="Digite o nome do usuário"
            value={accountName}
            onChange={(event) => {
              setAccountName(event.target.value);
            }}
          />
          <button className="searchBtn" onClick={verificarConta}>Procurar</button>
          <Profile userRes={userRes} repos={repos} />

        </div>
      </section>
    </>
  );
}
